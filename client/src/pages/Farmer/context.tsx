import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useToast } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";

import { StateType } from "@/types/state.type";
import { CityServiceType } from "@/types/city.type";
import { FarmerScreenMode } from "@/enums/farmer.enum";
import { StateEndpoint } from "@/service/state.endpoint";
import { CityEndpoint } from "@/service/city.endpoint";
import { NavigateUtil } from "@/utils/navigate.util";
import { FarmerEndpoint } from "@/service/farmer.endpoint";
import { useHandleError } from "@/hooks/handleError.hook";

import { FarmerFormType } from "./type";
import { INITIAL_VALUES } from "./data";

type ContextType = {
  FORM_MODE: keyof typeof FarmerScreenMode;
  getFormInitialValues: () => Promise<FarmerFormType>;
  getCities: (state: string) => Promise<void>;
  submit: (data: FarmerFormType) => Promise<void>;
  states: [] | StateType[];
  cities: [] | CityServiceType[];
};

const FarmerContext = createContext<ContextType>({} as ContextType);

export function FarmerContextProvider({ children }: { children: ReactNode }) {
  const params = useParams();
  const location = useLocation();
  const { handleError } = useHandleError();

  const toast = useToast();

  const FORM_MODE = location.state?.type ?? "CREATE";

  const [states, setStates] = useState<StateType[] | []>([]);
  const [cities, setCities] = useState<CityServiceType[] | []>([]);

  if (FORM_MODE === FarmerScreenMode.UPDATE && !params.farmerId) {
    toast({
      title: "Não foi possível localizar o agricultor",
      description:
        "Você precisa escolhar um agricultor para editar o seu cadastro.",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });

    NavigateUtil.navigateTo("/agricultores");
  }

  useEffect(() => {
    getStates();
  }, []);

  async function getStates() {
    try {
      const states = await StateEndpoint.getAll();

      setStates(states);
    } catch (error: any) {
      handleError({
        error,
        status: "error",
        title: "Não foi possível obter os estados",
      });

      NavigateUtil.navigateTo("/agricultores");
    }
  }

  async function getCities(state: string): Promise<void> {
    try {
      const cities = await CityEndpoint.getAllByService(state);

      setCities(cities);
    } catch (error) {
      handleError({
        error,
        status: "error",
        title: "Não foi possível obter as cidades",
      });
    }
  }

  const getFormInitialValues = async () => {
    if (FORM_MODE === FarmerScreenMode.CREATE) return INITIAL_VALUES.farmerForm;

    const farmer = await FarmerEndpoint.get(Number(params.farmerId));

    return {
      corporateName: farmer?.corporate_name,
      fantasyName: farmer?.fantasy_name,
      companyIdentification: farmer?.company_identification,
      phoneNumber: farmer?.phone_number,
      stateAcronym: farmer?.city?.state?.acronym as string,
      cityIgbeCode: farmer?.city?.ibge_code as string,
    };
  };

  async function update(data: FarmerFormType) {
    try {
      const cityName: string = cities.find(
        (city) => city.codigo_ibge === data.cityIgbeCode
      )?.nome as string;

      const updatedRecord = {
        corporate_name: data.corporateName,
        fantasy_name: data.fantasyName,
        company_identification: data.companyIdentification,
        phone_number: data.phoneNumber,
        city: {
          city_name: cityName,
          state_acronym: data.stateAcronym,
          ibge_code: data.cityIgbeCode,
        },
      };

      await FarmerEndpoint.update(Number(params.farmerId), updatedRecord);

      toast({
        title: "Agricultor atualizado com sucesso",
        description:
          "Agora você já pode ver o cadastro atualizado na listagem de agricultores",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });

      NavigateUtil.navigateTo("/agricultores");
    } catch (error: any) {
      handleError({
        error,
        status: "error",
        title: "Não foi possível atualizar o cadastro",
      });
    }
  }

  async function create(data: FarmerFormType) {
    try {
      const cityName: string = cities.find(
        (city) => city.codigo_ibge === data.cityIgbeCode
      )?.nome as string;

      const createRecord = {
        corporate_name: data.corporateName,
        fantasy_name: data.fantasyName,
        company_identification: data.companyIdentification,
        phone_number: data.phoneNumber,
        city: {
          city_name: cityName,
          state_acronym: data.stateAcronym,
          ibge_code: data.cityIgbeCode,
        },
      };

      await FarmerEndpoint.create(createRecord);

      toast({
        title: "Agricultor criado com sucesso",
        description:
          "Agora você já pode ver o novo cadastro na listagem de agricultores",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });

      NavigateUtil.navigateTo("/agricultores");
    } catch (error: any) {
      handleError({
        error,
        status: "error",
        title: "Não foi possível realizar o cadastro",
      });
    }
  }

  async function submit(data: FarmerFormType) {
    if (FORM_MODE === FarmerScreenMode.UPDATE) {
      await update(data);
    } else {
      await create(data);
    }
  }

  return (
    <FarmerContext.Provider
      value={{
        FORM_MODE,
        getFormInitialValues,
        getCities,
        submit,
        states,
        cities,
      }}
    >
      {children}
    </FarmerContext.Provider>
  );
}

export const useFarmerContext = (): ContextType => {
  return useContext(FarmerContext);
};

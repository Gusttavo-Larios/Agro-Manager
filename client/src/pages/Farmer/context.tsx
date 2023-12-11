import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useParams } from "react-router-dom";

import { StateEndpoint } from "@/service/state.endpoint";
import { CityEndpoint } from "@/service/city.endpoint";
import { FarmerEndpoint } from "@/service/farmer.endpoint";

import { CityServiceType } from "@/types/city.type";
import { StateType } from "@/types/state.type";
import { router } from "@/router";

import { FarmerFormType } from "./type";
import { FarmerScreenMode } from "@/enums/farmer.enum";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

type ContextType = {
  FORM_MODE: keyof typeof FarmerScreenMode ;
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

  const toast = useToast();

  const FORM_MODE = location.state?.type ?? "CREATE";
  //   console.log(location.state)

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
    router.navigate("/agricultores");
  }

  useEffect(() => {
    getStates();
  }, []);

  async function getStates() {
    try {
      const states = await StateEndpoint.getAll();

      setStates(states);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCities(state: string): Promise<void> {
    try {
      const cities = await CityEndpoint.getAllByService(state);

      setCities(cities);
    } catch (error) {
      console.log(error);
    }
  }

  const getFormInitialValues = async () => {
    if (FORM_MODE === FarmerScreenMode.CREATE)
      return {
        corporateName: "",
        fantasyName: "",
        companyIdentification: "",
        phoneNumber: "",
        stateAcronym: "",
        cityIgbeCode: "",
      };

    const farmer = await FarmerEndpoint.get(Number(params.farmerId));

    if (!farmer)
      return {
        corporateName: "",
        fantasyName: "",
        companyIdentification: "",
        phoneNumber: "",
        stateAcronym: "",
        cityIgbeCode: "",
      };

    return {
      corporateName: farmer.corporate_name,
      fantasyName: farmer.fantasy_name,
      companyIdentification: farmer.company_identification,
      phoneNumber: farmer.phone_number,
      stateAcronym: farmer.city?.state?.acronym as string,
      cityIgbeCode: farmer.city?.ibge_code as string,
    };
  };

  async function update(data: FarmerFormType) {
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

    FarmerEndpoint.update(Number(params.farmerId), updatedRecord);
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

      router.navigate("/agricultores");
    } catch (error: any) {
      let errorMessage = error.message;

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message;
      }

      toast({
        title: "Não foi possível realizar o cadastro",
        description: errorMessage,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
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

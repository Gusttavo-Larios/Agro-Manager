import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import { StateEndpoint } from "@/service/state.endpoint";
import { CityEndpoint } from "@/service/city.endpoint";
import { FarmerEndpoint } from "@/service/farmer.endpoint";

import { CityServiceType} from "@/types/city.type";
import { StateType } from "@/types/state.type";
import { router } from "@/router";

import { FarmerFormType } from "./type";

type ContextType = {
  getFormInitialValues: () => Promise<FarmerFormType>;
  getCities: (state: string) => Promise<void>;
  update: (data: FarmerFormType) => Promise<void>;
  states: [] | StateType[];
  cities: [] | CityServiceType[];
};

const FarmerContext = createContext<ContextType>({} as ContextType);

export function FarmerContextProvider({ children }: { children: ReactNode }) {
  const params = useParams();

  const [states, setStates] = useState<StateType[] | []>([]);
  const [cities, setCities] = useState<CityServiceType[] | []>([]);

  if (!params.farmerId) {
    router.navigate(-1);
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

  return (
    <FarmerContext.Provider
      value={{
        getFormInitialValues,
        getCities,
        update,
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

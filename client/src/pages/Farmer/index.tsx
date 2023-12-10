import { useEffect } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CreateOrUpdateFarmerSchema } from "./schema";
import { useLogic } from "./logic";
import { FarmerFormType } from "./type";

import { Body } from "@/components/Body";

export function Farmer(): JSX.Element {
  const { getFormInitialValues, getCities, update, states, cities } =
    useLogic();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FarmerFormType>({
    resolver: yupResolver(CreateOrUpdateFarmerSchema),
    defaultValues: getFormInitialValues,
  });
  const stateFielCurrentValue = watch("stateAcronym");

  // console.log({city: watch('cityIgbeCode')})
  useEffect(() => {
    if (stateFielCurrentValue) getCities(stateFielCurrentValue);
  }, [stateFielCurrentValue]);

  const onSubmit = handleSubmit(async (data) => {
    await update(data);
  });

  return (
    <Body>
      <Stack mb="1rem">
        <Heading>Cadastro de Agricultor</Heading>
        <Text>O preenchimento de todos os campos abaixo é obrigatório.</Text>
      </Stack>
      <form onSubmit={onSubmit}>
        <Stack spacing="0.8rem">
          <Stack spacing="0.2rem" width="sm">
            <FormControl isInvalid={errors.corporateName?.message !== null}>
              <FormLabel htmlFor="corporateName">Razão Social</FormLabel>
              <Input
                id="corporateName"
                type="text"
                placeholder="Razão Social"
                errorBorderColor="crimson"
                isInvalid={typeof errors.corporateName?.message === "string"}
                {...register("corporateName")}
              />
              <FormErrorMessage>
                {errors.corporateName && errors.corporateName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.fantasyName?.message !== null}>
              <FormLabel htmlFor="fantasyName">Nome Fantasia</FormLabel>
              <Input
                id="fantasyName"
                type="text"
                placeholder="Nome Fantasia"
                {...register("fantasyName")}
                errorBorderColor="crimson"
                isInvalid={typeof errors.fantasyName?.message === "string"}
              />
              <FormErrorMessage>
                {errors.fantasyName && errors.fantasyName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={errors.companyIdentification?.message !== null}
            >
              <FormLabel htmlFor="companyIdentification">CPF/CNPJ</FormLabel>
              <Input
                id="companyIdentification"
                type="text"
                placeholder="CPF/CNPJ"
                {...register("companyIdentification")}
                errorBorderColor="crimson"
                isInvalid={
                  typeof errors.companyIdentification?.message === "string"
                }
              />
              <FormErrorMessage>
                {errors.companyIdentification &&
                  errors.companyIdentification.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.phoneNumber?.message !== null}>
              <FormLabel htmlFor="phoneNumber">Celular</FormLabel>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Celular"
                {...register("phoneNumber")}
                errorBorderColor="crimson"
                isInvalid={typeof errors.phoneNumber?.message === "string"}
              />
              <FormErrorMessage>
                {errors.phoneNumber && errors.phoneNumber.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.stateAcronym?.message !== null}>
              <FormLabel htmlFor="stateId">Estado</FormLabel>
              <Select
                id="stateId"
                placeholder="Selecione um estado"
                {...register("stateAcronym")}
                errorBorderColor="crimson"
                isInvalid={typeof errors.stateAcronym?.message === "string"}
              >
                {states.map((state) => (
                  <option key={state.acronym} value={state.acronym}>
                    {state.acronym}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.stateAcronym && errors.stateAcronym.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.cityIgbeCode?.message !== null}>
              <FormLabel htmlFor="cityIgbeCode">Cidade</FormLabel>
              <Select
                id="cityIgbeCode"
                placeholder="Selecione uma cidade"
                {...register("cityIgbeCode")}
                errorBorderColor="crimson"
                isInvalid={typeof errors.cityIgbeCode?.message === "string"}
                disabled={stateFielCurrentValue?.toString().length < 1}
              >
                {cities.map((city) => (
                  <option key={city.codigo_ibge} value={city.codigo_ibge}>
                    {city.nome}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.cityIgbeCode && errors.cityIgbeCode.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Button
            colorScheme="blue"
            width="sm"
            type="submit"
            isDisabled={!isValid}
          >
            Atualizar
          </Button>
        </Stack>
      </form>
    </Body>
  );
}

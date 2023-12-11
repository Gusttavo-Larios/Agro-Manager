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
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Body } from "@/components/Body";

import { FarmerContextProvider, useFarmerContext } from "./context";
import { CreateOrUpdateFarmerSchema } from "./schema";
import { FarmerFormType } from "./type";
import { FarmerHelper } from "./helper";

export function Farmer(): JSX.Element {
  return (
    <FarmerContextProvider>
      <Page />
    </FarmerContextProvider>
  );
}

function Page() {
  return (
    <Body>
      <Stack mb="1rem">
        <Heading>Cadastro de Agricultor</Heading>
        <Text>O preenchimento de todos os campos abaixo é obrigatório.</Text>
      </Stack>
      <Form />
    </Body>
  );
}

type FieldType = {
  label: string;
  fieldName: keyof FarmerFormType;
};

const fields: Array<FieldType> = [
  { label: "Razão Social", fieldName: "corporateName" },
  { label: "Nome Fantasia", fieldName: "fantasyName" },
  { label: "CPF/CNPJ", fieldName: "companyIdentification" },
  { label: "Celular", fieldName: "phoneNumber" },
];

function Form() {
  const { states, cities } = useFarmerContext();
  const { getFormInitialValues, getCities, update } = useFarmerContext();

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

  useEffect(() => {
    if (stateFielCurrentValue) getCities(stateFielCurrentValue);
  }, [stateFielCurrentValue]);

  const onSubmit = handleSubmit(async (data) => {
    await update(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing="0.8rem">
        <Stack spacing="0.2rem" width="sm">
          {fields.map((field) => (
            <FormInput
              key={field.fieldName}
              {...field}
              errors={errors}
              register={register}
            />
          ))}

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
  );
}

type IPropsFormInput = {
  fieldName: FieldType["fieldName"];
  label: FieldType["label"];
  errors: FieldErrors<FarmerFormType>;
  register: UseFormRegister<FarmerFormType>;
};

const theFieldIsWrong = (
  fieldName: FieldType["fieldName"],
  errors: IPropsFormInput["errors"]
) => FarmerHelper.checkIfTheFieldIsWrong(errors[fieldName]?.message);

function FormInput({ label, fieldName, errors, register }: IPropsFormInput) {
  const fieldIsInvalid = theFieldIsWrong(fieldName, errors);

  return (
    <FormControl key={fieldName} isInvalid={fieldIsInvalid}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Input
        id={fieldName}
        type="text"
        placeholder={label}
        errorBorderColor="crimson"
        isInvalid={fieldIsInvalid}
        {...register(fieldName)}
      />
      <FormErrorMessage>
        {fieldIsInvalid && errors[fieldName]?.message}
      </FormErrorMessage>
    </FormControl>
  );
}

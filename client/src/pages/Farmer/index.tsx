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

import { FarmerScreenMode } from "@/enums/farmer.enum";

import { breakPoints } from "@/style/config.style";
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
  placeholder: string;
  fieldName: keyof FarmerFormType;
};

const fields: Array<FieldType> = [
  {
    label: "Razão Social *",
    fieldName: "corporateName",
    placeholder: "Razão Social",
  },
  {
    label: "Nome Fantasia *",
    fieldName: "fantasyName",
    placeholder: "Nome Fantasia",
  },
  {
    label: "CPF/CNPJ *",
    fieldName: "companyIdentification",
    placeholder: "999.999.999-99 / 99.999.999/9999-99",
  },
  {
    label: "Celular *",
    fieldName: "phoneNumber",
    placeholder: "(99) 9 9999-9999",
  },
];

function Form() {
  const { states, cities } = useFarmerContext();
  const { FORM_MODE, getFormInitialValues, getCities, submit } =
    useFarmerContext();

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
  const cityFielCurrentValue = watch("cityIgbeCode");

  const stateFieldIsDisabled = states.length < 1;
  const cityFieldIsDisabled =
    stateFielCurrentValue?.toString().length < 1 || cities.length < 1;

  useEffect(() => {
    if (stateFielCurrentValue) getCities(stateFielCurrentValue);
  }, [stateFielCurrentValue]);

  const onSubmit = handleSubmit(async (data) => {
    await submit(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing="0.8rem">
        <Stack spacing="0.2rem">
          {fields.map((field) => (
            <FormInput
              key={field.fieldName}
              {...field}
              errors={errors}
              register={register}
            />
          ))}

          <FormControl
            isInvalid={theFieldIsWrong("stateAcronym", errors)}
            width={breakPoints}
          >
            <FormLabel htmlFor="stateId">Estado *</FormLabel>
            <Select
              id="stateId"
              placeholder="Selecione um estado"
              {...register("stateAcronym")}
              errorBorderColor="crimson"
              isInvalid={theFieldIsWrong("stateAcronym", errors)}
              disabled={stateFieldIsDisabled}
            >
              {states.map((state) => (
                <option key={state.acronym} value={state.acronym}>
                  {state.acronym}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {theFieldIsWrong("stateAcronym", errors) &&
                errors?.stateAcronym?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={theFieldIsWrong("cityIgbeCode", errors)}
            width={breakPoints}
          >
            <FormLabel htmlFor="cityIgbeCode">Cidade *</FormLabel>
            <Select
              id="cityIgbeCode"
              placeholder="Selecione uma cidade"
              {...register("cityIgbeCode")}
              errorBorderColor="crimson"
              isInvalid={theFieldIsWrong("cityIgbeCode", errors)}
              disabled={cityFieldIsDisabled}
            >
              {cities.map((city) => (
                <option
                  key={city.codigo_ibge}
                  value={city.codigo_ibge}
                  selected={cityFielCurrentValue === city.codigo_ibge}
                >
                  {city.nome}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {theFieldIsWrong("cityIgbeCode", errors) &&
                errors?.cityIgbeCode?.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Button
          colorScheme={FORM_MODE === FarmerScreenMode.CREATE ? "green" : "blue"}
          type="submit"
          isDisabled={!isValid}
          width={breakPoints}
        >
          {FORM_MODE === FarmerScreenMode.CREATE
            ? "Criar Agricultor"
            : "Atualizar Agricultor"}
        </Button>
      </Stack>
    </form>
  );
}

type IPropsFormInput = {
  fieldName: FieldType["fieldName"];
  label: FieldType["label"];
  placeholder: FieldType["placeholder"];
  errors: FieldErrors<FarmerFormType>;
  register: UseFormRegister<FarmerFormType>;
};

function FormInput({
  label,
  fieldName,
  errors,
  register,
  placeholder,
}: IPropsFormInput) {
  const fieldIsInvalid = theFieldIsWrong(fieldName, errors);

  return (
    <FormControl key={fieldName} isInvalid={fieldIsInvalid}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Input
        id={fieldName}
        type="text"
        placeholder={placeholder}
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

const theFieldIsWrong = (
  fieldName: FieldType["fieldName"],
  errors: IPropsFormInput["errors"]
) => FarmerHelper.checkIfTheFieldIsWrong(errors[fieldName]?.message);

import * as Yup from "yup";

export const CreateOrUpdateFarmerSchema = Yup.object().shape({
  corporateName: Yup.string()
    .required("O campo Razão Social é obrigatório.")
    .max(96, "A Razão Social pode ter no máximo 96 caracteres"),

  fantasyName: Yup.string()
    .required("O campo Nome Fantasia é obrigatório.")
    .max(96, "O Nome Fantasia pode ter no máximo 96 caracteres"),

  companyIdentification: Yup.string()
    .required("O campo CPF/CNPJ é obrigatório.")
    .matches(
      /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
      {
        message:
          "O campo CPF/CNPJ deve seguir um dos seguintes formatos: 99.999.999/9999-99 ou 999.999.999-99",
        name: "CPF/CNPJ",
        excludeEmptyString: true,
      }
    )
    .max(18, "O CPF/CNPJ pode ter no máximo 18 caracteres"),

  phoneNumber: Yup.string()
    .required("O campo Celular é obrigatório.")
    .matches(/^\(\d{2}\) 9 \d{4}\-\d{4}$/, {
      message: "O campo Celular deve seguir o formato: (99) 9 9999-9999",
      name: "Celular",
      excludeEmptyString: true,
    })
    .max(16, "O Celular pode ter no máximo 16 caracteres"),

  stateAcronym: Yup.string()
    .required("O campo Estado é obrigatório.")
    .length(2, "Campo estado deve ter 2 carateres"),
  // .integer("O campo Estado requer um número inteiro")
  // .positive("O campo Estado requer um número positivo"),

  cityIgbeCode: Yup.string()
    .required("O campo Cidade é obrigatório.")
    .length(7, "O campo Cidade deve ter 7 caracteres"),
});

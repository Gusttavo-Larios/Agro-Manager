import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { breakPoints } from "@/style/config.style";

import IconLarge from "@/assets/imgs/ICON_LARGE.svg";

import { SignupSchema } from "./schema";
import { useLogic } from "./logic";

type SignupType = {
  email: string;
  password: string;
};

export function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupType>({
    resolver: yupResolver(SignupSchema),
  });

  const logic = useLogic();

  const onSubmit = handleSubmit(async (data) => {
    await logic.signIn(data.email, data.password);
  });

  return (
    <VStack spacing="4rem">
      <Image src={IconLarge} mt="8rem" width={breakPoints} />
      <form onSubmit={onSubmit}>
        <Stack spacing="1rem">
          <Stack spacing="0.8rem">
            <FormControl
              isInvalid={errors.email?.message !== null}
              width={breakPoints}
            >
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                errorBorderColor="crimson"
                isInvalid={typeof errors.email?.message === "string"}
                {...register("email")}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={errors.password?.message !== null}
              width={breakPoints}
            >
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                {...register("password")}
                errorBorderColor="crimson"
                isInvalid={typeof errors.password?.message === "string"}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Button colorScheme="blue" type="submit" width={breakPoints}>
            Entrar
          </Button>
        </Stack>
      </form>
    </VStack>
  );
}

import { useMutation } from "@tanstack/react-query";
import { axiosPublic } from "utils/axios-instances";

import { RegisterFormType } from "@/features/types/user.types";

export function useRegister() {
  const {
    data: registerData,
    mutate: registerMutate,
    isPending: isRegisterPending,
    isSuccess: isRegisterSuccess,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: (body: RegisterFormType) =>
      axiosPublic.post("/auth/register", body),
  });
  return { registerData, registerMutate, isRegisterPending, isRegisterSuccess };
}

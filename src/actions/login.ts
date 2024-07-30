"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema/LoginSchema";
// import { signIn } from "@/auth";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { AuthError } from "next-auth";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  //   const validateFields = LoginSchema.safeParse(data);
  //   if (!validateFields.success) {
  //     return { error: "Invalid fields" };
  //   }
  //   const { email, password } = validateFields.data;
  //   try {
  //     const user = await signIn("credentials", {
  //       email,
  //       password,
  //       redirectTo: DEFAULT_LOGIN_REDIRECT,
  //     });
  //   } catch (error) {
  //     if (error instanceof AuthError) {
  //       switch (error.type) {
  //         case "CredentialsSignin":
  //           return { error: "Invalid credentials!" };
  //         default:
  //           return { error: "Something went wrong!" };
  //       }
  //     }
  //     throw error;
  //   }
};

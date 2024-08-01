"use client";

import { LoginSchema } from "@/schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CardWrapper from "@/components/auth/CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FormError from "@/components/auth/FormError";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  var urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    login(data)
      .then((res) => {
        if (res?.error) {
          toast({
            title: res?.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "User Logged In Successfully",
          });
        }
      })
      .catch((err: any) => {
        toast({
          title: err.message,
        });
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <div>
      <CardWrapper
        headerLabel="Sign In"
        backButtonHref="/register"
        backButtonLabel="Create An Account"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={urlError} />

            <Button
              type="submit"
              className="w-full rounded-3xl bg-red-500 hover:bg-red-600"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <span>Login</span>
              )}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default LoginForm;

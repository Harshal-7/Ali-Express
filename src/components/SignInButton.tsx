"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleAlert, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/login";
import CardWrapper from "./auth/CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import FormError from "./auth/FormError";
import * as z from "zod";

const SignInButton = () => {
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
      .then((res) => {})
      .catch((err: any) => {
        toast({
          title: err.message,
        });
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="w-full rounded-full text-xl py-6"
          >
            Sign In
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <CardWrapper
            headerLabel="Sign In"
            backButtonLabel="Create an account"
            backButtonHref="/register"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={urlError} />

                <Button
                  type="submit"
                  className="w-full bg-red-600 rounded-3xl hover:bg-red-700"
                >
                  {loading ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    <span>Sign In</span>
                  )}
                </Button>
              </form>
            </Form>
          </CardWrapper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignInButton;

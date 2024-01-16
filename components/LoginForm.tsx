"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  username: z
    .string()
    .email({ message: "Username should be a valid email id" })
    .min(6, {
      message: "Username must be at least 6 characters long.",
    }),
  password: z.string().min(6, {
    message: "Password must be atleast 6 characters long.",
  }),
});

export function LoginForm() {
  const router = useRouter();
  useEffect(() => {
    async function isTokenValid() {
      const response = await fetch("http://localhost:3000/api/auth/check");
      const data = await response.json();
      const { message, user, authorize } = await data;
      if (authorize === true) {
        toast(message, {
          description: "Login",
          action: {
            label: "OK",
            onClick: () => {},
          },
        });
        router.push(`/dashboard/?id=${user.id}&username=${user.username}`);
      }
    }

    isTokenValid();
  }, []);

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onLoginSubmit(values: z.infer<typeof loginFormSchema>) {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const { message, user } = await response.json();
    if (user) {
      router.push(`/dashboard/?id=${user.id}&username=${user.username}`);
      toast(message, {
        description: "Login",
        action: {
          label: "OK",
          onClick: () => {},
        },
      });
    } else {
      toast(message, {
        description: "Login",
        action: {
          label: "OK",
          onClick: () => {},
        },
      });
    }
  }

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onLoginSubmit)}
        className="space-y-8 w-5/6"
      >
        <FormField
          control={loginForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="abc@example.com"
                  className="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  className="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full h-12">
          Login
        </Button>
      </form>
    </Form>
  );
}

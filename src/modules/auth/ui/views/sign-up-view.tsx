"use client";

import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { OctagonAlertIcon, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { LoadingButton } from '@/components/loader-btn';
import { useRouter } from 'next/navigation';
import { FaGithub, FaGoogle } from "react-icons/fa";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(6, { message: "Password is required" }),
  confirmPassword: z.string().min(6, { message: "Confirm password is required" }),
}).refine(
  (data) => data.password === data.confirmPassword, {
  message: "Confirm password does not match",
  path: ["confirmPassword"],
}
);

export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        }
      },
    );
  };

  const onSubmitSocial = (provider: "github" | "google") => {
    setError(null);
    setPending(true);

    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        }
      },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-8">
              <div className="flex flex-col gap-y-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">
                    Let&apos;s get started
                  </h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            {...field}
                            placeholder='Input your name'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            {...field}
                            placeholder='Input your email'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            {...field}
                            placeholder='Input your password'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            {...field}
                            placeholder='Input your confirm password'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {
                  !!error && (
                    <Alert className='bg-destructive/10 border-none'>
                      <OctagonAlertIcon className='w-4 h-4 !text-destructive' />
                      <AlertTitle>{error}</AlertTitle>
                    </Alert>
                  )
                }
                <LoadingButton
                  className='w-full'
                  type='submit'
                  loading={pending}
                >
                  Sign Up
                </LoadingButton>
                <div className="
                                after:border-border relative text-center text-sm after:absolute
                                after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center
                                after:border-t">
                  <span className='bg-card text-muted-foreground relative z-10 px-2'>
                    Or Sign up with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    type='button'
                    className='w-full'
                    disabled={pending}
                    onClick={() => onSubmitSocial("google")}
                  >
                    <FaGoogle />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    type='button'
                    className='w-full'
                    disabled={pending}
                    onClick={() => onSubmitSocial("github")}
                  >
                    <FaGithub />
                    Github
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account? {" "}
                  <Link href={"/sign-in"} className='underline underline-offset-4'>
                    Sign In
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col
                        gap-y-4 items-center justify-center">
            <Image
              src={"./logo.svg"}
              alt={"Logo"}
              width={100}
              height={100}
            />
            <p className="text-2xl font-semibold text-white">
              Meet.AI
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs
            text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and {" "}
        <a href="#">Privacy Policy</a>
      </div>
    </div>
  )
};

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { registerSchema } from "../../schemas";
import z from "zod";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

type SignUpFormValues = z.infer<typeof registerSchema>;

const poppins = Poppins({ subsets: ["latin"], weight: ["700"] });

export const SignUpView = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
    console.log(values);
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-5'>
      <div className='bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8 p-4 lg:p-16'>
            <div className='flex items-center justify-between mb-8'>
              <Link href='/'>
                <span className={cn("text-2xl font-semibold", poppins.className)}>Ecomm</span>
              </Link>

              <Button asChild variant={"ghost"} size='sm' className='text-base border-none underline'>
                <Link prefetch href='/sign-in'>
                  Sign In
                </Link>
              </Button>
            </div>

            <h1 className='text-4xl font-medium'>Join over 1000 creators earning money on Ecomm app</h1>
            <FormField
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div
        className='h-screen w-full lg:col-span-2 hidden lg:block'
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { loginSchema } from "@/modules/auth/schemas";
import z from "zod";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

type LoginFormValues = z.infer<typeof loginSchema>;

const poppins = Poppins({ subsets: ["latin"], weight: ["700"] });

export const SignInView = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const queryKey = getQueryKey(trpc.auth.session, undefined, "query");

  const mutation = trpc.auth.login.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: async () => {
      toast.success("Logging in and redirecting..");
      await queryClient.invalidateQueries({ queryKey });
      router.push("/");
    },
  });

  const form = useForm<LoginFormValues>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => mutation.mutate(values);

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
                <Link prefetch href='/sign-up'>
                  Sign Up
                </Link>
              </Button>
            </div>

            <h1 className='text-4xl font-medium'>Welcome back to Ecomm App</h1>
            <FormField
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your password' {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              size='lg'
              variant='elevated'
              disabled={mutation.isPending}
              className='bg-black text-white hover:bg-pink-400 hover:text-primary'>
              Log in
            </Button>
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

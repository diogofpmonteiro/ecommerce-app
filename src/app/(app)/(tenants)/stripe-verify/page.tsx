"use client";

import { trpc } from "@/trpc/client";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";

const StripeVerifyPage = () => {
  const { mutate: verify } = trpc.checkout.verify.useMutation({
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: () => {
      window.location.href = "/";
    },
  });

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <LoaderIcon className='animate-spin text-muted-foreground' />
    </div>
  );
};

export default StripeVerifyPage;

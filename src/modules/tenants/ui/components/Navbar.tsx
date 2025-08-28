"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { trpc } from "@/trpc/client";
import { generateTenantUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";

const CheckoutButton = dynamic(
  () => import("@/modules/checkout/ui/components/checkout-button").then((mod) => mod.CheckoutButton),
  {
    ssr: false,
    loading: () => (
      <Button disabled className='bg-white'>
        <ShoppingCartIcon className='text-black' />
      </Button>
    ),
  }
);

export const Navbar = ({ slug }: { slug: string }) => {
  const [data] = trpc.tenants.getOne.useSuspenseQuery({ slug });

  return (
    <nav className='h-20 border-b font-medium bg-white'>
      <div className='max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12'>
        <Link href={generateTenantUrl(slug)} className='flex items-center gap-2'>
          {data.image?.url && (
            <Image
              src={data.image.url}
              width={32}
              height={32}
              alt='picture'
              className='rounded-full border shrink-0 size-[32px]'
            />
          )}
          <p className='text-xl'>{data.name}</p>
        </Link>
        <CheckoutButton tenantSlug={slug} hideIfEmpty />
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className='h-20 border-b font-medium bg-white'>
      <div className='max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12'>
        <div />
        <Button disabled className='bg-white'>
          <ShoppingCartIcon className='text-black' />
        </Button>
      </div>
    </nav>
  );
};

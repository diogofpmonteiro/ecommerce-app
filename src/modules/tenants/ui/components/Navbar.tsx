"use client";

import { generateTenantUrl } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className='h-20 border-b font-medium bg-white'>
      <div className='max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12'>
        <div />
      </div>
    </nav>
  );
};

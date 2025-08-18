"use client";

import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import Link from "next/link";

interface SearchInputProps {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: SearchInputProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data } = trpc.auth.session.useQuery();

  return (
    <div className='flex items-center gap-2 w-full'>
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className='relative w-full'>
        <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500' />
        <Input className='pl-8' placeholder='Search products' disabled={disabled} />
      </div>
      <Button variant='elevated' className='size-12 shrink-0 flex lg:hidden' onClick={() => setIsSidebarOpen(true)}>
        <ListFilterIcon />
      </Button>
      {data?.user && (
        <Button asChild variant={"elevated"}>
          <Link href={"/library"}>
            <BookmarkCheckIcon className='mr-2' />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
};

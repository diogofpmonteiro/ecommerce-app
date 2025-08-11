"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/trpc/client";
import { CategoriesGetManyOutput, CategorySingleOutput } from "@/modules/categories/types";

interface CategoriesSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar = ({ open, onOpenChange }: CategoriesSidebarProps) => {
  const [data] = trpc.categories.getMany.useSuspenseQuery();
  const router = useRouter();

  const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutput | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategorySingleOutput | null>(null);

  // if we have parent categories, show those, otherwise show root categories
  const currentCategories = parentCategories ?? data ?? [];

  const backgroundColor = selectedCategory?.color || "white";

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
  };

  const handleCategoryClick = (category: CategorySingleOutput) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as unknown as CategoriesGetManyOutput);
      setSelectedCategory(category);
    } else {
      // this is a leaf category (no subcategories)
      if (parentCategories && selectedCategory) {
        // This is a subcategory - navigate to /category/subcategory
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push(`/`);
        } else {
          router.push(`/${category.slug}`);
        }
      }

      handleOpenChange(false);
    }
  };

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side='left' className='p-0 transition-none' style={{ backgroundColor }}>
        <SheetHeader className=''>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className='flex flex-col overflow-y-auto h-full pb-2'>
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'>
              <ChevronLeftIcon className='size-4 mr-2' />
              Back
            </button>
          )}

          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className='w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium'>
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && <ChevronRightIcon className='size-4' />}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

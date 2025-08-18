"use client";

import { trpc } from "@/trpc/client";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "@/modules/home/constants";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";

export const SearchFilters = () => {
  const [data] = trpc.categories.getMany.useSuspenseQuery();

  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";

  const activeCategoryData = data.find((category) => category.slug === activeCategory);
  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubcategory = params.subcategory as string | undefined;
  const activeSubcategoryName =
    activeCategoryData?.subcategories.find((subcategory) => subcategory.slug === activeSubcategory)?.name || null;

  return (
    <div
      className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'
      style={{ backgroundColor: activeCategoryColor }}>
      <SearchInput />
      <div className='hidden lg:block'>
        <Categories data={data} />
      </div>
      <BreadcrumbNavigation
        activeCategory={activeCategory}
        categoryName={activeCategoryName}
        subcategoryName={activeSubcategoryName}
      />
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'
      style={{ backgroundColor: DEFAULT_BG_COLOR }}>
      <SearchInput disabled />
      <div className='hidden lg:block'>
        <div className='h-11' />
      </div>
    </div>
  );
};

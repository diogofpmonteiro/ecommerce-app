"use client";

import { trpc } from "@/trpc/client";
import { useProductFilters } from "../../hooks/use-product-filters";

interface Props {
  category?: string;
}

export const ProductList = ({ category }: Props) => {
  const [filters] = useProductFilters();
  const [data] = trpc.products.getMany.useSuspenseQuery({
    categorySlug: category,
    ...filters,
  });

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
      {data?.docs.map((product) => (
        <div key={product.id} className='border rounded-md bg-white p-4'>
          <h2 className='text-xl font-medium'>{product.name}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export const ProductListSkeleton = () => {
  return (
    <div>
      <h2>Product List</h2>
      <p>Loading...</p>
    </div>
  );
};

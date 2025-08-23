"use client";

import { trpc } from "@/trpc/client";
import { useProductFilters } from "../../hooks/use-product-filters";
import { ProductCard } from "./product-card";

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
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          imageUrl={product.image?.url}
          authorUsername={"diogo"}
          authorImageUrl={undefined}
          reviewRating={3}
          reviewCount={5}
          price={product.price}
        />
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

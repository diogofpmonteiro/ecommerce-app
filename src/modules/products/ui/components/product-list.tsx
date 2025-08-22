"use client";

import { trpc } from "@/trpc/client";

interface Props {
  category?: string;
}

export const ProductList = ({ category }: Props) => {
  const [data] = trpc.products.getMany.useSuspenseQuery({ categorySlug: category });

  return (
    <div>
      <h2>Product List</h2>
      {JSON.stringify(data, null, 2)}
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

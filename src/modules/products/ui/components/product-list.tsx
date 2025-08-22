"use client";

import { trpc } from "@/trpc/client";

export const ProductList = () => {
  const [data] = trpc.products.getMany.useSuspenseQuery();

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

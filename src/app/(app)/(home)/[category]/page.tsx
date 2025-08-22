import { ProductList, ProductListSkeleton } from "@/modules/products/ui/components/product-list";
import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ category: string }>;
}

const Page = async ({}: Props) => {
  void trpc.products.getMany.prefetch();

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;

import { ProductList, ProductListSkeleton } from "@/modules/products/ui/components/product-list";
import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ subcategory: string }>;
}

const Page = async ({ params }: Props) => {
  const { subcategory } = await params;
  void trpc.products.getMany.prefetch({ categorySlug: subcategory });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList category={subcategory} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;

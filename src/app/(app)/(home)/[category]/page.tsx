import { ProductList, ProductListSkeleton } from "@/modules/products/ui/components/product-list";
import { ProductFilters } from "@/modules/products/ui/components/product-filters";
import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ category: string }>;
}

const Page = async ({ params }: Props) => {
  const { category } = await params;
  void trpc.products.getMany.prefetch({ categorySlug: category });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <div className='px-4 lg:px-12 py-8 flex flex-col gap-4'>
          <div className='grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12'>
            <div className='lg:col-span-2 '>
              <ProductFilters />
            </div>
            <div className='lg:col-span-4 xl:col-span-6'>
              <Suspense fallback={<ProductListSkeleton />}>
                <ProductList category={category} />
              </Suspense>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;

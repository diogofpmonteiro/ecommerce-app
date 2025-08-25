import type { SearchParams } from "nuqs";
import { HydrateClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { loadProductFilters } from "@/modules/products/hooks/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const filters = await loadProductFilters(searchParams);

  void trpc.products.getMany.prefetchInfinite({
    ...filters,
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ProductListView />
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;

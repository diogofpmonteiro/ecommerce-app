import type { SearchParams } from "nuqs";
import { HydrateClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { loadProductFilters } from "@/modules/products/hooks/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}

const Page = async ({ params, searchParams }: Props) => {
  const { category } = await params;

  const filters = await loadProductFilters(searchParams);

  void trpc.products.getMany.prefetchInfinite({
    ...filters,
    categorySlug: category,
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ProductListView category={category} />
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;

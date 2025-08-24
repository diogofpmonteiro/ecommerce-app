import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/hooks/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { SearchParams } from "nuqs";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ subcategory: string }>;
  searchParams: Promise<SearchParams>;
}

const Page = async ({ params, searchParams }: Props) => {
  const { subcategory } = await params;
  const filters = await loadProductFilters(searchParams);

  void trpc.products.getMany.prefetchInfinite({
    ...filters,
    categorySlug: subcategory,
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ProductListView category={subcategory} />
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;

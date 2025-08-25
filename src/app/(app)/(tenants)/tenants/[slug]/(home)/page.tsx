import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/hooks/search-params";
import { ProductListSkeleton } from "@/modules/products/ui/components/product-list";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { HydrateClient, trpc } from "@/trpc/server";
import type { SearchParams } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
}

const Page = async ({ searchParams, params }: Props) => {
  const { slug } = await params;
  const filters = await loadProductFilters(searchParams);

  void trpc.products.getMany.prefetchInfinite({
    ...filters,
    tenantSlug: slug,
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ProductListSkeleton narrowView />}>
        <ProductListView tenantSlug={slug} narrowView />
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;

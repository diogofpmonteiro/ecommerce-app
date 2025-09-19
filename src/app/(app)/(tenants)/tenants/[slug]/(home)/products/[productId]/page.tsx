import { ProductView, ProductViewSkeleton } from "@/modules/products/ui/views/product-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ productId: string; slug: string }>;
}

const Page = async ({ params }: Props) => {
  const { productId, slug } = await params;

  void trpc.products.getOne.prefetch({
    id: productId,
  });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ProductViewSkeleton />}>
        <ProductView productId={productId} tenantSlug={slug} />
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;

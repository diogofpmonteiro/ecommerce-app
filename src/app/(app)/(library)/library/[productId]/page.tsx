import { ProductView } from "@/modules/library/ui/views/product-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ productId: string }>;
}

const Page = async ({ params }: Props) => {
  const { productId } = await params;

  void trpc.library.getOne.prefetch({
    productId,
  });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<>Error loading library</>}>
        <ProductView productId={productId} />
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;

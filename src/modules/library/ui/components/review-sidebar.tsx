import { trpc } from "@/trpc/client";
import { ReviewForm } from "./review-form";

interface Props {
  productId: string;
}

export const ReviewSidebar = ({ productId }: Props) => {
  const [data] = trpc.reviews.getOne.useSuspenseQuery({
    productId,
  });

  return <ReviewForm productId={productId} initialData={data} />;
};

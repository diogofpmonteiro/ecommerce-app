import { StarPicker } from "@/components/star-picker";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ReviewsGetOneOutput } from "@/modules/reviews/types";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface Props {
  productId: string;
  initialData?: ReviewsGetOneOutput;
}

type ReviewFormType = z.infer<typeof formSchema>;

const formSchema = z.object({
  rating: z.number().min(1, { message: "Rating is required" }).max(5),
  description: z.string().min(1, { message: "Description is required" }),
});

export const ReviewForm = ({ productId, initialData }: Props) => {
  const [isPreview, setIsPreview] = useState(!!initialData);

  const form = useForm<ReviewFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: initialData?.rating ?? 0,
      description: initialData?.description ?? "",
    },
  });

  const queryKey = getQueryKey(trpc.reviews.getOne, undefined, "query");

  const queryClient = useQueryClient();

  const createReview = trpc.reviews.create.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      setIsPreview(true);
      toast.success("Review created..");
    },
  });

  const updateReview = trpc.reviews.update.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      setIsPreview(true);
      toast.success("Review updated..");
    },
  });

  const onSubmit = (values: ReviewFormType) => {
    if (initialData) {
      updateReview.mutate({
        reviewId: initialData.id,
        rating: values.rating,
        description: values.description,
      });
    } else {
      createReview.mutate({
        productId,
        rating: values.rating,
        description: values.description,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <p className='font-medium'>{isPreview ? "Your rating:" : "Liked it? Give it a rating"}</p>
        <FormField
          control={form.control}
          name='rating'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <StarPicker value={field.value} onChange={field.onChange} disabled={isPreview} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder='Want to leave a written review?' disabled={isPreview} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isPreview && (
          <Button
            variant={"elevated"}
            disabled={createReview.isPending || updateReview.isPending}
            type='submit'
            size={"lg"}
            className='bg-black text-white hover:bg-pink-400 hover:text-primary w-fit'>
            {initialData ? "Update review" : "Post review"}
          </Button>
        )}
      </form>
      {isPreview && (
        <Button
          onClick={() => setIsPreview(false)}
          size={"lg"}
          type='button'
          variant={"elevated"}
          className='w-fit mt-4'>
          Edit
        </Button>
      )}
    </Form>
  );
};

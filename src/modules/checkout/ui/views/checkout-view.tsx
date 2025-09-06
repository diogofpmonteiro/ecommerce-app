"use client";

import { toast } from "sonner";
import { trpc } from "@/trpc/client";
import { useCart } from "../../hooks/use-cart";
import { generateTenantUrl } from "@/lib/utils";
import { CheckoutItem } from "../components/checkout-item";
import { CheckoutSidebar } from "../components/checkout-sidebar";
import { InboxIcon, LoaderIcon } from "lucide-react";
import { useCheckoutStates } from "../../hooks/use-checkout-states";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

interface Props {
  tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: Props) => {
  const router = useRouter();
  const [states, setStates] = useCheckoutStates();
  const { productIds, removeProduct, clearCart } = useCart(tenantSlug);
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    // error
  } = trpc.checkout.getProducts.useQuery({
    ids: productIds,
  });

  const purchase = trpc.checkout.purchase.useMutation({
    onMutate: () => {
      setStates({ success: false, cancel: false });
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        // TODO: modify when subdomains enabled
        router.push("/sign-in");
      }
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (states.success) {
      const queryKey = getQueryKey(trpc.library.getMany, undefined, "query");
      setStates({ success: false, cancel: false });
      clearCart();
      queryClient.invalidateQueries({ queryKey });

      router.push("/library");
    }
  }, [states.success, clearCart, router, setStates, queryClient]);

  // brute force to clear cart in case
  // product gets deleted in DB while it is in user cart
  // maybe we can check this inside the purchase flow somewhere
  //   useEffect(() => {
  //     if (!error) return;

  //     if (error.data?.code === "NOT_FOUND") {
  //       clearCart();
  //       toast.warning("Invalid products found, cart cleared");
  //     }
  //   }, [error, clearCart]);

  if (isLoading) {
    return (
      <div className='lg:pt-16 pt-4 px-4 lg:px-12'>
        <div className='border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg'>
          <LoaderIcon className='text-muted-foreground animate-spin' />
        </div>
      </div>
    );
  }

  if (data?.totalDocs === 0) {
    return (
      <div className='lg:pt-16 pt-4 px-4 lg:px-12'>
        <div className='border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg'>
          <InboxIcon />
          <p className='text-base font-medium'>No products found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='lg:pt-16 pt-4 px-4 lg:px-12'>
      <div className='grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16'>
        <div className='lg:col-span-4'>
          <div className='border rounded-md overflow-hidden bg-white'>
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
                tenantUrl={generateTenantUrl(product.tenant.slug)}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>

        <div className='lg:col-span-3'>
          <CheckoutSidebar
            total={data?.totalPrice || 0}
            onPurchase={() => purchase.mutate({ tenantSlug, productIds })}
            isCanceled={states.cancel}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  );
};

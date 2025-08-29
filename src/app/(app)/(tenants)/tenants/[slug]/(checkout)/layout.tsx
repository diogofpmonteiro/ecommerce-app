import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/checkout/ui/components/navbar";

interface CheckoutLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const CheckoutLayout = async ({ children, params }: CheckoutLayoutProps) => {
  const { slug } = await params;

  return (
    <div className='min-h-screen bg-[#F4F4F0] flex flex-col'>
      <Navbar slug={slug} />
      <div className='flex-1'>
        <div className='max-w-(--breakpoint-xl) mx-auto'>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutLayout;

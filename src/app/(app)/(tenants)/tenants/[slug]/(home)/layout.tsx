import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar, NavbarSkeleton } from "@/modules/tenants/ui/components/navbar";
import { HydrateClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const Layout = async ({ children, params }: Props) => {
  const { slug } = await params;

  void trpc.tenants.getOne.prefetch({ slug });

  return (
    <div className='min-h-screen bg-[#F4F4F0] flex flex-col'>
      <HydrateClient>
        <ErrorBoundary fallback={<NavbarSkeleton />}>
          <Navbar slug={slug} />
        </ErrorBoundary>
      </HydrateClient>
      <div className='flex-1'>
        <div className='max-w-(--breakpoint-xl) mx-auto'>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

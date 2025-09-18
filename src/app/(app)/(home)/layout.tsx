import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";
import { SearchFilters, SearchFiltersSkeleton } from "@/modules/home/ui/components/search-filters";
import { HydrateClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  void trpc.categories.getMany.prefetch();

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <HydrateClient>
        <ErrorBoundary fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </ErrorBoundary>
      </HydrateClient>
      <div className='flex-1 bg-[#f4f4f0]'>{children}</div>
      <Footer />
    </div>
  );
}

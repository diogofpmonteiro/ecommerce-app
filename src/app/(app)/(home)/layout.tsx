import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { SearchFilters, SearchFiltersSkeleton } from "./_components/search-filters";
import { HydrateClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  void trpc.categories.getMany.prefetch();

  return (
    <HydrateClient>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<SearchFiltersSkeleton />}>
            <SearchFilters />
          </Suspense>
        </ErrorBoundary>
        <div className='flex-1 bg-[#f4f4f0]'>{children}</div>
        <Footer />
      </div>
    </HydrateClient>
  );
}

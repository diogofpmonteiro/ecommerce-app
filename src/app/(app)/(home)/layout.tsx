import { getPayload } from "payload";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { SearchFilters } from "./_components/search-filters";
import configPromise from "@payload-config";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.find({
    collection: "categories",
    depth: 1, // populate subcategories
    where: {
      parent: {
        exists: false, // fetch top-level categories only
      },
    },
  });

  const formattedData: CustomCategory[] = data.docs.map((category) => ({
    ...category,
    subcategories: (category.subcategories?.docs ?? []).map((subcategory) => ({
      ...(subcategory as Category), // we can infer the type here because of depth: 1
      subcategories: undefined,
    })),
  }));

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className='flex-1 bg-[#f4f4f0]'>{children}</div>
      <Footer />
    </div>
  );
}

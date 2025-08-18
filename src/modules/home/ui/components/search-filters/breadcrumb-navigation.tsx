import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  activeCategory: string;
  categoryName: string | null;
  subcategoryName: string | null;
}

export const BreadcrumbNavigation = ({ activeCategory, categoryName, subcategoryName }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {subcategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className='text-xl font-medium underline text-primary'>
                <Link href={`/${activeCategory}`}>{categoryName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='text-primary font-medium text-lg'>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className='text-xl font-medium'>{subcategoryName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className='text-xl font-medium'>{categoryName}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

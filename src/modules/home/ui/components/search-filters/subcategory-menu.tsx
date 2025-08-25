import Link from "next/link";
import { CategorySingleOutput } from "@/modules/categories/types";
import { DEFAULT_BG_COLOR } from "@/modules/home/constants";

interface SubcategoryMenuProps {
  category: CategorySingleOutput;
  isOpen: boolean;
}

export const SubcategoryMenu = ({ category, isOpen }: SubcategoryMenuProps) => {
  if (!isOpen || !category.subcategories || category.subcategories.length === 0) return null;

  const backgroundColor = category.color || DEFAULT_BG_COLOR;

  return (
    <div className='absolute z-100' style={{ top: "100%", left: 0 }}>
      <div className='h-3 w-60' />
      <div
        className='text-black w-60 rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]'
        style={{ backgroundColor }}>
        <div>
          {category.subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className='w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium'>
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

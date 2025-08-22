import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Where } from "payload";
import z from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        categorySlug: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      if (input.categorySlug) {
        const categoriesData = await ctx.payload.find({
          collection: "categories",
          limit: 1,
          depth: 1, // populates subcategories
          pagination: false,
          where: {
            slug: {
              equals: input.categorySlug,
            },
          },
        });

        const formattedData = categoriesData.docs.map((category) => ({
          ...category,
          subcategories: (category.subcategories?.docs ?? []).map((subcategory) => ({
            ...(subcategory as Category), // we can infer the type here because of depth: 1
            subcategories: undefined,
          })),
        }));

        const subcategoriesSlugs = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subcategoriesSlugs.push(...parentCategory?.subcategories?.map((subcategory) => subcategory.slug));
        }

        where["category.slug"] = {
          in: [parentCategory.slug, ...subcategoriesSlugs],
        };
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 1, // populates "image" & "category"
        where,
      });

      return data;
    }),
});

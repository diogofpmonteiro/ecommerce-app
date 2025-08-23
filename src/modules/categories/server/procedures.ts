import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "categories",
      depth: 1, // populate subcategories
      where: {
        parent: {
          exists: false, // fetch top-level categories only
        },
      },
      sort: "name",
    });

    const formattedData = data.docs.map((category) => ({
      ...category,
      subcategories: (category.subcategories?.docs ?? []).map((subcategory) => ({
        ...(subcategory as Category), // we can infer the type here because of depth: 1
      })),
    }));

    return formattedData;
  }),
});

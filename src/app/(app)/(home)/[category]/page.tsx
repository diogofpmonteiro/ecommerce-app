interface Props {
  params: Promise<{ category: string }>;
}

const Page = async ({ params }: Props) => {
  const { category } = await params;

  return (
    <div>
      <h1>Category Page {category}</h1>
    </div>
  );
};

export default Page;

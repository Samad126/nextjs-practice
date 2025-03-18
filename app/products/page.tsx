import GridItem from "@/components/GridItem";

async function page({ searchParams }) {
  const searchQuery = (await searchParams)?.name || "";

  console.log("updated", searchQuery);

  const response = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });
  const data = await response.json();

  return (
    <div className="grid grid-cols-3 gap-10 max-w-[1200px] mx-auto">
      {data.products.map((item: any) => (
        <GridItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default page;

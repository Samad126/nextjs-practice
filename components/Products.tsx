import GridItem from "./GridItem";

async function Products({ searchParams }) {
  const params = await searchParams;

  const response = await fetch(
    `https://dummyjson.com/products/search?q=${params.name}`,
    {
      cache: "no-store",
    }
  );

  const data = await response.json();
  
  if (!data.products || data.products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-10 max-w-[1200px] mx-auto">
      {data.products.map((item: any) => (
        <GridItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default Products;

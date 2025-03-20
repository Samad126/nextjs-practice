async function Cats() {
  const response = await fetch("https://dummyjson.com/products/categories", {
    cache: "no-store",
  });

  const data = await response.json();
  console.log(data);

  return (
    <>
      {data.map((item: any, index: number) => (
        <div key={index} className="bg-gray-100 p-4 rounded-md">
          {item.name}
        </div>
      ))}
    </>
  );
}

export default Cats;

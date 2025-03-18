async function Cats() {
  const response = await fetch("https://dummyjson.com/products/categories", {
    cache: "no-store",
  });

  const data = await response.json();
  console.log(data);

  return <div>test</div>;
}

export default Cats;

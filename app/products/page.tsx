import Products from "@/components/Products";
import SearchAndCats from "@/components/SearchAndCats";
import { Suspense } from "react";

async function page({ searchParams }) {
  const { name } = await searchParams;

  return (
    <>
      <Suspense fallback={<div>Loading Categories...</div>}>
        <SearchAndCats />
      </Suspense>
      <Suspense key={name} fallback={<div>Loading Products...</div>}>
        <Products searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export default page;

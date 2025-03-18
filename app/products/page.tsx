import Products from "@/components/Products";
import SearchAndCats from "@/components/SearchAndCats";
import { Suspense } from "react";

async function page({ searchParams }) {
  return (
    <>
      <Suspense fallback={<div>Loading Categories...</div>}>
        <SearchAndCats />
      </Suspense>
      <Suspense
        key={JSON.stringify(await searchParams)}
        fallback={<div>Loading Products...</div>}
      >
        <Products searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export default page;

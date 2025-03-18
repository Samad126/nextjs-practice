import Link from "next/link";

async function Page({ params }) {
  const slugs = await params;

  const response = await fetch(`https://dummyjson.com/products/${slugs.id}`);
  const data = await response.json();

  return (
    <div>
      <h1>{data.title}</h1>
      <Link href={`/products/${slugs.id}/image`}>View Image</Link>
    </div>
  );
}

export default Page;

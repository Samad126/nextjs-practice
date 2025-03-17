import Link from "next/link";

async function page({ params }) {
  const slugs = await params;

  const response = await fetch(`https://dummyjson.com/products/${slugs.id}`);
  const data = await response.json();

  console.log(data);

  return <Link href={"image"}>{data.title}</Link>;
}

export default page;

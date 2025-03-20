import Image from "next/image";
import Link from "next/link";

async function Page({ params }) {
  const slugs = await params;

  const response = await fetch(`https://dummyjson.com/products/${slugs.id}`);
  const data = await response.json();

  return (
    <div>
      <div className="relative h-[400px] w-[400px]">
        <Image
          style={{ zIndex: "-1" }}
          src={data.images[0]}
          alt={""}
          fill
          sizes="full"
        />
      </div>
      <h1>{data.title}</h1>
      <Link href={`/products/${slugs.id}/image`}>View Image</Link>
    </div>
  );
}

export default Page;

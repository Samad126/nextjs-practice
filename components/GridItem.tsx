import Carusel from "./Carusel";
import Link from "next/link";

export default function GridItem({ data }: { data: any }) {
  return (
    <Link
      href={`/products/${data.id}`}
      className="border-black border block h-[400px]"
      prefetch={false}
    >
      <Carusel images={data.images} />
      <div>
        <p>{data.title}</p>
        <p>
          Price:{data.price}
          <span>
            {data.discountPercentage} {"percent"} off
          </span>
        </p>
        <p>{data.rating}</p>
      </div>
    </Link>
  );
}

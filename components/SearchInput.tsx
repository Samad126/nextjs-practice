"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [name, setName] = useState<string>(searchParams.get("name") || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set("name", name);
      params.set("page", "1");

      router.push(`${pathname}?${params.toString()}`);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [name, searchParams, pathname, router]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Name of the user"
      id="name"
      name="name"
      value={name}
      onChange={handleFilter}
    />
  );
}

export default SearchInput;

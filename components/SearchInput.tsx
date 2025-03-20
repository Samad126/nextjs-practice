"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isInit = useRef<boolean>(true);

  const [name, setName] = useState<string>(searchParams.get("name") || "");

  useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
      return;
    }
    
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
      type="search"
      className="border border-gray-300 rounded-md p-2"
      placeholder="Search..."
      id="name"
      name="name"
      value={name}
      onChange={handleFilter}
    />
  );
}

export default SearchInput;

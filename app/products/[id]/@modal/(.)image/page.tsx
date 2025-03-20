"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch image");

        const data = await response.json();
        setSelectedImage(data.images?.[0] || null);
      } catch (error) {
        console.error("Error fetching image:", error);
        setSelectedImage(null);
      }
    };

    if (id) fetchImage();
  }, [id]);

  function handleDivClick() {
    router.back();
  }

  return (
    <div className="w-full absolute">
      <div
        className="bg-black opacity-50 fixed inset-0"
        onClick={() => handleDivClick()}
      ></div>
      <div className="relative left-1/2 -translate-x-1/2 h-screen w-[400px] bg-white z-50">
        {selectedImage && (
          <Image src={selectedImage} alt="Product Image" fill sizes="auto" />
        )}
      </div>
    </div>
  );
}

export default Page;

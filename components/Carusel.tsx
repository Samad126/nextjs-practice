"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

import { Navigation } from "swiper/modules";
import Image from "next/image";

export default function Carusel({ images }: { images: string[] }) {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={img}
                alt={index.toString()}
                fill
                sizes="auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

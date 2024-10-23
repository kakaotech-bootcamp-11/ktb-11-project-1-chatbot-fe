import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRestaurantQuery } from "../hooks/useRestaurantQuery";
import ryan from "../../../../public/images/ryan.png";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

// bg-[#1e2836]

export default function RestaurantWidget() {
  const { data } = useRestaurantQuery();

  return (
    <Carousel className="relative flex flex-col items-center justify-stretch w-full bg-gray-100 text-black rounded-xl space-y-2 ">
      <CarouselNext className="absolute right-2 top-5 text-black" />
      <CarouselPrevious className="absolute left-2 top-4 text-black" />
      <div className="font-bold text-lg flex flex-col items-center">
        오늘의 맛집 추천
      </div>
      <CarouselContent className=" p-4">
        {data?.map((restaurant, index) => (
          <CarouselItem className="space-y-4" key={index}>
            <div className="flex justify-between px-2">
              <div className="font-bold">상호명: {restaurant.name}</div>
              <Link
                className="flex items-center gap-2"
                href={restaurant.kakaoMapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={15} />
                위치
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {restaurant.images.map((image, idx) => (
                <div key={idx} className="relative w-full h-20">
                  <Image
                    fill
                    src={image || ryan}
                    alt={`dish ${idx + 1}`}
                    className="rounded-lg object-cover object-center border border-gray-300"
                    sizes="100"
                  />
                </div>
              ))}
            </div>
            <div className="mt-2">
              <div className="text-black">
                {restaurant.recommendedBy}이 추천한 맛집
              </div>
              <div className="font-bold ">{restaurant.recommendation}</div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

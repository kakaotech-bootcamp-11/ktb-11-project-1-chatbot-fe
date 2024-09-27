import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const restaurantInfo = [
  {
    id: 10,
    name: "서호 돈가스",
    recommendedBy: "J***",
    recommendation: "김치찜가스가 맛있읍니다.",
    images: [
      "/images/food9.jpg",
      "/images/food10.jpg",
      "/images/food11.jpg",
      "/images/food12.jpg",
    ],
  },
  {
    id: 20,
    name: "제주은희네해장국 판교점",
    recommendedBy: "R**",
    recommendation: "국물이 진하고 깔끔합니다.",
    images: [
      "/images/food5.jpg",
      "/images/food6.jpg",
      "/images/food7.jpg",
      "/images/food8.jpg",
    ],
  },
  {
    id: 30,
    name: "오한수 우육면가 판교점",
    recommendedBy: "E****",
    recommendation: "맛있습니다^^",
    images: [
      "/images/food1.jpg",
      "/images/food2.jpg",
      "/images/food3.jpg",
      "/images/food4.jpg",
    ],
  },
];

export default function RestaurantWidget() {
  return (
    <Carousel className="relative flex flex-col items-center justify-stretch w-full bg-[#1e2836] text-white rounded-xl space-y-2 ">
      <CarouselNext className="absolute right-2 top-5 text-black" />
      <CarouselPrevious className="absolute left-2 top-4 text-black" />
      <div className="font-bold text-lg flex flex-col items-center">
        오늘의 맛집 추천
        <span className="text-xs font-normal text-gray-300">
          {" "}
          (시범 위젯입니다.)
        </span>
      </div>
      <CarouselContent className=" p-4">
        {restaurantInfo.map((restaurant, index) => (
          <CarouselItem className="space-y-4" key={restaurant.id}>
            <div className=" font-bold">상호명: {restaurant.name}</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {restaurant.images.map((image, idx) => (
                <div key={idx} className="relative w-full h-20">
                  <Image
                    fill
                    src={image || "/images/food1.png"}
                    alt={`dish ${idx + 1}`}
                    className="rounded-lg object-cover object-center"
                    sizes="100"
                  />
                </div>
              ))}
            </div>
            <div className="mt-2">
              <div className="text-gray-300">
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

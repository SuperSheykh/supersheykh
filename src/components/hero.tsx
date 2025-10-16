import { Link } from "@tanstack/react-router";
import Gutter from "./gutter";
import { Button } from "./ui/button";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTrans } from "@/hooks/use-trans";
import { Billboard } from "@/db/schema/billboards";
import { useLoaderData } from "@tanstack/react-router";

const hero = () => {
  const billboards = useLoaderData({ from: "/" });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="pt-4 md:pt-8 lg:pt-12">
      <Gutter>
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {billboards.map((item) => (
              <CarouselItem key={item.id}>
                <HeroItem {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/*  build bullet horizontal list that marks switch carousel is active */}
        <div className="flex justify-center gap-2 mt-10">
          {billboards.map((item, index) => (
            <button
              key={item.id}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition ease-in-out",
                current === index + 1 ? "bg-primary" : "bg-gray-300",
              )}
            />
          ))}
        </div>
      </Gutter>
    </div>
  );
};

export default hero;

const HeroItem = ({
  title,
  title_fr,
  greeting,
  greeting_fr,
  description,
  description_fr,
  buttonLink,
  buttonText,
  buttonText_fr,
  subLink,
  subLinkText,
  imageKey,
  subText,
  subText_fr,
  subLinkText_fr,
}: Billboard) => {
  const t = useTrans();
  return (
    <div className="md:flex ">
      <div className="text-xl md:text-2xl text-center md:w-1/2 md:self-center md:text-start flex flex-col gap-4 lg:gap-6 items-center md:items-start">
        <p>{greeting && t(greeting, greeting_fr ?? "")}</p>
        <p className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary capitalize">
          {t(title, title_fr)}
        </p>
        <p>{description && t(description, description_fr ?? "")}</p>
        <Button
          size="lg"
          className="capitalize rounded-none self-center md:text-xl py-6 md:self-start md:mt-8"
          variant="outline"
          asChild
        >
          <Link to={buttonLink}>
            {buttonText && buttonText_fr && t(buttonText, buttonText_fr)}
          </Link>
        </Button>
      </div>
      <div className="md:w-1/2">
        <img src={`/images/${imageKey}`} alt={""} className="w-full" />
        {subText && subLink && subLinkText && (
          <div className="border-2 rounded-none flex gap-4 items-center p-2 px-4 md:p-4">
            <div className="w-4 aspect-square bg-primary" />
            <div>
              <p className="font-light">{t(subText, subText_fr)}</p>
              <Link
                to={subLink}
                className="cursor-pointer hover:underline hover:text-primary font-bold transition ease-in-out"
              >
                {t(subLinkText, subLinkText_fr)}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

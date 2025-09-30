import Gutter from "./gutter";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

// lets build a hero carousel component perfect for a landing page, portfolio or blog
const hero = () => {
  return (
    <div>
      <Gutter>
        <Carousel>
          <CarouselContent>
            <CarouselItem>item 1</CarouselItem>
            <CarouselItem>item 2</CarouselItem>
          </CarouselContent>
        </Carousel>
      </Gutter>
    </div>
  );
};

export default hero;

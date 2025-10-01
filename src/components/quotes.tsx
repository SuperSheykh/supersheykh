import { cn } from "@/lib/utils";
import Gutter from "./gutter";
import { QuoteIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { useTrans } from "@/hooks/use-trans";

import { QUOTES } from "@/lib/constants";

const Quotes = () => {
  return (
    <div>
      <Gutter>
        <Carousel>
          <CarouselContent className="py-4">
            {QUOTES.map((quote) => (
              <CarouselItem key={quote.id} className="py-4">
                <QuoteElement {...quote} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Gutter>
    </div>
  );
};

export default Quotes;

const QuoteElement = (quote: (typeof QUOTES)[number]) => {
  const t = useTrans();
  return (
    <div className="relative max-w-4xl mx-auto">
      <blockquote className="border border-border p-8 text-center relative">
        <div
          className={cn(
            "p-2 bg-background flex justify-center items-center text-foreground",
            "absolute -top-px left-4 text-6xl font-serif transform -translate-y-1/2",
          )}
        >
          <QuoteIcon />
        </div>
        <p className="text-2xl md:text-3xl">{t(quote.quote, quote.quote_fr)}</p>
      </blockquote>
      <figcaption className="absolute -bottom-5 right-8 bg-card px-4 py-2 border border-border">
        <p className="text-lg whitespace-nowrap">{quote.author}</p>
      </figcaption>
    </div>
  );
};

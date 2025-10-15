import { cn } from "@/lib/utils";
import Gutter from "./gutter";
import { QuoteIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { useTrans } from "@/hooks/use-trans";
import { Skeleton } from "./ui/skeleton";

import type { Quote } from "@/db/schema/quotes";
import { trpc } from "@/router";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "./section-title";

const Quotes = () => {
  // const trpc = useTRPC();
  const { data, isLoading } = useQuery(trpc.quotes.getLive.queryOptions());

  if (isLoading) return <QuoteElementSkeleton />;

  if (data && data.length > 0)
    return (
      <div>
        <Gutter>
          <SectionTitle
            title="Quotes I live by"
            title_fr="Citations que j'aime"
          />
          <Carousel>
            <CarouselContent className="py-4">
              {data.map((quote) => (
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

const QuoteElement = (quote: Quote) => {
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
        <p className="text-2xl md:text-3xl">{t(quote.quote, quote.quote)}</p>
      </blockquote>
      <figcaption className="absolute -bottom-5 right-8 bg-card px-4 py-2 border border-border">
        <p className="text-lg whitespace-nowrap">{quote.author}</p>
      </figcaption>
    </div>
  );
};

const QuoteElementSkeleton = () => {
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="border border-border p-8 text-center relative">
        <div
          className={cn(
            "p-2 bg-background flex justify-center items-center text-foreground",
            "absolute -top-px left-4 text-6xl font-serif transform -translate-y-1/2",
          )}
        >
          <QuoteIcon />
        </div>
        <Skeleton className="h-8 w-3/4 mx-auto" />
      </div>
      <div className="absolute -bottom-5 right-8 bg-card px-4 py-2 border border-border">
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
};

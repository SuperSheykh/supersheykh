import { cn } from "@/lib/utils";
import Gutter from "./gutter";
import { QuoteIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { useTrans } from "@/hooks/use-trans";
import { trpc } from "@/lib/utils/trpc";
import { Skeleton } from "./ui/skeleton";

const Quotes = () => {
  const { data: quotes, isLoading } = trpc.quotes.getLive.useQuery();

  if (isLoading)
    return (
      <Gutter>
        <div className="py-4">
          <QuoteElementSkeleton />
        </div>
      </Gutter>
    );

  if (!quotes || quotes.length === 0) return null;

  return (
    <div>
      <Gutter>
        <Carousel>
          <CarouselContent className="py-4">
            {quotes.map((quote) => (
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

const QuoteElement = (quote: {
  id: string;
  quote: string;
  quote_fr: string | null;
  author: string;
}) => {
  const t = useTrans();
  return (
    <div className="relative max-w-4xl mx-auto">
      <blockquote className="border border-border p-8 text-center relative">
        <div
          className={cn(
            "p-2 bg-background flex justify-center items-center text-foreground",
            "absolute -top-px left-4 text-6xl font-serif transform -translate-y-1/2"
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

const QuoteElementSkeleton = () => {
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="border border-border p-8 text-center relative">
        <div
          className={cn(
            "p-2 bg-background flex justify-center items-center text-foreground",
            "absolute -top-px left-4 text-6xl font-serif transform -translate-y-1/2"
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

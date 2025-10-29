import { Link } from "@tanstack/react-router";
import Gutter from "./gutter";
import { useTrans } from "@/hooks/use-trans";
import { Button } from "./ui/button";

const NotFound = () => {
  const t = useTrans();
  return (
    <Gutter className="flex flex-col items-center justify-center h-full text-center">
      <div className="space-y-4">
        <h1 className="text-9xl font-bold text-destructive">404</h1>
        <p className="text-2xl md:text-3xl font-medium text-destructive">
          {t("Page not found", "Page introuvable!")}
        </p>
        <p className="text-lg text-muted-foreground">
          {t("It seems like you've stumbled upon a page that doesn't exist.", 'Il semble que vous recherchiez une page qui n\'existe pas.')}
        </p>
        <Button asChild variant="outline" size="lg">
          <Link
            to="/"
          >
            {t("Go back home", "Retour à l'accueil")}
          </Link>
        </Button>
      </div>
    </Gutter>
  );
};

export default NotFound;

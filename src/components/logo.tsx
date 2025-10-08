import { Link } from "@tanstack/react-router";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: ClassNameValue }) => {
  return (
    <Link to="/" className={cn("text-xl font-bold", className)}>
      @SuperSheykh
    </Link>
  );
};

export default Logo;

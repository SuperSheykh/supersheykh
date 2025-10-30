import { Link } from "@tanstack/react-router";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";
import LogoSvg from "/logo.svg";

const Logo = ({ className, }: { className?: ClassNameValue }) => {
  return (
    <Link to="/" className={cn('flex items-center justify-center', 'gap-4 text-foreground', className)}>
      <img src='/logo.png' alt='logo' className='text-foreground w-6 h-6 md:w-8 md:h-8' />
      {/* <LogoSvg /> */}
      <span className='text-foreground text-lg md:text-xl font-bold'>
        SuperSheykh
      </span>
    </Link>
  );
};

export default Logo;

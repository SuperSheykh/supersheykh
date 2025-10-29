import { Link } from "@tanstack/react-router";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

const Logo = ({ className, style = 'horizontal' }: { className?: ClassNameValue, style?: 'horizontal' | 'vertical' }) => {
  return (
    <Link to="/" className={cn(className, style === 'horizontal' ? 'flex items-center justify-center' : 'flex flex-col items-center justify-center', 'gap-4 text-foreground')}>
      <img src='/logo.png' alt='logo' className='w-8 h-8' />
      <span className='text-foreground text-xl font-bold'>
        SuperSheykh
      </span>
    </Link>
  );
};

export default Logo;

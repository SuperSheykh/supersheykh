import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "@tanstack/react-router";
import { User, LogOut } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface Props {
  inMenu?: boolean;
}

const LoginBtn = ({}: Props) => {
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);

  if (isPending) {
    return (
      <Button size="icon" variant="ghost" className="rounded-full">
        <Skeleton className="h-5 w-5" />
      </Button>
    );
  }

  if (session?.user) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">{session.user.name}</h4>
              <p className="text-sm text-muted-foreground">
                {session.user.email}
              </p>
            </div>
            <div className="grid gap-2">
              <Button asChild>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Button asChild size={"icon"} variant="ghost" className="rounded-full">
      <Link
        to="/login"
        search={{ type: "signin", redirectTo: window.location.pathname }}
      >
        <User className="h-5 w-5" />
      </Link>
    </Button>
  );
};

export default LoginBtn;

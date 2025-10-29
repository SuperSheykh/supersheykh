import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import AuthForm from "@/components/auth-form";
import Gutter from "@/components/gutter";

// Validate the search parameter from the URL
const loginSearchSchema = z.object({
  type: z.enum(["signin", "signup"]).default("signin"),
  redirectTo: z.string().optional()
});

export const Route = createFileRoute("/login")({
  validateSearch: (search) => loginSearchSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const { type, redirectTo } = useSearch({ from: "/login" });

  return (
    <Gutter className="w-full h-full flex items-center justify-center">
      <AuthForm type={type} callbackURL={redirectTo} />
    </Gutter>
  );
}


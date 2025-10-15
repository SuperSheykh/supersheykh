import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import AuthForm from "@/components/auth-form";

// Validate the search parameter from the URL
const loginSearchSchema = z.object({
  type: z.enum(["signin", "signup"]).default("signin"),
});

export const Route = createFileRoute("/login")({
  validateSearch: (search) => loginSearchSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const { type } = useSearch({ from: "/login" });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <AuthForm type={type} />
    </div>
  );
}


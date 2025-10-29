import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Facebook, Github, GoalIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useTrans } from "@/hooks/use-trans";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "./ui/spinner";
import { signIn, signUp } from "@/lib/auth-client";

interface AuthFormProps {
  type: "signin" | "signup";
  callbackURL?: string;
}

const AuthForm = ({ type, callbackURL }: AuthFormProps) => {
  const t = useTrans();
  const [isLoading, setIsLoading] = useState(false);

  // Define base schemas
  const formSchema = z.object({
    name: z.string().optional(),
    email: z.string().email({
      message: t(
        "Please enter a valid email.",
        "Veuillez entrer un email valide.",
      ),
    }),
    password: z.string().min(8, {
      message: t(
        "Password must be at least 8 characters.",
        "Le mot de passe doit contenir au moins 8 caractères.",
      ),
    }),
  });

  // Select the schema based on the type

  // Use the most complete schema for the form's type definition
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {

    const action =
      type === "signin"
        ? signIn.email({
          email: values.email,
          password: values.password,
          callbackURL: "/dashboard",
        })
        : signUp.email({
          name: values.name || "",
          email: values.email,
          password: values.password,
          callbackURL: "/dashboard",
        });

    toast.promise(action, {
      loading: t("Submitting...", "Envoi en cours..."),
      success: ({ error }) => {
        if (error) {
          throw error;
        }
        return t("Success! Redirecting...", "Succès ! Redirection...");
      },
      error: (err) =>
        err.message || t("Something went wrong!", "Une erreur est survenue !"),
      finally: () => setIsLoading(false),
    });
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          {type === "signin"
            ? t("Login", "Connexion")
            : t("Sign Up", "S'inscrire")}
        </CardTitle>
        <CardDescription>
          {type === "signin"
            ? t(
              "Enter your email below to login to your account.",
              "Entrez votre email ci-dessous pour vous connecter.",
            )
            : t(
              "Enter your details to create an account.",
              "Entrez vos informations pour créer un compte.",
            )}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {type === "signup" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Name", "Nom")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("John Doe")}
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("m@example.com")}
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Password", "Mot de passe")}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
              {type === "signin"
                ? t("Sign in", "Se connecter")
                : t("Create account", "Créer un compte")}
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("Or continue with", "Ou continuer avec")}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => signIn.social({
              provider: 'github',
              callbackURL: callbackURL,
            })}
          >
            <Github className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => signIn.social({
              provider: 'google',
              callbackURL: callbackURL,
            })}
          >
            <GoalIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => signIn.social({
              provider: 'facebook',
              callbackURL: callbackURL,
            })}
          >
            <Facebook className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          {type === "signin" ? (
            <>
              {t("Don't have an account?", "Vous n'avez pas de compte ?")}{" "}
              <Link
                to="/login"
                search={{ type: "signup" }}
                className="underline"
              >
                {t("Sign up", "S'inscrire")}
              </Link>
            </>
          ) : (
            <>
              {t("Already have an account?", "Vous avez déjà un compte ?")}{" "}
              <Link
                to="/login"
                search={{ type: "signin" }}
                className="underline"
              >
                {t("Login", "Connexion")}
              </Link>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};


export default AuthForm;

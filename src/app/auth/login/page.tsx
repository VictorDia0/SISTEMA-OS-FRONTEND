"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { LoginFormServices } from "@/services/loginFormServices";

const LoginPage = () => {
  const router = useRouter();
  const handleLoginSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-l from-white via-sky-400 to-sky-700 sm:flex-row">
      <header className="fixed top-0 w-full bg-transparent z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image
                src="/mapos-logo.png"
                alt="Mapos Logo"
                width={80}
                height={80}
                className="w-20 sm:w-24"
              />
            </Link>
          </div>
        </div>
      </header>

      <section className="flex items-center justify-center w-full px-4 sm:w-1/2">
        <Card className="w-full max-w-sm sm:max-w-md p-6 rounded-2xl shadow-lg bg-background">
          <CardHeader>
            <CardTitle className="text-lg sm:text-2xl font-light tracking-tight">
              Entre com sua conta
            </CardTitle>
            <CardDescription>
              Utilize seu email e senha para entrar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginFormServices onLogin={handleLoginSuccess} />
            <Button asChild className="mt-4 w-full">
              <Link href="/auth/signin">CADASTRAR</Link>
            </Button>
            <div className="flex items-center gap-4 mt-6">
              <Separator />
              <span className="text-xs">Ou</span>
              <Separator />
            </div>
            <Button
              variant="outline"
              className="mt-4 w-full border-sky-500 flex items-center justify-center"
            >
              <FaGoogle className="mr-2" /> Entrar com Google
            </Button>
          </CardContent>
          <CardFooter className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                Permanecer Conectado
              </Label>
            </div>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default LoginPage;

"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginFormServices } from "@/services/loginFormServices";

const LoginPage = () => {
  const router = useRouter();
  const handleLoginSuccess = (path: string) => {
    router.replace(path);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-l from-sky-300 via-sky-400 to-sky-700 sm:flex-row">
      <header className="fixed top-0 w-full bg-transparent z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        </div>
      </header>

      <section className="flex items-center justify-center w-full px-4 sm:w-1/2">
        <Card className="w-full max-w-sm sm:max-w-md p-6 rounded-2xl shadow-lg bg-background">
          <CardHeader>
              <CardTitle className="text-lg text-center sm:text-2xl font-bold">
              Sistema de Avaliação
            </CardTitle>
            <CardTitle className="text-lg text-center sm:text-2xl font-light tracking-tight">
              Entre com sua conta
            </CardTitle>
            <CardDescription className="text-center">
              Utilize seu email e senha para entrar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginFormServices onLogin={handleLoginSuccess} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default LoginPage;

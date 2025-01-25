"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInFormServices from "@/services/signInFormServices";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function SignIn() {
  const router = useRouter();

  const handleSignInSucess = () => {
    router.push("/dashboard");
  };

  return (
    <main className="h-screen flex flex-col justify-center sm:flex-row bg-gradient-to-l from-sky-700 via-sky-400 to-white">
      <header className="fixed top-0 w-full bg-transparent">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image
                src="/mapos-logo.png"
                alt="Mapos Logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
        </div>
      </header>
      <section className="flex items-center justify-center h-full w-full sm:w-1/2 p-8">
        <Card className="w-full max-w-md p-6 rounded-2xl shadow-2xl shadow-blue-500/40 bg-background">
          <CardHeader>
            <CardTitle className="text-2xl font-light tracking-tighter">
              Cadastrar
            </CardTitle>
            <CardDescription>Faça seu Cadastro no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInFormServices onSignIn={handleSignInSucess} />
            <Separator />
            <Button variant="outline" className="mt-2 w-full border-sky-500">
              <Link href="/login">Já tenho uma Conta</Link>
            </Button>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <div className="flex items-center justify-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Aceito Todos os Termos e Condições</Label>
            </div>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}

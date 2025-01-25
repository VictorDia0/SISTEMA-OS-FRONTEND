"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import api from "./axiosConfig";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!backendUrl) {
  console.error("NEXT_PUBLIC_BACKEND_URL não está configurada.");
  throw new Error(
    "A URL do backend não foi encontrada. Verifique o arquivo .env."
  );
}

interface SignInFormProps {
  onSignIn: () => void;
}

const ErrorAlert = ({ message }: { message: string }) => (
  <Alert
    variant="destructive"
    role="alert"
    aria-live="assertive"
    className="mt-4"
  >
    <AlertTitle>Erro</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

const SignInFormServices = ({ onSignIn }: SignInFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sanitizedPhoneNumber = phone_number.replace(/\D/g, "");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }
    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const response = await api.post(`${backendUrl}api/users/`, {
        name,
        surname,
        phone_number: sanitizedPhoneNumber,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      router.push("/dashboard");
      onSignIn();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Erro ao cadastrar.");
      } else {
        setError("Erro ao cadastrar. Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Formulário de Cadastro">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="surname">Sobrenome</Label>
        <Input
          id="surname"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone_number">Celular</Label>
        <Input
          id="phone_number"
          type="text"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <ErrorAlert message={error} />}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full btn btn-active mt-2"
      >
        {isLoading ? <Spinner className="text-white" /> : "CADASTRE-SE"}
      </Button>
    </form>
  );
};

export default SignInFormServices;

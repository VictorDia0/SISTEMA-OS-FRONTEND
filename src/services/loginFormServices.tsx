"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import api from "@/lib/api";
import { LoginFormProps } from "@/types/login";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!backendUrl) {
  console.error("NEXT_PUBLIC_BACKEND_URL não está configurada.");
  throw new Error(
    "A URL do backend não foi encontrada. Verifique o arquivo .env."
  );
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
const LoginFormServices = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleValidation = () => {
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    return true;
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!handleValidation()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post(`${backendUrl}api/auth/login`, {
        username,
        password,
      });
      const { token, role } = response.data;

      document.cookie = `token=${token}; path=/; max-age=86400;`;
      localStorage.setItem("role", role);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (role === "ADMIN") {
        onLogin("/admin/dashboard");
      } else if (role === "DOCENTE") {
        onLogin("/docente/dashboard");
      } else {
        onLogin("/aluno/dashboard");
      }

    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Erro desconhecido", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} aria-label="Login Form">
      <div>
        <Label htmlFor="Username">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="Digite seu username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-required="true"
          disabled={isLoading}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          id="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-required="true"
          disabled={isLoading}
        />
      </div>
      {error && <ErrorAlert message={error} />}
      <Button className="mt-6 w-full" type="submit" disabled={isLoading}>
        {isLoading ? <Spinner className="text-white" /> : "ENTRAR"}
      </Button>
    </form>
  );
};

export { LoginFormServices };

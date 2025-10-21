/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

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

const LoginFormServices = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleValidation = () => {
    if (form.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    return true;
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!handleValidation()) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.post(`${backendUrl}api/auth/login`, form);
   
      const { token, role } = response.data;

      login(token, role);

      if (role === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (role === "DOCENTE") {
        router.push("/docente/dashboard");
      } else {
        router.push("/aluno/dashboard");
      }

    } catch (err: any) {
      console.error("Erro no login:", err);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Erro ao fazer login. Verifique suas credenciais.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} aria-label="Login Form">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="Digite seu username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          aria-required="true"
          disabled={loading}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          id="password"
          placeholder="Digite sua senha"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          aria-required="true"
          disabled={loading}
        />
      </div>
      {error && <ErrorAlert message={error} />}
      <Button className="mt-6 w-full" type="submit" disabled={loading}>
        {loading ? <Spinner className="text-white" /> : "ENTRAR"}
      </Button>
    </form>
  );
};

export { LoginFormServices };
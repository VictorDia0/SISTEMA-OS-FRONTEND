/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Settings,
  Facebook,
  Linkedin,
  Instagram,
  ArrowLeft,
  Save
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function NovoAlunoPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    matricula: "",
    nome: "",
    email: "",
    semestre: "",
    ano: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'matricula' || name === 'semestre' || name === 'ano'
        ? Number(value)
        : value
    }));
  };
  if (!isAuthenticated) {
    return <div>Redirecionando para login...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dadosParaEnviar = {
        ...form,
        matricula: Number(form.matricula),
        semestre: Number(form.semestre),
        ano: Number(form.ano)
      };

      console.log("Enviando dados:", dadosParaEnviar);

      const response = await api.post("/api/alunos", dadosParaEnviar);

      console.log("Resposta do servidor:", response);

      alert("Aluno cadastrado com sucesso!");
      router.push("/admin/alunos");
    } catch (error: any) {
      console.error("Erro detalhado:", error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        alert(`Erro ao cadastrar aluno: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        console.error("Erro de rede:", error.request);
        alert("Erro de conexão. Verifique se o servidor está rodando.");
      } else {
        console.error("Erro:", error.message);
        alert("Erro ao cadastrar aluno.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute requiredRole="ADMIN">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-white">
                  Sistema Acadêmico
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Settings className="h-5 w-5" />
                </Button>

                <Button size="sm">
                  <Link href="/login" className="flex items-center gap-2">
                    SAIR
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 mb-4"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-4xl font-light text-white mb-2">
                Cadastrar aluno
              </h1>
              <p className="text-white/70 font-extralight">
                Preencha os dados abaixo para cadastrar um novo aluno no sistema
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Matrícula
                    </label>
                    <Input
                      name="matricula"
                      type="number"
                      placeholder="Número de matrícula"
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:bg-white/10 focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Ano
                    </label>
                    <Input
                      name="ano"
                      type="number"
                      placeholder="Ano de ingresso"
                      onChange={handleChange}
                      required
                      min="2000"
                      max="2030"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:bg-white/10 focus:border-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Nome Completo
                  </label>
                  <Input
                    name="nome"
                    placeholder="Nome completo do aluno"
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:bg-white/10 focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="email@exemplo.com"
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:bg-white/10 focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Semestre
                  </label>
                  <Input
                    name="semestre"
                    type="number"
                    placeholder="Semestre atual"
                    onChange={handleChange}
                    required
                    min="1"
                    max="10"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:bg-white/10 focus:border-white/40"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
                    onClick={() => router.back()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 text-white border-0"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Cadastrar Aluno
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>

        <footer className="mt-auto pt-14 pb-6">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-white">
                  © 2025 Sistema de Avaliação. Todos os direitos reservados. Victor Dias Pereira
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-primary transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-white hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-white hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
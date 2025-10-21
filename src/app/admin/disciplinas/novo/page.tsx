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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!backend) {
  console.error("NEXT_PUBLIC_BACKEND_URL não está configurada.");
  throw new Error(
    "A URL do backend não foi encontrada. Verifique o arquivo .env."
  );
}

export default function NovaDisciplinaPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    codigo: "",
    nome: "",
    descricao: "",
    cargaHoraria: "",
    semestre: "",
    tipo: "OBRIGATORIA",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post(`${backend}api/disciplinas/`, form);
      alert("Disciplina cadastrada com sucesso!");
      router.push("/admin/disciplinas");
    } catch {
      alert("Erro ao cadastrar disciplina.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
              Cadastrar disciplina
            </h1>
            <p className="text-white/70 font-extralight">
              Preencha os dados abaixo para cadastrar uma nova disciplina no sistema
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Código da Disciplina
                  </label>
                  <Input
                    name="codigo"
                    placeholder="Ex: CC001, MAT101"
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:bg-white/10 focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Carga Horária
                  </label>
                  <Input
                    name="cargaHoraria"
                    type="number"
                    placeholder="Horas totais"
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:bg-white/10 focus:border-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Nome da Disciplina
                </label>
                <Input
                  name="nome"
                  placeholder="Nome completo da disciplina"
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:bg-white/10 focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Descrição
                </label>
                <Textarea
                  name="descricao"
                  placeholder="Descrição detalhada da disciplina"
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:bg-white/10 focus:border-white/40 min-h-[100px]"
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
                      Cadastrar Disciplina
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
  );
}
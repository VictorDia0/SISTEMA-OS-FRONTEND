"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  UserCheck,
  BookOpen,
  UsersRound,
  Settings,
  Facebook,
  Linkedin,
  Instagram,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Disciplina {
  id: number;
  codigo: number;
  nome: string;
  descricao: string;
  cargaHoraria: number;
  semestre: number;
  tipo: string;
}

export default function DisciplinaListPage() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDisciplinas() {
      try {
        const response = await api.get("/api/disciplinas");
        setDisciplinas(response.data);
      } catch {
        console.error("Erro ao buscar disciplinas");
      } finally {
        setLoading(false);
      }
    }
    carregarDisciplinas();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir esta disciplina?")) return;
    try {
      await api.delete(`/api/disciplinas/${id}`);
      setDisciplinas(disciplinas.filter((a) => a.id !== id));
    } catch {
      alert("Erro ao excluir disciplina.");
    }
  };

  const statCards = [
    {
      title: "Total de Disciplinas",
      value: disciplinas.length || 0,
      icon: BookOpen,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
      description: "Disciplinas cadastradas"
    },
    {
      title: "Disciplinas Ativas",
      value: disciplinas.filter(d => d.tipo === "ATIVA").length || 0,
      icon: UserCheck,
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
      description: "Disciplinas ativas"
    }
  ];

  const quickActions = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: UsersRound,
      color: "text-blue-400",
      hoverColor: "group-hover:text-blue-200"
    },
    {
      title: "Alunos",
      url: "/admin/alunos",
      icon: UsersRound,
      color: "text-purple-400",
      hoverColor: "group-hover:text-purple-200"
    },
    {
      title: "Docentes",
      url: "/admin/docentes",
      icon: UsersRound,
      color: "text-orange-400",
      hoverColor: "group-hover:text-orange-200"
    },
    {
      title: "Turmas",
      url: "/admin/turmas",
      icon: UsersRound,
      color: "text-pink-400",
      hoverColor: "group-hover:text-pink-200"
    }
  ];

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

              <Button
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
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
            <h1 className="text-4xl font-bold text-white mb-2">
              Gerenciar Disciplinas
            </h1>
            <p className="text-white/70">
              Gerencie todas as disciplinas do sistema acadêmico
            </p>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
            <Link href="/admin/disciplinas/novo" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Disciplina
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border-none rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/15"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/70 text-sm font-medium">{card.title}</p>
                      <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${card.gradient} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-white/50 text-xs">{card.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="bg-white/10 backdrop-blur-md border border-none rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Navegação Rápida
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.url} className="block">
                  <Button className="w-full p-6 bg-white/10 hover:bg-white/20 border-none rounded-xl transition-all duration-200 hover:scale-105 flex flex-col items-center justify-center h-28 group">
                    <Icon className={`h-6 w-6 ${action.color} mb-2 group-hover:scale-110 transition-transform`} />
                    <span className={`text-white font-semibold text-center text-sm ${action.hoverColor}`}>
                      {action.title}
                    </span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6 mb-8">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              <p className="text-white mt-4">Carregando disciplinas...</p>
            </div>
          ) : disciplinas.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Nenhuma disciplina cadastrada</h3>
              <p className="text-white/70 mb-6">Comece adicionando a primeira disciplina ao sistema</p>
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                <Link href="/admin/disciplinas/novo" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Disciplina
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="p-4 text-left text-white font-semibold">Código</th>
                    <th className="p-4 text-left text-white font-semibold">Nome</th>
                    <th className="p-4 text-left text-white font-semibold">Descrição</th>
                    <th className="p-4 text-left text-white font-semibold">Carga Horária</th>
                    <th className="p-4 text-left text-white font-semibold">Semestre</th>
                    <th className="p-4 text-left text-white font-semibold">Tipo</th>
                    <th className="p-4 text-center text-white font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {disciplinas.map((disciplina) => (
                    <tr key={disciplina.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-white">{disciplina.codigo}</td>
                      <td className="p-4 text-white">{disciplina.nome}</td>
                      <td className="p-4 text-white/80">{disciplina.descricao}</td>
                      <td className="p-4 text-white">{disciplina.cargaHoraria}h</td>
                      <td className="p-4 text-white">{disciplina.semestre}º</td>
                      <td className="p-4 text-white">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          disciplina.tipo === "OBRIGATORIA" 
                            ? "bg-blue-500/20 text-blue-300" 
                            : "bg-purple-500/20 text-purple-300"
                        }`}>
                          {disciplina.tipo === "OBRIGATORIA" ? "Obrigatória" : "Optativa"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/20"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/20"
                            onClick={() => handleDelete(disciplina.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-none rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-4 lg:mb-0">
              <h2 className="text-3xl font-bold mb-2">Sistema de Avaliação Acadêmica</h2>
              <p className="text-blue-100 text-lg">
                Avalie alunos, docentes e disciplinas de forma eficiente
              </p>
            </div>
          </div>
        </Card>
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
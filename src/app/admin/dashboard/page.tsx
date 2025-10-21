"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Users,
  UserCheck,
  BookOpen,
  Calendar,
  UsersRound,
  Settings,
  Facebook,
  Linkedin,
  Instagram
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Aluno {
  id: number;
  matricula: number;
  nome: string;
  email: string;
  semestre: number;
  ano: number;
}

export default function AdminDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<any>({});
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/api/admin/dashboard");
        setStats(res.data);
      } catch {
        console.error("Erro ao carregar dados do admin");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function carregarAlunos() {
      try {
        const response = await api.get("/api/alunos");
        setAlunos(response.data);
      } catch {
        console.error("Erro ao buscar alunos");
      } finally {
        setLoading(false);
      }
    }
    carregarAlunos();
  }, []);

  const statCards = [
    {
      title: "Total de Alunos",
      value: alunos.length || 0,
      icon: Users,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
      description: "Estudantes ativos"
    },
    {
      title: "Total de Docentes",
      value: stats.docentes || 0,
      icon: UserCheck,
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
      description: "Professores cadastrados"
    },
    {
      title: "Turmas Abertas",
      value: stats.turmas || 0,
      icon: BookOpen,
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
      description: "Turmas em andamento"
    },
    {
      title: "Disciplinas",
      value: stats.disciplinas || 0,
      icon: Calendar,
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
      description: "Disciplinas ofertadas"
    }
  ];

  const quickActions = [
    {
      title: "Alunos",
      url: "/admin/alunos",
      icon: UsersRound,
      color: "text-blue-400",
      hoverColor: "group-hover:text-green-200"
    },
    {
      title: "Docentes",
      url: "/admin/docentes",
      icon: UsersRound,
      color: "text-purple-400",
      hoverColor: "group-hover:text-purple-200"
    },
    {
      title: "Disciplinas",
      url: "/admin/disciplinas",
      icon: BookOpen,
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
      <nav className="bg-white/10 backdrop-blur-md border-r-none sticky top-0 z-50">
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Painel Administrativo
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border-none rounded-2xl shadow-lg duration-300 transform hover:bg-white/15"
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

        <Card className="bg-white/10 backdrop-blur-md border-none rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.url} className="block">
                  <Button className="w-full p-10 bg-white/10 hover:bg-white/20 border-none rounded-xl transition-all duration-200 hover:scale-105 flex flex-col items-center justify-center h-40 group">
                    <Icon className={`h-8 w-8 ${action.color} mb-2 group-hover:scale-110 transition-transform`} />
                    <span className={`text-white font-semibold text-center ${action.hoverColor}`}>
                      {action.title}
                    </span>
                  </Button>
                </Link>
              );
            })}
          </div>
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
      <footer className="mt-auto pt-6 pb-6">
        <div className="container mx-auto max-w-6xl px-4 ">
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
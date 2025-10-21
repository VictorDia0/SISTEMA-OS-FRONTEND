"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface AvaliacaoResumo {
  mediaGeral: number;
  totalAvaliacoes: number;
  detalhes: {
    pergunta: string;
    media: number;
  }[];
}

export default function DashboardDocente() {
  const [avaliacao, setAvaliacao] = useState<AvaliacaoResumo | null>(null);

  useEffect(() => {
    async function carregarAvaliacao() {
      try {
        const response = await api.get("/api/avaliacoes/docente/me"); // rota autenticada
        setAvaliacao(response.data);
      } catch {
        alert("Erro ao carregar avaliações");
      }
    }
    carregarAvaliacao();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Minhas Avaliações</h1>

      {!avaliacao ? (
        <p>Carregando dados...</p>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-2">
            Média Geral: {avaliacao.mediaGeral.toFixed(1)}
          </h2>
          <p className="mb-4">Total de avaliações: {avaliacao.totalAvaliacoes}</p>

          <table className="w-full border rounded-lg">
            <thead className="bg-sky-600 text-white">
              <tr>
                <th className="p-3 text-left">Pergunta</th>
                <th className="p-3 text-center">Média</th>
              </tr>
            </thead>
            <tbody>
              {avaliacao.detalhes.map((d, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3">{d.pergunta}</td>
                  <td className="p-3 text-center">{d.media.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

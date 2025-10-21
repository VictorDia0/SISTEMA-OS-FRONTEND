/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AlunoDashboard() {
  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    async function carregarAvaliacoes() {
      const res = await api.get("/api/aluno/avaliacoes");
      setAvaliacoes(res.data);
    }
    carregarAvaliacoes();
  }, []);

  return (
    <Sidebar>
      <h1 className="text-3xl font-bold mb-6">Minhas Avaliações</h1>

      <div className="bg-white shadow rounded-xl p-6">
        <ul className="space-y-2">
          {avaliacoes.map((a: any) => (
            <li key={a.id} className="border p-3 rounded">
              <strong>{a.docente}</strong> — {a.nota}/10 ({a.comentario})
            </li>
          ))}
        </ul>
      </div>
    </Sidebar>
  );
}

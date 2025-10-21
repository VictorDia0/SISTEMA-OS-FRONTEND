/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DocenteDashboard() {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    async function carregarOfertas() {
      const res = await api.get("/api/docente/ofertas");
      setOfertas(res.data);
    }
    carregarOfertas();
  }, []);

  return (
    <Sidebar>
      <h1 className="text-3xl font-bold mb-6">Painel do Docente</h1>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">Minhas Ofertas</h2>
        <ul className="space-y-2">
          {ofertas.map((oferta: any) => (
            <li key={oferta.id} className="border p-3 rounded">
              {oferta.nome} — {oferta.turma}
            </li>
          ))}
        </ul>
      </div>
    </Sidebar>
  );
}

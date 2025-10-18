"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DashboardAluno() {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    api.get("/oferta").then((res) => setOfertas(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Minhas Ofertas</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Disciplina</th>
            <th>Docente</th>
            <th>Turno</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ofertas.map((o: any) => (
            <tr key={o.id}>
              <td>{o.disciplinaNome}</td>
              <td>{o.docenteNome}</td>
              <td>{o.turno}</td>
              <td>
                <a
                  href={`/aluno/avaliacao/${o.codigoOferta}`}
                  className="text-blue-600 underline"
                >
                  Avaliar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

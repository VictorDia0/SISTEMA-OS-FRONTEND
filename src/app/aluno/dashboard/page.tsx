"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Pergunta {
  id: number;
  texto: string;
}

interface Docente {
  id: number;
  nome: string;
}

export default function AvaliarDocentePage() {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [selectedDocente, setSelectedDocente] = useState<number | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const docentesRes = await api.get("/api/docente");
        const perguntasRes = await api.get("/api/perguntas");
        setDocentes(docentesRes.data);
        setPerguntas(perguntasRes.data);
      } catch {
        alert("Erro ao carregar dados");
      }
    }
    carregarDados();
  }, []);

  const handleRespostaChange = (perguntaId: number, valor: number) => {
    setRespostas({ ...respostas, [perguntaId]: valor });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDocente) {
      alert("Selecione um docente para avaliar.");
      return;
    }

    const payload = {
      docenteId: selectedDocente,
      respostas: Object.entries(respostas).map(([perguntaId, nota]) => ({
        perguntaId: Number(perguntaId),
        nota,
      })),
    };

    try {
      await api.post("/api/avaliacoes", payload);
      alert("Avaliação enviada com sucesso!");
      setSelectedDocente(null);
      setRespostas({});
    } catch {
      alert("Erro ao enviar avaliação.");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Avaliar Docente</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-lg font-semibold mb-2">Selecione o Docente:</label>
          <select
            value={selectedDocente ?? ""}
            onChange={(e) => setSelectedDocente(Number(e.target.value))}
            className="border rounded-lg p-2 w-full"
            required
          >
            <option value="">-- Escolha um docente --</option>
            {docentes.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nome}
              </option>
            ))}
          </select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Perguntas</CardTitle>
          </CardHeader>
          <CardContent>
            {perguntas.map((p) => (
              <div key={p.id} className="mb-4">
                <label className="block mb-1">{p.texto}</label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={respostas[p.id] || ""}
                  onChange={(e) => handleRespostaChange(p.id, Number(e.target.value))}
                  placeholder="Nota de 1 a 5"
                  required
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Button type="submit" className="bg-sky-600 hover:bg-sky-700">
          Enviar Avaliação
        </Button>
      </form>
    </>
  );
}

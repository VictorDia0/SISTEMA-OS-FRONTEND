"use client";

import { ChartOverview } from "@/components/chart";
import Sales from "@/components/sales";
import { Sidebar } from "@/components/sidebar";
import { useAuth } from "@/hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, ListCheck, Users2 } from "lucide-react";
import React from "react";

export default function Dashboard() {
  useAuth();
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <section className="grid sm:grid-cols-4 grid-cols-2 gap-4 ">
          <Card className="shadow-md shadow-primary border-primary">
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none font-light tracking-tighter">
                  Vendas
                </CardTitle>
                <DollarSign className="w-4 h-4 ml-auto text-gray-800" />
              </div>
              <CardDescription>Total de vendas em 90 dias</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-base sm:text-lg font-bold">R$ 40.000</p>
            </CardContent>
          </Card>
          <Card className="shadow-md shadow-primary border-primary">
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none font-light tracking-tighter">
                  Clientes
                </CardTitle>
                <Users2 className="w-4 h-4 ml-auto text-gray-800" />
              </div>
              <CardDescription>Total de clientes</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-base sm:text-lg font-bold">4</p>
            </CardContent>
          </Card>

          <Card className="shadow-md shadow-primary border-primary">
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none font-light tracking-tighter">
                  Ordens
                </CardTitle>
                <ListCheck className="w-4 h-4 ml-auto text-gray-800" />
              </div>
              <CardDescription>Total de Ordens de Serviços</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-base sm:text-lg font-bold">100</p>
            </CardContent>
          </Card>

          <Card className="shadow-md shadow-primary border-primary">
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none font-light tracking-tighter">
                  Ordens
                </CardTitle>
                <ListCheck className="w-4 h-4 ml-auto text-gray-800" />
              </div>
              <CardDescription>Total de Ordens de Serviços</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-base sm:text-lg font-bold">100</p>
            </CardContent>
          </Card>
        </section>
        <section className="mt-4 flex flex-col md:flex-row gap-4">
          <ChartOverview />
          <Sales />
        </section>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Instagram, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen  bg-gradient-to-l from-slate-900 via-blue-900 to-slate-900">
            <main className="flex-1">
                <section className="pt-32 pb-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-light leading-tight text-white">
                                    Sistema de Avaliação
                                </h1>
                                <p className="mt-6 text-xl text-white">
                                    Simplifique a gestão de avaliações com nosso sistema intuitivo.
                                </p>
                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <Button
                                        size="lg"
                                        className="text-lg bg-gradient-to-l from-blue-700 via-blue-900 to-blue-900 hover:from-blue-900 hover:via-blue-900 hover:to-blue-700 border-none shadow-lg flex items-center justify-center"
                                    >
                                        <Link href="/login">ENTRAR</Link>
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3"
                                    alt="Dashboard"
                                    className="rounded-lg shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="mt-auto pt-10 pb-6">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="pt-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-white">
                                © 2025 Sistema de Avaliação. Todos os direitos reservados.
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

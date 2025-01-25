"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  ClipboardList,
  Clock,
  TrendingUp,
  Headphones,
  Star,
  Facebook,
  Linkedin,
  Instagram,
  ArrowRight,
  Blend,
  CircleDollarSign,
} from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

import Link from "next/link";

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-gradient-to-l from-white via-sky-400 to-sky-700 backdrop-blur supports-[backdrop-filter]:bg-primary/80 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/mapos-logo.png"
              alt="Mapos Logo"
              width={60}
              height={60}
            />
          </div>
          <nav className="hidden md:flex space-x-6 ">
            <a
              href="#features"
              className="text-primary-foreground hover:text-slate-500 transition-colors"
            >
              Funcionalidades
            </a>
            <a
              href="#testimonials"
              className="text-primary-foreground hover:text-slate-500 transition-colors"
            >
              Depoimentos
            </a>
            <a
              href="#pricing"
              className="text-primary-foreground hover:text-slate-500 transition-colors"
            >
              Planos
            </a>
            <a
              href="#question"
              className="text-primary-foreground hover:text-slate-500 transition-colors"
            >
              Perguntas Frequentes
            </a>
            <a
              href="#about"
              className="text-primary-foreground hover:text-slate-500 transition-colors"
            >
              Sobre
            </a>
          </nav>
          <Button className="bg-primary-foreground text-sky-500 uppercase border border-sky-500 hover:text-primary-foreground hover:border-white hover:bg-gradient-to-l from-sky-300 via-sky-500 to-sky-700">
            <Link href="auth/login">entrar</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Simplifique a Gestão de Ordens de Serviço
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                Automatize processos, aumente a produtividade e melhore a
                experiência do cliente com nossa solução completa.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg bg-gradient-to-l from-sky-300 via-sky-500 to-sky-700"
                >
                  Comece Agora
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

      {/* Benefits Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Por que Escolher Nossa Plataforma?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Blend className="h-10 w-10" />,
                title: "Transparência e Confiança",
                description:
                  "Nossa plataforma permite que os trabalhadores criem e compartilhem ordens de serviço detalhadas com os clientes, garantindo total transparência sobre o trabalho realizado.",
              },
              {
                icon: <TrendingUp className="h-10 w-10" />,
                title: "Eficiência e Agilidade",
                description:
                  "A criação e o envio de ordens de serviço são rápidos e intuitivos, permitindo que os trabalhadores se concentrem no que realmente importa: entregar um serviço de qualidade.",
              },
              {
                icon: <Clock className="h-10 w-10" />,
                title: "Acompanhamento em Tempo Real",
                description:
                  "Os clientes podem acompanhar o status de suas ordens de serviço em tempo real, desde a criação até a conclusão.",
              },
              {
                icon: <Headphones className="h-10 w-10" />,
                title: "Integração e Acessibilidade",
                description:
                  "Nossa plataforma é acessível de qualquer dispositivo conectado à internet, garantindo que trabalhadores e clientes possam gerenciar e visualizar ordens de serviço onde quer que estejam.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="bg-card">
                <CardContent className="pt-6">
                  <div className="rounded-full w-16 h-16 bg-primary/10 flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Funcionalidades que Fazem a Diferença
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Criação Simples de Ordens de Serviço",
                description:
                  "Com um processo de criação simplificado e intuitivo, os trabalhadores podem gerar ordens de serviço detalhadas em poucos minutos.",
                image:
                  "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3",
              },
              {
                title: "Histórico de Serviços",
                description:
                  "Nossa plataforma mantém um registro completo de todas as ordens de serviço criadas, permitindo fácil acesso a históricos anteriores",
                image:
                  "https://images.unsplash.com/photo-1506784693919-ef06d93c28d2?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3",
              },
              {
                title: "Notificações Automáticas",
                description:
                  "Os clientes recebem notificações automáticas sobre atualizações de status das suas ordens de serviço, garantindo que estejam sempre informados",
                image:
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3",
              },
              {
                title: "Feedback e Avaliação",
                description:
                  "Após a conclusão do serviço, os clientes podem deixar feedbacks e avaliações diretamente na plataforma",
                image:
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 items-center"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                </div>
                <div className="flex-1">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            O que Nossos Clientes Dizem
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Silva",
                company: "Tech Solutions",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3",
                testimonial:
                  "Desde que implementamos o ServiceFlow, nossa produtividade aumentou em 40%.",
              },
              {
                name: "João Santos",
                company: "Inovare Inc",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3",
                testimonial:
                  "O suporte é excepcional e a plataforma é muito intuitiva. Recomendo fortemente!",
              },
              {
                name: "Ana Costa",
                company: "Digital Pro",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3",
                testimonial:
                  "A automatização dos processos nos economiza horas de trabalho manual todos os dias.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    {testimonial.testimonial}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="pricing" className="py-20 bg-muted/50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Planos
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CircleDollarSign className="h-10 w-10 text-sky-500" />,
                title: "Grátis",
                description: "Ideal para iniciantes e testes iniciais.",
                price: "R$ 0,00/mês",
                features: [
                  "1 usuário",
                  "Suporte básico via e-mail",
                  "Acesso limitado a recursos",
                ],
                borderColor: "border-sky-500",
              },
              {
                icon: <CircleDollarSign className="h-10 w-10 text-green-500" />,
                title: "Básico",
                description: "Perfeito para pequenas empresas.",
                price: "R$ 19,90/mês",
                features: [
                  "Até 10 usuários",
                  "Suporte prioritário via e-mail",
                  "Acesso a relatórios básicos",
                  "100 GB de armazenamento",
                ],
                borderColor: "border-green-500",
              },
              {
                icon: (
                  <CircleDollarSign className="h-10 w-10 text-yellow-500" />
                ),
                title: "Pro",
                description: "A melhor opção para empresas em crescimento.",
                price: "R$ 39,90/mês",
                features: [
                  "Usuários ilimitados",
                  "Suporte 24/7 via chat e e-mail",
                  "Acesso a relatórios avançados",
                  "Armazenamento ilimitado",
                  "Integrações com APIs externas",
                  "Personalização avançada",
                ],
                borderColor: "border-yellow-500",
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`bg-card shadow-lg border-2 ${plan.borderColor}`}
              >
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 flex flex-col items-center">
                    {plan.icon}
                    {plan.title}
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {plan.description}
                  </p>
                  <p className="text-2xl font-bold text-center mb-6">
                    {plan.price}
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-green-500">✔</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.borderColor === "border-yellow-500"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : plan.borderColor === "border-green-500"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-sky-500 hover:bg-sky-600"
                    }`}
                  >
                    {plan.title === "Pro" ? "Assinar Pro" : "Escolher Plano"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="question" className="py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "Como criar uma ordem de serviço?",
                answer:
                  "Basta fazer login na plataforma, clicar em 'Nova Ordem de Serviço' e preencher os campos necessários. Depois, é só enviar para o cliente.",
              },
              {
                question:
                  "Os clientes recebem notificações sobre o status da ordem de serviço?",
                answer:
                  "Sim, os clientes são automaticamente notificados sobre cada atualização de status da ordem de serviço, desde a criação até a conclusão.",
              },
              {
                question: "Como acessar o histórico de ordens de serviço?",
                answer:
                  "Vá até a seção 'Histórico' no painel principal e lá você encontrará todas as ordens de serviço criadas, organizadas por data e cliente.",
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 pt-20 pb-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <ClipboardList className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">ServiceFlow</span>
              </div>
              <p className="text-muted-foreground">
                Transformando a gestão de serviços com tecnologia e inovação.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Úteis</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacidade
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Cookies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Licenças
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-muted-foreground mb-4">
                Receba novidades e atualizações em seu email.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Seu email" type="email" />
                <Button>Assinar</Button>
              </div>
            </div>
          </div>
          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 ServiceFlow. Todos os direitos reservados.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
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

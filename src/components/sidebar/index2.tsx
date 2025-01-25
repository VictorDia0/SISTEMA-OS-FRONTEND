import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import {
  Package,
  AlignJustify,
  Home,
  UsersRound,
  AlarmClock,
  ListCheck,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Sidebar() {
  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-primary sm:flex flex-col">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>

            <Avatar className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary-foreground text-primary rounded-full">
                <AvatarImage src="https://github.com/shadcn.png" alt="Mapos Logo" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary hover:text-muted-foreground"
                  prefetch={false}
                >
                  <Home className="w-5 h-5 text-primary-foreground" />
                  <span className="sr-only">Inicio</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-4">
                Inicio
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary hover:text-muted-foreground"
                  prefetch={false}
                >
                  <UsersRound className="w-5 h-5 text-primary-foreground" />
                  <span className="sr-only">Clientes</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-4">
                Clientes
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary hover:text-muted-foreground"
                  prefetch={false}
                >
                  <Package className="w-5 h-5 text-primary-foreground" />
                  <span className="sr-only">Produtos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-4">
                Produtos
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary hover:text-muted-foreground"
                  prefetch={false}
                >
                  <AlarmClock className="w-5 h-5 text-primary-foreground" />
                  <span className="sr-only">Serviços</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-4">
                Serviços
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary hover:text-muted-foreground"
                  prefetch={false}
                >
                  <ListCheck className="w-5 h-5 text-primary-foreground" />
                  <span className="sr-only">Ordem de Serviços</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-4">
                Ordem de Serviços
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary hover:text-muted-foreground"
                  prefetch={false}
                >
                  <Settings className="w-5 h-5 text-primary-foreground" />
                  <span className="sr-only">Configurações</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-4">
                Configurações
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary hover:text-muted-foreground"
                  prefetch={false}
                >
                  <LogOut className="w-5 h-5 text-primary-foreground" />
                  <span className="sr-only">sair</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-4">
                sair
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <div className="sm:hidden flex flex-col sm:gap-4 sm-py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <AlignJustify className="w-6 h-6" />
                <span className="sr-only">Open / fechar menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="sm:max-w-x">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex h-10 w-10 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2"
                  prefetch={false}
                >
                  <AlignJustify className="w-5 h-5 transition-all" />
                  <span className="sr-only">Inicio</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-primary"
                  prefetch={false}
                >
                  <Home className="w-5 h-5 transition-all" />
                  Inicio
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-primary"
                  prefetch={false}
                >
                  <UsersRound className="w-5 h-5 transition-all" />
                  Clientes
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-primary"
                  prefetch={false}
                >
                  <Package className="w-5 h-5 transition-all" />
                  Produtos
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-primary"
                  prefetch={false}
                >
                  <AlarmClock className="w-5 h-5 transition-all" />
                  Serviços
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-primary"
                  prefetch={false}
                >
                  <ListCheck className="w-5 h-5 transition-all" />
                  Ordem de Serviços
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-primary"
                  prefetch={false}
                >
                  <Settings className="w-5 h-5 transition-all" />
                  Configurações
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-primary"
                  prefetch={false}
                >
                  <LogOut className="w-5 h-5 transition-all" />
                  sair
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}

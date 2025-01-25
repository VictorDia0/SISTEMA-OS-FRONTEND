import {
  Home,
  Package,
  Settings,
  UsersRound,
  AlarmClock,
  ListCheck,
  User2,
  ChevronUp,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

// Menu items.
const items = [
  { title: "Inicio", url: "#", icon: Home },
  { title: "Clientes", url: "#", icon: UsersRound },
  { title: "Produtos", url: "#", icon: Package },
  { title: "Serviços", url: "#", icon: AlarmClock },
  { title: "Ordem de Seriços", url: "#", icon: ListCheck },
  { title: "Configurações", url: "#", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="fixed inset-y-0 left-0 z-10 hidden border-r bg-primary sm:flex flex-col">
      <SidebarContent className="bg-primary">
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-col items-center gap-4 px-2 py-5">
            <Avatar className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary-foreground text-primary rounded-full">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Mapos Logo"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="flex mt-10 ml-0 rounded-2xl">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-primary-foreground hover:text-primary"
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-primary">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="text-primary-foreground">
                  <User2 /> Usuario{" "}
                  {/* Mudar aqui para colocar o nome do usuario  */}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="flex items-center justify-center rounded-lg gap-2 hover:text-slate-500 group"
                    prefetch={false}
                  >
                    <User2 className="w-5 h-5 text-primary group-hover:text-slate-500" />
                    <span className="text-primary group-hover:text-slate-500">
                      Perfil
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="flex items-center justify-center rounded-lg gap-2 hover:text-slate-500 group"
                    prefetch={false}
                  >
                    <LogOut className="w-5 h-5 text-primary group-hover:text-slate-500" />
                    <span className="text-primary group-hover:text-slate-500">
                      Sair
                    </span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

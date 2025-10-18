import { useEffect, useState } from "react";
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
import api from "@/services/axiosConfig";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!backendUrl) {
  console.error("NEXT_PUBLIC_BACKEND_URL não está configurada.");
  throw new Error(
    "A URL do backend não foi encontrada. Verifique o arquivo .env."
  );
}

// Função para obter o token dos cookies
const getTokenFromCookies = () => {
  const name = "token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for(let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};

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
  const [userName, setUserName] = useState("Carregando...");

  // Função para buscar os dados do usuário
  const fetchUserData = async () => {
    try {
      const token = getTokenFromCookies(); // Obtém o token dos cookies
      const userId = localStorage.getItem("userId"); // Obtém o ID do usuário do localStorage
      if (!token || !userId) {
        throw new Error("Token ou ID do usuário não encontrado");
      }

      const response = await api.get(`${backendUrl}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data; // Extraia os dados do usuário
      const fullName = `${userData.name} ${userData.surname}`; // Concatena nome e sobrenome
      setUserName(fullName); // Atualiza o estado com o nome completo
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      setUserName("Erro ao carregar");
    }
  };

  // Busca os dados do usuário quando o componente é montado
  useEffect(() => {
    fetchUserData();
  }, []);

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
                  <User2 /> {userName} {/* Exibe o nome do usuário */}
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

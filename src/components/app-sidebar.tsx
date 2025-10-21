import { useEffect, useState } from "react";
import {
  Home,
  BookUser,
  UsersRound,
  User2,
  ChevronUp,
  LogOut,
  SwatchBook,
  Cog,
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
import api from "@/lib/api";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!backendUrl) {
  console.error("NEXT_PUBLIC_BACKEND_URL não está configurada.");
  throw new Error(
    "A URL do backend não foi encontrada. Verifique o arquivo .env."
  );
}

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

const items = [
  { title: "Inicio", url: "/admin/dashboard", icon: Home },
  { title: "Alunos", url: "/admin/alunos", icon: BookUser  },
  { title: "Docentes", url: "/admin/docentes", icon: UsersRound },
  { title: "Disciplinas", url: "/admin/disciplinas", icon: SwatchBook   },
  { title: "Configurações", url: "/admin/configuracoes", icon: Cog },
];

export function AppSidebar() {
  const [userName, setUserName] = useState("Carregando...");

  const fetchUserData = async () => {
    try {
      const token = getTokenFromCookies();
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        throw new Error("Token ou ID do usuário não encontrado");
      }

      const response = await api.get(`${backendUrl}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      const fullName = `${userData.name} ${userData.surname}`;
      setUserName(fullName);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      setUserName("Erro ao carregar");
    }
  };

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
                  <User2 /> {userName}
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

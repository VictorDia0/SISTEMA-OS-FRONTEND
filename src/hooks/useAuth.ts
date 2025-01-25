import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Certifique-se de usar "next/navigation" no App Router

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // Verifica se estamos no ambiente cliente
    if (typeof window === "undefined") return;

    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };

    const token = getCookie("token");

    if (!token) {
      router.push("/auth/login"); // Redireciona para a página de login se não houver token
    }
  }, [router]);
};

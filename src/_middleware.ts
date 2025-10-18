import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_ROUTES = ["/", "/auth/login"];
const LOGIN_ROUTE = "/auth/login";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;

  const isPublic = PUBLIC_ROUTES.some((route) => path.startsWith(route));

  // Se não há token e a rota é privada → redireciona pro login
  if (!token && !isPublic) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = LOGIN_ROUTE;
    return NextResponse.redirect(loginUrl);
  }

  // Se há token e o usuário tenta acessar /login → redireciona para dashboard
  if (token && path.startsWith(LOGIN_ROUTE)) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwt.decode(token);
      const role = decoded?.role ?? "ALUNO";

      const redirectUrl = req.nextUrl.clone();
      if (role === "ADMIN") redirectUrl.pathname = "/admin/dashboard";
      else if (role === "DOCENTE") redirectUrl.pathname = "/docente/dashboard";
      else redirectUrl.pathname = "/aluno/dashboard";

      return NextResponse.redirect(redirectUrl);
    } catch {
      // token inválido, segue para login
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico).*)", // intercepta todas, exceto assets
  ],
};

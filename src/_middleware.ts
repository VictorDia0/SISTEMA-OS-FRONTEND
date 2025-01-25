import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // Obtém o token do cookie

  if (!token) {
    // Redireciona para login se o token não existir
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Continua para a rota solicitada
  return NextResponse.next();
}

// Aplica apenas às rotas da dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};

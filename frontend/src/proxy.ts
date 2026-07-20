import { NextResponse, type NextRequest } from "next/server";

const sessionCookieName = "dinkes_pbj_session";

const protectedPrefixes = [
  "/dashboard",
  "/data-barang",
  "/paket",
  "/pengadaan",
  "/kontrak",
  "/progres",
  "/realisasi",
  "/serah-terima",
  "/penyedia",
  "/warning",
  "/laporan",
  "/master",
  "/admin",
  "/profile",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get(sessionCookieName)?.value);

  if (!hasSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/data-barang/:path*",
    "/paket/:path*",
    "/pengadaan/:path*",
    "/kontrak/:path*",
    "/progres/:path*",
    "/realisasi/:path*",
    "/serah-terima/:path*",
    "/penyedia/:path*",
    "/warning/:path*",
    "/laporan/:path*",
    "/master/:path*",
    "/admin/:path*",
    "/profile/:path*",
  ],
};

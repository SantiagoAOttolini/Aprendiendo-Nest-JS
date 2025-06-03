import "./globals.css";
import type { ReactNode } from "react";
import { AuthProvider } from "@/features/auth/context/AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

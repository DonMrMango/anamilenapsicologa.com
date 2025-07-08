export const metadata = {
  title: 'Ana Milena Psicóloga - Panel Administrativo',
  description: 'Panel de administración para gestionar contenido del sitio web',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
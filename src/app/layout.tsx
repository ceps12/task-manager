import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Manager — Kanban Board",
  description: "Full-stack task management with drag-and-drop boards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ background: '#0f172a', color: '#f8fafc' }}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          * { box-sizing: border-box; padding: 0; margin: 0; }
          html, body { max-width: 100vw; overflow-x: hidden; background: #0f172a; color: #f8fafc; font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; -webkit-font-smoothing: antialiased; }
          a { color: #6366f1; text-decoration: none; }
          a:hover { color: #818cf8; }
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: #1e293b; }
          ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: #475569; }
          button, input { font-family: inherit; }
        `}} />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
      </body>
    </html>
  );
}

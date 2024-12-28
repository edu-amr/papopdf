import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import Script from "next/script";

export const metadata: Metadata = {
  title: "PapoPDF | Converse com Documentos",
  description: `Transforme seus documentos em conversas inteligentes. 
  PapoPDF é uma plataforma inovadora que permite interação com PDFs de 
  maneira simples e eficiente, facilitando o acesso e a análise de informações.`,
  icons: {
    icon: "/icons/favicon.png",
    apple: "/icons/apple-touch-icon.png",
  },
  keywords: [
    "conversar com documentos",
    "inteligência artificial para PDFs",
    "análise de documentos",
    "documentos inteligentes",
    "chat com arquivos",
    "PDF interativo",
  ],
  openGraph: {
    title: "PapoPDF | Converse com Documentos",
    description: "Interaja com seus documentos de forma revolucionária com o PapoPDF.",
    url: "https://www.papopdf.com",
    siteName: "PapoPDF",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "PapoPDF - Converse com Documentos",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PapoPDF | Converse com Documentos",
    description: "Interaja com seus documentos de forma revolucionária com o PapoPDF.",
    images: ["/images/twitter-card.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <SessionProvider>{children}</SessionProvider>
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src="https://papopdf-ackee.9ehlil.easypanel.host/tracker.js"
              data-ackee-server="https://papopdf-ackee.9ehlil.easypanel.host"
              data-ackee-domain-id="2de1ad98-0b0d-4f02-98a5-ae4f254172c1"
              strategy="afterInteractive"
            />
            <Script id="crisp-script" strategy="afterInteractive">
              {`window.$crisp = [];
              window.CRISP_WEBSITE_ID = "32d26f1c-b7a9-4e25-bb56-9506d73ea2e5";
              (function() {
                var d = document;
                var s = d.createElement("script");
                s.src = "https://client.crisp.chat/l.js";
                s.async = 1;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

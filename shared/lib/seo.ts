import type { Metadata } from "next";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_APP_URL || "https://vegvision.ru",
);

export const siteName = "VegVision";

export const siteDescription =
  "VegVision помогает контролировать состояние растений в теплицах с помощью компьютерного зрения, аналитики и удобного дашборда.";

export const defaultOpenGraphImage = "/tomato-leaf.jpg";

export const publicPageMetadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: siteName,
  title: {
    template: `%s | ${siteName}`,
    default: `${siteName} - мониторинг состояния растений`,
  },
  description: siteDescription,
  keywords: [
    "VegVision",
    "мониторинг растений",
    "компьютерное зрение",
    "теплица",
    "агротехнологии",
    "диагностика растений",
    "здоровье растений",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName,
    title: `${siteName} - мониторинг состояния растений`,
    description: siteDescription,
    images: [
      {
        url: defaultOpenGraphImage,
        width: 1200,
        height: 630,
        alt: "VegVision - мониторинг состояния растений",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - мониторинг состояния растений`,
    description: siteDescription,
    images: [defaultOpenGraphImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const privatePageMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

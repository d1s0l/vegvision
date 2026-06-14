export const revalidate = 0;
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default function UserSegmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

export const revalidate = 60;
export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  return [{ username: "alexey" }];
}

export default function UserSegmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

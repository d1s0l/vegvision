import { Analiz } from "@/widgets/account/analysis";

export const revalidate = 60;

interface UserAnalysisPageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserAnalysisPage({
  params,
}: UserAnalysisPageProps) {
  const { username } = await params;

  return <Analiz dashboardHref={`/u/${username}`} />;
}

import { DashboardPageContent } from "@/widgets/dashboard/dashboard-page/DashboardPageContent";

interface UserPageProps {
    params: Promise<{
        username: string
    }>
}

export default async function User({ params }: UserPageProps){
    const { username } = await params

    return(
        <DashboardPageContent analyticsHref={`/u/${username}/analytics`} />
    )
}

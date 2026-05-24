import { DashboardPageContent } from "@/widgets/dashboard/dashboard-page/DashboardPageContent";

export const revalidate = 60;

interface UserPageProps {
    params: Promise<{
        username: string
    }>
}

export default async function User({ params }: UserPageProps){
    const { username } = await params

    return(
        <DashboardPageContent
            analyticsHref={`/u/${username}/analytics`}
            homeHref={`/u/${username}`}
        />
    )
}

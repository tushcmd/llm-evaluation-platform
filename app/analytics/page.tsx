import { Metadata } from "next"
import AnalyticsDashboard from "@/components/AnalyticsDashboard"
import { getAnalytics } from "@/lib/db"

export const metadata: Metadata = {
    title: "Analytics Dashboard",
    description: "View performance metrics for different LLMs",
}

export default async function AnalyticsPage() {
    const analytics = await getAnalytics()

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
            <AnalyticsDashboard analytics={analytics} />
        </div>
    )
}
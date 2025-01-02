import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getLatestResponses } from "@/lib/db"

export default async function ResponseComparison() {
    const responses = await getLatestResponses()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responses.map((response) => (
                <Card key={response.id}>
                    <CardHeader>
                        <CardTitle>{response.model}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">{response.content}</p>
                        <div className="text-sm text-gray-500">
                            <p>Accuracy: {response.accuracy.toFixed(2)}</p>
                            <p>Relevancy: {response.relevancy.toFixed(2)}</p>
                            <p>Response Time: {response.responseTime}ms</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}


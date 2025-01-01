"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PromptForm() {
    const [prompt, setPrompt] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!prompt.trim()) {
            setError("Please enter a prompt")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            })

            if (!response.ok) {
                throw new Error("Failed to submit prompt")
            }

            setPrompt("")
            router.refresh()
        } catch (error) {
            console.error("Error submitting prompt:", error)
            setError("An error occurred while submitting the prompt. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="mb-4"
                rows={4}
            />
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Prompt"}
            </Button>
            {error && (
                <Alert variant="destructive" className="mt-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </form>
    )
}


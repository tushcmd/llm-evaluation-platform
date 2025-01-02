import PromptForm from "@/components/PromptForm";
import ResponseComparison from "@/components/ResponseComparison";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">LLM Comparison App</h1>
      <PromptForm />
      <Suspense fallback={<div>Loading responses...</div>}>
        <ResponseComparison />
      </Suspense>
    </div>
  );
}

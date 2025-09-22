"use client";

import { AppHeader } from "@/components/civitas/header";
import { IssueForm } from "@/components/civitas/issue-form";
import type { Issue } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function ReportIssuePage() {
    const router = useRouter();

    const handleIssueSubmitted = (issue: Issue) => {
        // In a real app, you might use a global state manager (like Context or Zustand)
        // to share the new issue with the dashboard page.
        // For now, we'll just redirect back to the dashboard.
        // The confirmation message will be handled on the dashboard page.
        router.push('/');
    };

    return (
        <>
            <AppHeader />
            <main className="container mx-auto px-4 py-8 flex justify-center">
                <div className="w-full max-w-2xl">
                    <IssueForm onIssueSubmitted={handleIssueSubmitted} />
                </div>
            </main>
        </>
    );
}

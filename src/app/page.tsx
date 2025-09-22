"use client";

import { useState } from "react";
import { AppHeader } from "@/components/civitas/header";
import { Dashboard } from "@/components/civitas/dashboard";
import type { Issue } from "@/lib/types";

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  // This would typically come from a parent component or context if issues are shared across pages.
  // For now, we are keeping it simple.
  const handleNewIssue = (issue: Issue) => {
    setIssues(prev => [issue, ...prev]);
    setConfirmation('Issue successfully reported!');
    setTimeout(() => setConfirmation(null), 5000);
  }

  return (
    <>
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <Dashboard issues={issues} confirmationMessage={confirmation} />
      </main>
    </>
  );
}

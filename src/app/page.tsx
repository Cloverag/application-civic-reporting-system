"use client";

import { useState } from "react";
import { AppHeader } from "@/components/civitas/header";
import { IssueForm } from "@/components/civitas/issue-form";
import { Dashboard } from "@/components/civitas/dashboard";
import type { Issue } from "@/lib/types";
import { useLanguage } from "@/contexts/language-provider";

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const { t } = useLanguage();
  
  const handleIssueSubmitted = (issue: Issue) => {
    setIssues(prev => [issue, ...prev]);
    setConfirmation(t('form.confirmation.message'));
    setTimeout(() => {
      setConfirmation(null);
    }, 5000);
  };

  return (
    <>
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="lg:col-span-1">
            <Dashboard issues={issues} confirmationMessage={confirmation} />
          </div>
          <div className="lg:col-span-1">
            <IssueForm onIssueSubmitted={handleIssueSubmitted} />
          </div>
        </div>
      </main>
    </>
  );
}

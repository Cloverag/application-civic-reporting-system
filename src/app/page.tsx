"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { AppHeader } from "@/components/civitas/header";
import { Dashboard } from "@/components/civitas/dashboard";
import type { Issue } from "@/lib/types";

function HomePageContent() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setConfirmation('Issue successfully reported!');
      const timer = setTimeout(() => {
        setConfirmation(null);
        // Clean up the URL
        window.history.replaceState({}, '', '/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // This is a placeholder for handling issue submission.
  // In a real app, this would be passed down to the form,
  // but since the form is on a different page, we're using query params for now.
  const handleNewIssue = (issue: Issue) => {
    setIssues(prev => [issue, ...prev]);
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


export default function Home() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </React.Suspense>
  );
}

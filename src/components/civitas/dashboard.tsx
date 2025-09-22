"use client";

import { IssueCard } from "./issue-card";
import { useLanguage } from "@/contexts/language-provider";
import type { Issue } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

export function Dashboard({ issues, confirmationMessage }: { issues: Issue[], confirmationMessage: string | null }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between border-b pb-4">
        <h2 className="text-2xl font-bold tracking-tight font-headline">{t('dashboard.title')}</h2>
      </div>

      {confirmationMessage && (
        <div className="animate-in fade-in-0 slide-in-from-top-5 duration-500">
          <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                  {confirmationMessage}
              </AlertDescription>
          </Alert>
        </div>
      )}

      {issues.length === 0 && !confirmationMessage ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-lg bg-card/50">
          <p className="text-muted-foreground">{t('dashboard.empty')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {issues.map((issue) => (
             <div key={issue.id} className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500">
                <IssueCard issue={issue} />
             </div>
          ))}
        </div>
      )}
    </div>
  );
}

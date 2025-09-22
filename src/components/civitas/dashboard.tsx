"use client";

import Image from "next/image";
import { IssueCard } from "./issue-card";
import { useLanguage } from "@/contexts/language-provider";
import type { Issue } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Map as MapIcon } from "lucide-react";

export function Dashboard({ issues, confirmationMessage }: { issues: Issue[], confirmationMessage: string | null }) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      <div className="lg:col-span-1 space-y-6">
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
          <div className="space-y-4">
            {issues.map((issue) => (
               <div key={issue.id} className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500">
                  <IssueCard issue={issue} />
               </div>
            ))}
          </div>
        )}
      </div>
      <div className="lg:col-span-2">
         <Card className="h-full min-h-[400px] lg:min-h-0">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapIcon className="w-5 h-5"/>
                    Map View
                </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
                <div className="relative h-full w-full min-h-[60vh] rounded-lg overflow-hidden border">
                    <Image 
                        src="https://picsum.photos/seed/map/1200/800" 
                        alt="Map of the city with issue locations" 
                        fill
                        style={{objectFit: 'cover'}}
                        data-ai-hint="city map"
                    />
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <p className="text-primary/80 font-semibold p-4 bg-background/80 rounded-lg">Map area placeholder</p>
                    </div>
                </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

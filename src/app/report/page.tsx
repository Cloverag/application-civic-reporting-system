"use client";

import Image from "next/image";
import { AppHeader } from "@/components/civitas/header";
import { IssueForm } from "@/components/civitas/issue-form";
import type { Issue } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map as MapIcon } from "lucide-react";

export default function ReportIssuePage() {
    const router = useRouter();

    const handleIssueSubmitted = (issue: Issue) => {
        // In a real app, you might use a global state manager (like Context or Zustand)
        // to share the new issue with the dashboard page.
        // For now, we'll just redirect back to the dashboard with a query param.
        router.push('/?success=true');
    };

    return (
        <>
            <AppHeader />
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                    <div className="w-full">
                        <IssueForm onIssueSubmitted={handleIssueSubmitted} />
                    </div>
                    <div className="w-full">
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
            </main>
        </>
    );
}

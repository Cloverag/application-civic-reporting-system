import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getCategoryIcon } from "./icons";
import type { Issue } from "@/lib/types";
import { categoryDisplayNames } from "@/lib/types";
import { useLanguage } from "@/contexts/language-provider";
import { format } from 'date-fns';

export function IssueCard({ issue }: { issue: Issue }) {
  const { t } = useLanguage();
  const UserCategoryIcon = getCategoryIcon(issue.category);
  const AiCategoryIcon = getCategoryIcon(issue.aiCategory);

  return (
    <Card className="bg-gradient-to-br from-card to-card/90 dark:from-card dark:to-card/80 shadow-lg border-primary/10 hover:shadow-primary/10 transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
           <div className="p-3 rounded-lg bg-primary/10">
             <UserCategoryIcon className="w-6 h-6 text-primary" />
           </div>
          <span>{categoryDisplayNames[issue.category]}</span>
        </CardTitle>
        <CardDescription>{issue.location}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{issue.description}</p>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {issue.aiCategory && (
              <div className="space-y-1">
                <p className="font-medium">{t('issue.card.ai.category')}</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                   <AiCategoryIcon className="w-4 h-4" />
                  <span className="capitalize">{issue.aiCategory.replace(/_/g, " ")}</span>
                  {issue.aiConfidence && <Badge variant="secondary">{Math.round(issue.aiConfidence * 100)}%</Badge>}
                </div>
              </div>
            )}
            <div className="space-y-1">
                <p className="font-medium">{t('issue.card.status')}</p>
                <Badge variant={issue.status === 'resolved' ? 'default' : 'outline'} className="capitalize">
                  {t('issue.card.status.submitted')}
                </Badge>
            </div>
        </div>
        <p className="text-xs text-muted-foreground pt-2">
            {t('issue.card.reported.on')} {format(new Date(issue.createdAt), "PPP")}
        </p>
      </CardContent>
    </Card>
  );
}

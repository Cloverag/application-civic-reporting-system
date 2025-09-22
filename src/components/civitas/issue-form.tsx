"use client";

import React, { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useLanguage } from "@/contexts/language-provider";
import { submitIssue, type FormState } from "@/lib/actions";
import { issueCategories, categoryDisplayNames, type Issue } from "@/lib/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const initialState: FormState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useLanguage();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? t('form.submitting.button') : t('form.submit.button')}
    </Button>
  );
}

export function IssueForm({ onIssueSubmitted }: { onIssueSubmitted: (issue: Issue) => void }) {
  const [state, formAction] = useFormState(submitIssue, initialState);
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const selectTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (state.success && state.issue) {
      onIssueSubmitted(state.issue);
      formRef.current?.reset();
      // Manually reset the Select component's display value
      if(selectTriggerRef.current) {
        const valueNode = selectTriggerRef.current.querySelector('span');
        if(valueNode) valueNode.textContent = t('form.category.label');
      }
    }
  }, [state, onIssueSubmitted, t]);

  return (
    <Card className="w-full bg-gradient-to-br from-card to-card/90 dark:from-card dark:to-card/80 shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-2xl border-b pb-4">{t('form.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">{t('form.description.label')}</Label>
            <Textarea
              id="description"
              name="description"
              placeholder={t('form.description.placeholder')}
              required
              rows={5}
            />
            {state.errors?.description && (
              <p className="text-sm text-destructive">{state.errors.description[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">{t('form.category.label')}</Label>
            <Select name="category" required>
              <SelectTrigger id="category" ref={selectTriggerRef}>
                <SelectValue placeholder={t('form.category.label')} />
              </SelectTrigger>
              <SelectContent>
                {issueCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {categoryDisplayNames[cat]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.category && (
              <p className="text-sm text-destructive">{state.errors.category[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">{t('form.location.label')}</Label>
            <Input
              id="location"
              name="location"
              placeholder={t('form.location.placeholder')}
              required
            />
            {state.errors?.location && (
              <p className="text-sm text-destructive">{state.errors.location[0]}</p>
            )}
          </div>
          
          <SubmitButton />

          {state.message && !state.success && (
             <Alert variant="destructive">
               <AlertDescription>{state.message}</AlertDescription>
             </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

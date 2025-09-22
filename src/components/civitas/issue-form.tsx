"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
import { UploadCloud, X } from "lucide-react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);


  useEffect(() => {
    if (state.success && state.issue) {
      onIssueSubmitted(state.issue);
      formRef.current?.reset();
      setPreview(null);
      // Manually reset the Select component's display value
      if(selectTriggerRef.current) {
        const valueNode = selectTriggerRef.current.querySelector('span');
        if(valueNode) valueNode.textContent = t('form.category.label');
      }
    }
  }, [state, onIssueSubmitted, t]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <Card className="w-full bg-gradient-to-br from-card to-card/90 dark:from-card dark:to-card/80 shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-2xl border-b pb-4">{t('form.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-6">

          <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            {preview ? (
                <div className="relative group">
                    <Image src={preview} alt="Image preview" width={200} height={200} className="rounded-lg object-cover w-full aspect-video" />
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleRemoveImage}>
                        <X className="h-4 w-4"/>
                    </Button>
                </div>
            ) : (
                <div 
                    className="flex items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <div className="text-center">
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground"/>
                        <p className="mt-2 text-sm text-muted-foreground">Click to upload an image</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            )}
            <Input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              className="sr-only"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {state.errors?.photo && (
              <p className="text-sm text-destructive">{state.errors.photo[0]}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">{t('form.description.label')}</Label>
            <Textarea
              id="description"
              name="description"
              placeholder={t('form.description.placeholder')}
              required
              rows={3}
            />
            {state.errors?.description && (
              <p className="text-sm text-destructive">{state.errors.description[0]}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

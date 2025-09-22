"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignInForm() {
    const { t } = useLanguage();
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">{t('auth.signin.title')}</CardTitle>
        <CardDescription>
          {t('auth.signin.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t('auth.email.label')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('auth.email.placeholder')}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">{t('auth.password.label')}</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            {t('auth.signin.button')}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {t('auth.signin.noaccount')}{" "}
          <Link href="/auth/sign-up" className="underline">
            {t('auth.signup.title')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

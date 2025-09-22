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

export function SignUpForm() {
    const { t } = useLanguage();
    return (
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl font-headline">{t('auth.signup.title')}</CardTitle>
            <CardDescription>
                {t('auth.signup.description')}
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
                <Label htmlFor="password">{t('auth.password.label')}</Label>
                <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
                {t('auth.signup.button')}
            </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                {t('auth.signup.haveaccount')}{" "}
                <Link href="/auth/sign-in" className="underline">
                    {t('auth.signin.title')}
                </Link>
            </div>
        </CardContent>
        </Card>
    );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // ログイン成功後の処理
      window.location.href = "/";
    } catch (error) {
      setError(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-start pt-6 md:pt-12">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 px-4 sm:w-[350px] md:w-[450px]">
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center md:text-2xl ms:test-xl">
              ログイン
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="font-bold text-sm leading-none"
                  htmlFor="email"
                >
                  メールアドレス
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  className="font-bold text-sm leading-none"
                  htmlFor="password"
                >
                  パスワード
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 md:text-lg sm:text-base"
                disabled={isLoading}
              >
                {isLoading ? "ログイン中..." : "ログイン"}
              </Button>

              <div className="mt-6 text-center text-base">
                アカウントをお持ちでない方は
                <Link href="/signin" className="text-primary hover:underline">
                  新規登録
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

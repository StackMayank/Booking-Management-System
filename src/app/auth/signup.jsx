"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"

import Icon from "@/components/ui/icon"

// ✅ Schema
const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email"),

  password: z
    .string()
    .min(6, "Minimum 6 characters")
    .max(100, "Password too long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),

  terms: z.literal(true, {
    errorMap: () => ({
      message: "You must accept terms",
    }),
  }),
})

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  })

  const onSubmit = (data) => {
    console.log("Form Data:", data)
  }

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-full"
      >

        {/* NAME */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Name</FieldLabel>

              <Input
                {...field}
                type="text"
                placeholder="John Doe"
                className="h-10 rounded-lg"
              />

              {fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* EMAIL */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email</FieldLabel>

              <Input
                {...field}
                type="email"
                placeholder="you@example.com"
                className="h-10 rounded-lg"
              />

              {fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* PASSWORD 👁 */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Password</FieldLabel>

              <div className="relative flex items-center">
                <Input
                  {...field}
                  value={field.value || ""}   // 🔥 IMPORTANT FIX
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="h-10 rounded-lg"
                />

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Icon icon={showPassword ? "eyeclosed" : "eye"} />
                </Button>
              </div>

              {fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* TERMS */}
        <Controller
          name="terms"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />

                <p className="text-sm text-gray-600 leading-none">
                  I accept terms & conditions
                </p>
              </div>

              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        {/* BUTTON */}
        <Button
          type="submit"
          className="w-full h-10 bg-brand hover:bg-brand/80"
        >
          Create Account
        </Button>

      </form>

      <div className="flex items-center justify-center mt-6">
        <span className="text-sm">
          Already have an account?{" "}
          <a
            href="/auth/signin"
            className="text-brand hover:underline underline-offset-4"
          >
            Sign In
          </a>
        </span>
      </div>
    </>
  )
}
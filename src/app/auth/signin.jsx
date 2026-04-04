"use client"

import { useForm } from "react-hook-form"
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

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false,
    },
  })

  const onSubmit = (data) => {
    console.log("Form Data:", data)
  }

  const termsValue = watch("terms")

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 w-full"
      >

        {/* EMAIL */}
        <Field data-invalid={!!errors.email}>
          <FieldLabel>Email</FieldLabel>

          <Input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="h-10 rounded-lg"
          />

          {errors.email && (
            <FieldError errors={[errors.email]} />
          )}
        </Field>

        {/* PASSWORD */}
        <Field data-invalid={!!errors.password}>
          <FieldLabel>Password</FieldLabel>

          <div className="relative flex items-center">
            <Input
              {...register("password")}
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

          {errors.password && (
            <FieldError errors={[errors.password]} />
          )}
        </Field>

        {/* TERMS */}
        <div>
          <div className="flex items-start gap-3">
            <Checkbox
              checked={termsValue}
              onCheckedChange={(checked) => {
                setValue("terms", checked, { shouldValidate: true })
              }}
            />

            <p className="text-sm text-gray-600 leading-none">
              I accept terms & conditions
            </p>
          </div>

          {errors.terms && (
            <p className="text-sm text-red-500">
              {errors.terms.message}
            </p>
          )}
        </div>

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
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-brand hover:underline underline-offset-4"
          >
            Create Account
          </a>
        </span>
      </div>
    </>
  )
}
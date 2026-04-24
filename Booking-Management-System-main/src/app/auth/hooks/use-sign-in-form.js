import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters").max(100, "Password too long").regex(/[A-Z]/, "Must contain at least one uppercase letter").regex(/[0-9]/, "Must contain at least one number"),
});

export const useSignInForm = () => {
  const [pending, setPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignInSubmit = async (data) => {
    setPending(true);
    try {
      console.log("Sign In Data:", data);
      // Add actual sign in logic here
    } finally {
      setPending(false);
    }
  };

  return { form, handleSignInSubmit, pending };
};

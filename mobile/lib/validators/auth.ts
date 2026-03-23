import { z } from "zod";


export const loginSchema = z.object({
  email: z.email({
      message: "Please enter a valid email address.",
      pattern: z.regexes.email,
    }),
    password: z.string().min(6, "Password must be at least 6 characters."),
});


export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters."),
    last_name: z
      .string()
      .trim()
      .max(50, "Last name must be 50 characters or fewer.")
      .optional()
      .or(z.literal("")),
    email: z.email({
      message: "Please enter a valid email address.",
      pattern: z.regexes.email,
    }),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

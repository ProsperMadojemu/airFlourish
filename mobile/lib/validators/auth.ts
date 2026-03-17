import { z } from "zod";


export const loginSchema = z.object({
  email: z.email({
      message: "Please enter a valid email address.",
      pattern: z.regexes.email,
    }),
    password: z.string().min(6, "Password must be at least 6 characters."),
});


export type LoginSchema = z.infer<typeof loginSchema>;
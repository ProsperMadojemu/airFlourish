import { countries } from "@/lib/constants/countries";
import { z } from "zod";

const countryCodes = new Set(countries.countries.map((country) => country.code));


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
      .max(150, "First name must be 150 characters or fewer.")
      .optional()
      .or(z.literal("")),
    last_name: z
      .string()
      .trim()
      .max(150, "Last name must be 150 characters or fewer.")
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .max(254, "Email must be 254 characters or fewer.")
      .email("Please enter a valid email address."),
    password: z.string().min(1, "Password is required."),
    phone_number: z
      .string()
      .trim()
      .max(20, "Phone number must be 20 characters or fewer.")
      .optional()
      .or(z.literal("")),
    country: z
      .string()
      .min(1, "Please select a country.")
      .refine((value) => countryCodes.has(value), "Please select a valid country."),
    church: z
      .string()
      .trim()
      .max(255, "Church must be 255 characters or fewer.")
      .optional()
      .or(z.literal("")),
    zone: z
      .string()
      .trim()
      .max(255, "Zone must be 255 characters or fewer.")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

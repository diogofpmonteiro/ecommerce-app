import z from "zod";

export const loginSchema = z.object({
  email: z.email().min(3).max(255),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.email().min(3).max(255),
  password: z.string().min(1),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(63, "Username must be at most 63 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username must start and end with a letter or number and can only contain letters, numbers, and hyphens"
    )
    .refine((val) => !val.includes("--"), "Username cannot contain consecutive hyphens")
    .transform((val) => val.toLowerCase()),
});

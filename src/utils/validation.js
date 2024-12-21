import { z } from 'zod'

export const User = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .refine((val) => /[a-z]/.test(val), {
      message: 'Password must contain at least one lowercase letter.',
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter.',
    })
    .refine((val) => /\d/.test(val), {
      message: 'Password must contain at least one number.',
    }),
})

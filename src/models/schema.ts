import z from "zod";

export const phoneSchema = z.object({
  phone: z.string().min(10, "Enter valid phone number"),
});

export type PhoneInput = z.infer<typeof phoneSchema>;

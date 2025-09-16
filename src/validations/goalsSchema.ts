import { z } from "zod";

export const goalsSchema = z.object({
  title: z.string(),
  targetAmount: z.number().min(1, "Too small").max(1_000_000, "Too big"),
  currency: z.string(),
});

export type GoalsFormValues = z.infer<typeof goalsSchema>;

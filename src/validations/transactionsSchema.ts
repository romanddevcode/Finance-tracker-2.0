import { z } from "zod";

export const trsancationsSchema = z.object({
  amount: z.number().min(1, "Too small").max(1_000_000, "Too big"),
  currency: z.string(),
  type: z.string(),
  category: z.string(),
  date: z.string(),
  description: z.string(),
});

export type TransactionsFormValues = z.infer<typeof trsancationsSchema>;

import { z } from "zod";

export const budgetLimitSchema = z.object({
  limit: z.number().min(1, "Too small").max(1_000_000, "Too big"),
  currency: z.string(),
  isActivated: z.boolean(),
});

export type BudgetLimitFormValues = z.infer<typeof budgetLimitSchema>;

import { z } from "zod";

export const priceSchema = z.object({
  prices: z.array(
    z.object({
      id: z.number(),
      price: z
        .string()
        .min(1, "Pris krävs")
        .regex(/^\d+(\.\d{1,2})?$/, "Pris måste vara ett giltigt tal (t.ex. 123 eller 123.45)")
        .refine((val) => parseFloat(val) >= 0, {
          message: "Pris får inte vara negativt",
        }),
    })
  ),
});

export type PriceFormValues = z.infer<typeof priceSchema>;

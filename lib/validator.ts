import { z } from "zod";

export const formEventSchema = z.object({
  title: z.string().min(3, {
    message: "El título debe tener al menos 3 caracteres.",
  }),
  description: z
    .string()
    .min(3, {
      message: "La descripción debe tener al menos 3 caracteres.",
    })
    .max(500, {
      message: "La descripción debe tener menos de 200 caracteres.",
    }),
  location: z.string().min(3, {
    message: "La ubicación debe tener al menos 3 caracteres.",
  }),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
});

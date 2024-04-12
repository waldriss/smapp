import { z } from "zod";

export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(100, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(1, { message: "This field is required" })
    .max(1000, { message: "Maximum 1000 characters." }),
  tags: z
    .string()
    .regex(/^(\w+)(,\w+)*$|^$/, {
      message: "Tags must be separated by commas without spaces or be empty",
    }),
});

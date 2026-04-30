import { z } from 'zod';

export const CreateQuoteSchema = z.object({
  feet_width: z.number().min(0, 'Width must be 0 or greater').default(0),
  feet_length: z.number().min(0, 'Length must be 0 or greater').default(0),
  sqr_feet: z.number().min(0, 'Square feet must be 0 or greater').default(0),
  demolition: z.boolean().default(false),
  grout: z.boolean().default(false),
  pickup: z.boolean().default(false),
  thin_set: z.boolean().default(false),
});

export const UpdateFeet_widthSchema = z.object({
  feet_width: z.number().min(0, 'Width must be 0 or greater'),
});

export const UpdateFeet_lengthSchema = z.object({
  feet_length: z.number().min(0, 'Length must be 0 or greater'),
});

export const UpdateSqr_feetSchema = z.object({
  sqr_feet: z.number().min(0, 'Square feet must be 0 or greater'),
});

export const UpdateDemolitionSchema = z.object({
  demolition: z.boolean(),
});

export const UpdateGroutSchema = z.object({
  grout: z.boolean(),
});

export const UpdatePickupSchema = z.object({
  pickup: z.boolean(),
});

export const UpdateThinSetSchema = z.object({
  thin_set: z.boolean(),
});

export const CalculateQuoteTotalSchema = z.object({
  feet_width: z.number().min(0, 'Width must be 0 or greater').default(0),
  feet_length: z.number().min(0, 'Length must be 0 or greater').default(0),
  sqr_feet: z.number().min(0, 'Square feet must be 0 or greater').default(0),
  demolition: z.boolean().default(false),
  grout: z.boolean().default(false),
  pickup: z.boolean().default(false),
  thin_set: z.boolean().default(false),
});

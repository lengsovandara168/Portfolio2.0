import { z, defineCollection } from "astro:content";

export const collections = {
  projects: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
      tags: z.array(z.string()),
      link: z.string().url(),
      featured: z.boolean().optional(),
      year: z.string().optional(),
      role: z.string().optional(),
      tech: z.array(z.string()).optional(),
      highlights: z.array(z.string()).optional(),
    }),
  }),
  experience: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      highlights: z.array(z.string()).optional(),
      tech: z.array(z.string()).optional(),
    }),
  }),
};

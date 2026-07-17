import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    status: z.enum(['ongoing', 'completed']),
    featured: z.boolean().default(false),
    sectors: z.array(z.string()),          // slugs matching the `sectors` collection
    donors: z.array(z.string()),           // display names
    municipalities: z.array(z.string()),
    wards: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),   // omit for ongoing
    budgetNPR: z.number().optional(),
    summary: z.string(),
    objectives: z.array(z.string()).default([]),
    achievements: z.array(z.string()).default([]),
    sdgs: z.array(z.number()).default([]),
    heroImage: image().optional(),
    gallery: z.array(image()).default([]),
  }),
});

const sectors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/sectors' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    order: z.number().default(0),
    description: z.string(),
    icon: z.string().optional(),
    heroImage: image().optional(),
  }),
});

const partners = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/partners' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    type: z.enum(['multilateral', 'bilateral', 'ingo', 'government', 'local-government', 'other']),
    logo: image().optional(),
    relationship: z.string().optional(),
    referenceLetter: z.string().optional(), // path to PDF
    url: z.string().url().optional(),
  }),
});

const stories = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/stories' }),
  schema: ({ image }) => z.object({
    person: z.string(),
    place: z.string(),
    sector: z.string().optional(),
    project: reference('projects').optional(),
    quote: z.string().optional(),
    photo: image().optional(),
    date: z.coerce.date().optional(),
  }),
});

const reports = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/reports' }),
  schema: z.object({
    title: z.string(),
    yearBS: z.string(),
    yearAD: z.number(),
    type: z.enum(['annual-report', 'audited-financials', 'financial-summary']),
    language: z.enum(['en', 'ne', 'bilingual']).default('en'),
    file: z.string(),        // path to PDF
    summary: z.string().optional(),
  }),
});

const policies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/policies' }),
  schema: z.object({
    name: z.string(),
    category: z.enum(['financial', 'hr', 'safeguarding', 'governance', 'operational']),
    yearBS: z.string().optional(),
    lastRevised: z.string().optional(),
    file: z.string().optional(),
  }),
});

export const collections = { projects, sectors, partners, stories, reports, policies };

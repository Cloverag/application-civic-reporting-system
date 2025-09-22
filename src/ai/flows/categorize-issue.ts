'use server';

/**
 * @fileOverview An issue categorization AI agent.
 *
 * - categorizeIssue - A function that handles the issue categorization process.
 * - CategorizeIssueInput - The input type for the categorizeIssue function.
 * - CategorizeIssueOutput - The return type for the categorizeIssue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CategorizeIssueInputSchema = z.object({
  description: z.string().describe('The description of the issue.'),
  location: z.string().describe('The location of the issue.'),
});
export type CategorizeIssueInput = z.infer<typeof CategorizeIssueInputSchema>;

const CategorizeIssueOutputSchema = z.object({
  category: z.string().describe('The category of the issue.'),
  confidence: z.number().describe('The confidence level of the categorization (0-1).'),
});
export type CategorizeIssueOutput = z.infer<typeof CategorizeIssueOutputSchema>;

export async function categorizeIssue(input: CategorizeIssueInput): Promise<CategorizeIssueOutput> {
  return categorizeIssueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeIssuePrompt',
  input: {schema: CategorizeIssueInputSchema},
  output: {schema: CategorizeIssueOutputSchema},
  prompt: `You are an expert in categorizing civic issues.

  Based on the description and location provided, determine the most appropriate category for the issue.

  Description: {{{description}}}
  Location: {{{location}}}

  Respond with a JSON object that contains the category and a confidence level between 0 and 1.
  `,
});

const categorizeIssueFlow = ai.defineFlow(
  {
    name: 'categorizeIssueFlow',
    inputSchema: CategorizeIssueInputSchema,
    outputSchema: CategorizeIssueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

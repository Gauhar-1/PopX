// Email domain finder flow.
'use server';
/**
 * @fileOverview This file defines a Genkit flow to find the email domain for a given company name.
 *
 * - findEmailDomain - A function that takes a company name as input and returns the likely email domain.
 * - FindEmailDomainInput - The input type for the findEmailDomain function.
 * - FindEmailDomainOutput - The return type for the findEmailDomain function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindEmailDomainInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
});
export type FindEmailDomainInput = z.infer<typeof FindEmailDomainInputSchema>;

const FindEmailDomainOutputSchema = z.object({
  emailDomain: z
    .string()
    .describe('The likely email domain for the company, if one can be found.'),
});
export type FindEmailDomainOutput = z.infer<typeof FindEmailDomainOutputSchema>;

export async function findEmailDomain(input: FindEmailDomainInput): Promise<FindEmailDomainOutput> {
  return findEmailDomainFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findEmailDomainPrompt',
  input: {schema: FindEmailDomainInputSchema},
  output: {schema: FindEmailDomainOutputSchema},
  prompt: `You are an expert in finding email domains for companies.

  Given the company name, find the most likely email domain for the company.
  Return only the email domain, do not include any other text.

  Company Name: {{{companyName}}}`,
});

const findEmailDomainFlow = ai.defineFlow(
  {
    name: 'findEmailDomainFlow',
    inputSchema: FindEmailDomainInputSchema,
    outputSchema: FindEmailDomainOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

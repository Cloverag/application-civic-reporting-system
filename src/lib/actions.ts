"use server";

import { z } from "zod";
import { categorizeIssue } from "@/ai/flows/categorize-issue";
import type { Issue, IssueCategory } from "./types";
import { issueCategories } from "./types";

const submitIssueSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters long."),
  location: z.string().min(3, "Location is required."),
  category: z.enum(issueCategories),
});

export type FormState = {
  success: boolean;
  message: string;
  issue?: Issue;
  errors?: {
    description?: string[];
    location?: string[];
    category?: string[];
  };
};

export async function submitIssue(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = submitIssueSchema.safeParse({
    description: formData.get("description"),
    location: formData.get("location"),
    category: formData.get("category"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { description, location, category } = validatedFields.data;

  try {
    const aiResult = await categorizeIssue({ description, location });

    const newIssue: Issue = {
      id: crypto.randomUUID(),
      description,
      location,
      category,
      aiCategory: aiResult.category,
      aiConfidence: aiResult.confidence,
      status: 'submitted',
      createdAt: new Date(),
    };

    return {
      success: true,
      message: "Your request has been submitted.",
      issue: newIssue,
    };
  } catch (error) {
    console.error("Error submitting issue or with AI categorization:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

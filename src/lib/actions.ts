"use server";

import { z } from "zod";
import { categorizeIssue } from "@/ai/flows/categorize-issue";
import type { Issue, IssueCategory } from "./types";
import { issueCategories } from "./types";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


const submitIssueSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters long."),
  location: z.string().min(3, "Location is required."),
  category: z.enum(issueCategories),
  photo: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ).optional(),
});

export type FormState = {
  success: boolean;
  message: string;
  issue?: Issue;
  errors?: {
    description?: string[];
    location?: string[];
    category?: string[];
    photo?: string[];
  };
};

async function fileToDataURI(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `data:${file.type};base64,${buffer.toString("base64")}`;
}

export async function submitIssue(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = submitIssueSchema.safeParse({
    description: formData.get("description"),
    location: formData.get("location"),
    category: formData.get("category"),
    photo: formData.get("photo"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { description, location, category, photo } = validatedFields.data;

  try {
    let photoDataUri: string | undefined = undefined;
    if (photo && photo.size > 0) {
        photoDataUri = await fileToDataURI(photo);
    }
    
    const aiResult = await categorizeIssue({ description, location, photoDataUri });

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

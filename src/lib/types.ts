export const issueCategories = [
  'pothole',
  'street_light',
  'garbage',
  'broken_sign',
  'fallen_tree',
  'graffiti',
] as const;

export type IssueCategory = (typeof issueCategories)[number];

export type Issue = {
  id: string;
  description: string;
  location: string;
  category: IssueCategory;
  aiCategory?: string;
  aiConfidence?: number;
  status: 'submitted' | 'in_progress' | 'resolved';
  createdAt: Date;
};

export const categoryDisplayNames: Record<IssueCategory, string> = {
  pothole: 'Pothole',
  street_light: 'Street Light',
  garbage: 'Garbage',
  broken_sign: 'Broken Sign',
  fallen_tree: 'Fallen Tree',
  graffiti: 'Graffiti',
};

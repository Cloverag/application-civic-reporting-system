import {
  Car,
  Lightbulb,
  Trash2,
  Signpost,
  TreeDeciduous,
  SprayCan,
  HelpCircle,
} from 'lucide-react';
import type { IssueCategory } from '@/lib/types';
import type { LucideProps } from 'lucide-react';

export const categoryIcons: Record<IssueCategory, React.ComponentType<LucideProps>> = {
  pothole: Car,
  street_light: Lightbulb,
  garbage: Trash2,
  broken_sign: Signpost,
  fallen_tree: TreeDeciduous,
  graffiti: SprayCan,
};

export const getCategoryIcon = (category?: string): React.ComponentType<LucideProps> => {
  if (category && category in categoryIcons) {
    return categoryIcons[category as IssueCategory];
  }
  return HelpCircle;
};

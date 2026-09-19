import {
  BookOpen,
  Briefcase,
  CalendarCheck,
  Clock,
  GraduationCap,
  type LucideIcon,
  UserCheck,
} from "lucide-react";

export type QuickQuestion = {
  id: string;
  label: string;
  prompt: string;
  icon: LucideIcon;
};

export const QUICK_QUESTIONS: QuickQuestion[] = [
  { id: "timings", label: "College timings", prompt: "What are the usual college timings?", icon: Clock },
  { id: "library", label: "Library information", prompt: "Can you tell me about the library and how to use it?", icon: BookOpen },
  { id: "exams", label: "Exam information", prompt: "How do exams work and how should I prepare for them?", icon: CalendarCheck },
  { id: "attendance", label: "Attendance", prompt: "What should I know about attendance requirements?", icon: UserCheck },
  { id: "courses", label: "Courses", prompt: "How do I choose courses and electives?", icon: GraduationCap },
  { id: "placements", label: "Placement support", prompt: "What placement support is usually available for students?", icon: Briefcase },
];

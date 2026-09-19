import { Button } from "@/components/ui/button";
import { QUICK_QUESTIONS } from "./quick-questions";

type QuickQuestionBarProps = {
  disabled?: boolean;
  onSelect: (prompt: string) => void;
};

export function QuickQuestionBar({ disabled, onSelect }: QuickQuestionBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
      {QUICK_QUESTIONS.map(({ id, label, prompt, icon: Icon }) => (
        <Button
          key={id}
          type="button"
          variant="quick"
          size="sm"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
        >
          <Icon className="size-3.5" aria-hidden />
          {label}
        </Button>
      ))}
    </div>
  );
}

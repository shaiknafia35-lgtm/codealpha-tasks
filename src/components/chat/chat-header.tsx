import { Button } from "@/components/ui/button";
import logo from "@/assets/student-support-logo.png";
import { Trash2 } from "lucide-react";

type ChatHeaderProps = {
  onClear: () => void;
  canClear: boolean;
};

export function ChatHeader({ onClear, canClear }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 border-b bg-brand px-4 py-3 text-brand-foreground sm:px-6">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Student Support AI logo"
          width={40}
          height={40}
          className="size-10 rounded-xl bg-surface p-1"
        />
        <div>
          <h1 className="text-base font-semibold leading-tight sm:text-lg">Student Support AI</h1>
          <p className="flex items-center gap-1.5 text-xs opacity-80">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            Online · instant answers for students
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="ghostOnBrand"
        size="sm"
        onClick={onClear}
        disabled={!canClear}
        aria-label="Clear chat"
      >
        <Trash2 className="size-4" aria-hidden />
        <span className="hidden sm:inline">Clear chat</span>
      </Button>
    </header>
  );
}

import { Button } from "@workspace/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

export function TooltipButton({
  value,
  size,
  content,
  variant,
  onClick,
  disabled,
  as,
}: {
  value: React.ReactNode;
  size?: "icon" | "icon-sm" | "icon-lg";
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "secondary"
    | "link"
    | "destructive";
  content: string;
  onClick?: () => void;
  disabled?: boolean;
  as?: string;
}) {
  const Comp = as ?? Button;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Comp
          onClick={onClick}
          disabled={disabled}
          {...(!as && {
            size,
            variant,
          })}
        >
          {value}
        </Comp>
      </TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}

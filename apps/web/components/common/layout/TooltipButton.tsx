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
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={size}
          variant={variant}
          onClick={onClick}
          disabled={disabled}
        >
          {value}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}

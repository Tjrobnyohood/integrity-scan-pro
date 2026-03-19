import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ImpactTooltipProps {
  impact: string;
}

export function ImpactTooltip({ impact }: ImpactTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground hover:text-primary cursor-help inline ml-1" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs bg-card border-border text-card-foreground">
        <p className="text-xs">
          <span className="font-semibold text-primary">Impact:</span> {impact}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImpactTooltip } from "@/components/ImpactTooltip";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  target?: string;
  impact: string;
  icon: LucideIcon;
  status?: "good" | "warning" | "critical";
}

export function MetricCard({ title, value, target, impact, icon: Icon, status = "good" }: MetricCardProps) {
  const statusColors = {
    good: "text-success",
    warning: "text-warning",
    critical: "text-destructive",
  };

  return (
    <Card className="bg-card border-border glow-cyan hover:border-primary/30 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
          <ImpactTooltip impact={impact} />
        </CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${statusColors[status]}`}>{value}</div>
        {target && (
          <p className="text-xs text-muted-foreground mt-1">Target: {target}</p>
        )}
      </CardContent>
    </Card>
  );
}

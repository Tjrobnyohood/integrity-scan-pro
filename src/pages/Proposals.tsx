import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImpactTooltip } from "@/components/ImpactTooltip";
import { Check, Star } from "lucide-react";
import { useState } from "react";

interface PlanItem {
  feature: string;
  budget: string;
  enterprise: string;
  impact: string;
}

const planItems: PlanItem[] = [
  {
    feature: "Firewall",
    budget: "Basic packet filtering",
    enterprise: "Next-gen with AI threat detection",
    impact: "Enterprise firewalls catch 99.7% of threats vs 85% for basic ones.",
  },
  {
    feature: "Uptime SLA",
    budget: "99.5% (~44h downtime/yr)",
    enterprise: "99.99% (~52min downtime/yr)",
    impact: "Higher SLA means fewer outages. 99.99% keeps revenue-critical systems running.",
  },
  {
    feature: "Support",
    budget: "Business hours email",
    enterprise: "24/7 phone + dedicated engineer",
    impact: "When things break at 2AM, 24/7 support means resolution in minutes, not hours.",
  },
  {
    feature: "Backup",
    budget: "Daily local backup",
    enterprise: "Real-time geo-redundant replication",
    impact: "Geo-redundant backups mean even a natural disaster can't wipe your data.",
  },
  {
    feature: "Monitoring",
    budget: "5-min polling intervals",
    enterprise: "Real-time with predictive alerts",
    impact: "Predictive alerts catch problems before they cause downtime.",
  },
];

const Proposals = () => {
  const [isEnterprise, setIsEnterprise] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Proposal</h1>
          <p className="text-muted-foreground mt-1">Compare packages to find the right fit</p>
        </div>

        {/* The Flex Toggle */}
        <Card className="bg-card border-border">
          <CardContent className="py-6">
            <div className="flex items-center justify-center gap-6">
              <span className={`text-sm font-medium transition-colors ${!isEnterprise ? "text-foreground" : "text-muted-foreground"}`}>
                💰 Budget Friendly
              </span>
              <Switch
                checked={isEnterprise}
                onCheckedChange={setIsEnterprise}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm font-medium transition-colors ${isEnterprise ? "text-foreground" : "text-muted-foreground"}`}>
                🏢 Enterprise Grade
              </span>
            </div>
            <div className="text-center mt-3">
              <span className="text-3xl font-bold text-gradient-cyan">
                {isEnterprise ? "$4,500" : "$1,200"}
              </span>
              <span className="text-muted-foreground text-sm">/month</span>
            </div>
          </CardContent>
        </Card>

        {/* Feature Comparison */}
        <div className="space-y-3">
          {planItems.map((item) => (
            <Card key={item.feature} className="bg-card border-border hover:border-primary/20 transition-colors">
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <h3 className="font-medium text-sm">
                        {item.feature}
                        <ImpactTooltip impact={item.impact} />
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 ml-6">
                      {isEnterprise ? item.enterprise : item.budget}
                    </p>
                  </div>
                  {isEnterprise && (
                    <Badge variant="outline" className="border-primary/30 text-primary text-xs shrink-0">
                      <Star className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-3">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Accept Proposal
          </Button>
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
            Request Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Proposals;

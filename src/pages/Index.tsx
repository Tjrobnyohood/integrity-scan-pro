import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Globe, Lock, Shield, Wifi, Zap } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

const uptimeData = [
  { time: "00:00", uptime: 99.9 }, { time: "04:00", uptime: 99.95 },
  { time: "08:00", uptime: 99.8 }, { time: "12:00", uptime: 99.99 },
  { time: "16:00", uptime: 99.97 }, { time: "20:00", uptime: 99.92 },
  { time: "Now", uptime: 99.95 },
];

const threatData = [
  { day: "Mon", blocked: 142 }, { day: "Tue", blocked: 89 },
  { day: "Wed", blocked: 234 }, { day: "Thu", blocked: 56 },
  { day: "Fri", blocked: 178 }, { day: "Sat", blocked: 23 },
  { day: "Sun", blocked: 12 },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Network Health</h1>
            <p className="text-muted-foreground mt-1">Real-time overview of your infrastructure</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan">
            <Zap className="mr-2 h-4 w-4" />
            Quick Audit
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Uptime"
            value="99.95%"
            target="99.9%"
            impact="High uptime means your services stay online. Even 0.1% downtime = ~8 hours/year of outage."
            icon={Activity}
            status="good"
          />
          <MetricCard
            title="Security Score"
            value="94/100"
            target="90/100"
            impact="This score reflects how well your network resists attacks. Above 90 means enterprise-grade protection."
            icon={Shield}
            status="good"
          />
          <MetricCard
            title="Latency"
            value="12ms"
            target="< 50ms"
            impact="Low latency means your video calls won't freeze and web apps feel instant."
            icon={Clock}
            status="good"
          />
          <MetricCard
            title="Threats Blocked"
            value="734"
            impact="These are malicious attempts stopped this week. Your firewall is actively protecting you."
            icon={Lock}
            status="good"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Wifi className="h-4 w-4 text-primary" />
                Uptime Trend (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={uptimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 30% 18%)" />
                  <XAxis dataKey="time" stroke="hsl(215 20% 55%)" fontSize={12} />
                  <YAxis domain={[99.7, 100]} stroke="hsl(215 20% 55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(220 45% 10%)",
                      border: "1px solid hsl(220 30% 18%)",
                      borderRadius: "8px",
                      color: "hsl(0 0% 98%)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="uptime"
                    stroke="hsl(187 100% 45%)"
                    fill="hsl(187 100% 45% / 0.1)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Threats Blocked (7 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={threatData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 30% 18%)" />
                  <XAxis dataKey="day" stroke="hsl(215 20% 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(220 45% 10%)",
                      border: "1px solid hsl(220 30% 18%)",
                      borderRadius: "8px",
                      color: "hsl(0 0% 98%)",
                    }}
                  />
                  <Bar dataKey="blocked" fill="hsl(187 100% 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Active Devices */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Core Router", ip: "192.168.1.1", status: "Online", health: "good" as const },
                { name: "Firewall Appliance", ip: "192.168.1.2", status: "Online", health: "good" as const },
                { name: "AP-Floor2", ip: "192.168.1.45", status: "Degraded", health: "warning" as const },
                { name: "Backup NAS", ip: "192.168.1.100", status: "Online", health: "good" as const },
              ].map((device) => (
                <div key={device.ip} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${device.health === "good" ? "bg-success" : "bg-warning"}`} />
                    <div>
                      <p className="text-sm font-medium">{device.name}</p>
                      <p className="text-xs text-muted-foreground">{device.ip}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${device.health === "good" ? "text-success" : "text-warning"}`}>
                    {device.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;

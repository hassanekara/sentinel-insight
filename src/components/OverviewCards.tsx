import { Users, ShieldCheck, AlertTriangle, ShieldAlert, Activity, Search } from "lucide-react";

interface OverviewCardsProps {
  total: number;
  normal: number;
  medium: number;
  high: number;
  suspicious: number;
  activeToday: number;
}

const OverviewCards = ({ total, activeToday, suspicious, high }: OverviewCardsProps) => {
  const cards = [
    {
      label: "Total Users Monitored",
      value: total,
      icon: Users,
      colorClass: "text-primary",
      bgClass: "bg-primary/10",
    },
    {
      label: "Active Users Today",
      value: activeToday,
      icon: Activity,
      colorClass: "text-risk-low",
      bgClass: "bg-risk-low/10",
    },
    {
      label: "Suspicious Activities",
      value: suspicious,
      icon: AlertTriangle,
      colorClass: "text-risk-medium",
      bgClass: "bg-risk-medium/10",
    },
    {
      label: "High Risk Users",
      value: high,
      icon: ShieldAlert,
      colorClass: "text-risk-high",
      bgClass: "bg-risk-high/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-card rounded-lg p-5 border border-border shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{card.label}</span>
            <div className={`p-2 rounded-md ${card.bgClass}`}>
              <card.icon className={`h-4 w-4 ${card.colorClass}`} />
            </div>
          </div>
          <p className={`text-3xl font-semibold ${card.colorClass}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface UserRisk {
  userId: string;
  riskScore: number;
}

interface RiskChartProps {
  data: UserRisk[];
}

const getBarColor = (score: number) => {
  if (score <= 30) return "hsl(142, 60%, 45%)";
  if (score <= 70) return "hsl(32, 90%, 55%)";
  return "hsl(0, 72%, 55%)";
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const score = payload[0].value;
    return (
      <div className="bg-popover border border-border rounded-md px-3 py-2 shadow-lg">
        <p className="text-sm text-foreground font-medium">{label}</p>
        <p className="text-sm" style={{ color: getBarColor(score) }}>
          Risk Score: {score}
        </p>
      </div>
    );
  }
  return null;
};

const RiskChart = ({ data }: RiskChartProps) => {
  return (
    <div className="bg-card rounded-lg p-5 border border-border shadow-sm">
      <h2 className="text-lg font-semibold text-foreground mb-4">User Risk Score Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 25%, 18%)" />
          <XAxis
            dataKey="userId"
            tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
            axisLine={{ stroke: "hsl(222, 25%, 18%)" }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
            axisLine={{ stroke: "hsl(222, 25%, 18%)" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="riskScore" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.riskScore)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskChart;

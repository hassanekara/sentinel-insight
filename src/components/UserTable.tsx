export interface LoginEntry {
  time: string;
  device: string;
  vpn: boolean;
}

export interface UserData {
  userId: string;
  department: string;
  riskScore: number;
  status: "Normal" | "Suspicious" | "High Risk";
  lastActivity: string;
  lastLogin: string;
  deviceUsed: string;
  vpnStatus: string;
  flags: string[];
  behaviorSummary: string;
  loginHistory: LoginEntry[];
  deviceHistory: string[];
}

const statusColors: Record<string, string> = {
  Normal: "bg-risk-low/15 text-risk-low",
  Suspicious: "bg-risk-medium/15 text-risk-medium",
  "High Risk": "bg-risk-high/15 text-risk-high",
};

const vpnColors: Record<string, string> = {
  Active: "text-risk-medium",
  Off: "text-muted-foreground",
};

interface UserTableProps {
  users: UserData[];
  onViewDetails: (user: UserData) => void;
}

const UserTable = ({ users, onViewDetails }: UserTableProps) => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="p-5 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">User Risk Monitoring</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Real-time monitoring of employee activity and risk indicators</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">User ID</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Department</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Last Login</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Device</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">VPN</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Risk Score</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium text-foreground">{user.userId}</td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{user.department}</td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{user.lastLogin}</td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{user.deviceUsed}</td>
                <td className={`px-5 py-3.5 text-sm font-medium ${vpnColors[user.vpnStatus] || "text-muted-foreground"}`}>
                  {user.vpnStatus}
                </td>
                <td className="px-5 py-3.5 text-sm font-medium" style={{ color: user.riskScore <= 30 ? 'hsl(142, 60%, 45%)' : user.riskScore <= 70 ? 'hsl(32, 90%, 55%)' : 'hsl(0, 72%, 55%)' }}>
                  {user.riskScore}
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => onViewDetails(user)}
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;

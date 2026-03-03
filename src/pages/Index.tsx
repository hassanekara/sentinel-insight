import { useState, useCallback } from "react";
import { Shield, AlertCircle, Zap } from "lucide-react";
import OverviewCards from "@/components/OverviewCards";
import RiskChart from "@/components/RiskChart";
import UserTable from "@/components/UserTable";
import UserDetailPanel from "@/components/UserDetailPanel";
import type { UserData } from "@/components/UserTable";

const initialUsers: UserData[] = [
  {
    userId: "USR-1021",
    department: "Finance",
    riskScore: 18,
    status: "Normal",
    lastActivity: "2026-03-03 09:15",
    flags: [],
    behaviorSummary: "Regular activity patterns. No anomalies detected in the past 30 days.",
  },
  {
    userId: "USR-1034",
    department: "Engineering",
    riskScore: 45,
    status: "Suspicious",
    lastActivity: "2026-03-03 02:40",
    flags: ["Login outside working hours", "Accessed unusual department database"],
    behaviorSummary: "Unusual login time detected. Accessed HR database not related to role.",
  },
  {
    userId: "USR-1052",
    department: "HR",
    riskScore: 12,
    status: "Normal",
    lastActivity: "2026-03-02 17:30",
    flags: [],
    behaviorSummary: "Standard work patterns. All access within authorized scope.",
  },
  {
    userId: "USR-1078",
    department: "Operations",
    riskScore: 72,
    status: "High Risk",
    lastActivity: "2026-03-03 01:10",
    flags: ["Large data download", "New device used", "Login using VPN", "Login outside working hours"],
    behaviorSummary: "Downloaded 2.3 GB of sensitive files from a new device via VPN at 1 AM. Multiple risk indicators triggered.",
  },
  {
    userId: "USR-1091",
    department: "Marketing",
    riskScore: 25,
    status: "Normal",
    lastActivity: "2026-03-03 10:05",
    flags: [],
    behaviorSummary: "Normal browsing and email activity. No flags.",
  },
  {
    userId: "USR-1105",
    department: "IT Support",
    riskScore: 55,
    status: "Suspicious",
    lastActivity: "2026-03-02 23:45",
    flags: ["Accessed unusual department database", "Login outside working hours"],
    behaviorSummary: "Accessed finance records outside normal hours. Under review.",
  },
  {
    userId: "USR-1112",
    department: "Legal",
    riskScore: 8,
    status: "Normal",
    lastActivity: "2026-03-03 08:50",
    flags: [],
    behaviorSummary: "Routine document review activity. Within expected parameters.",
  },
  {
    userId: "USR-1130",
    department: "Research",
    riskScore: 38,
    status: "Suspicious",
    lastActivity: "2026-03-03 04:20",
    flags: ["Login outside working hours", "New device used"],
    behaviorSummary: "Logged in from an unrecognized device during off-hours. Monitoring escalated.",
  },
];

const Index = () => {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const normal = users.filter((u) => u.riskScore <= 30).length;
  const medium = users.filter((u) => u.riskScore > 30 && u.riskScore <= 70).length;
  const high = users.filter((u) => u.riskScore > 70).length;

  const chartData = users.map((u) => ({ userId: u.userId, riskScore: u.riskScore }));

  const simulateThreat = useCallback(() => {
    setUsers((prev) => {
      const targetIndex = prev.findIndex((u) => u.status === "Normal");
      if (targetIndex === -1) return prev;
      const updated = [...prev];
      updated[targetIndex] = {
        ...updated[targetIndex],
        riskScore: 85,
        status: "High Risk",
        flags: [
          "Login outside working hours",
          "Large data download",
          "New device used",
          "Accessed unusual department database",
          "Login using VPN",
        ],
        behaviorSummary:
          "SIMULATED: Sudden spike in risk indicators. Large unauthorized data transfer detected from new device via VPN connection.",
      };
      return updated;
    });
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 8000);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Alert Banner */}
      {alertVisible && (
        <div className="bg-risk-high/10 border-b border-risk-high/30 px-4 py-3 animate-fade-in">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-risk-high shrink-0" />
            <p className="text-sm font-medium text-risk-high">
              ⚠ High Risk Behavior Detected – Review Required
            </p>
          </div>
        </div>
      )}

      {/* Top Nav */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-base font-semibold text-foreground">AI Insider Threat Detection System</h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
            <span>Acme Corp</span>
            <span className="text-border">|</span>
            <span>Mar 3, 2026</span>
            <span className="text-border">|</span>
            <span>Logged in as <span className="text-foreground font-medium">Security Analyst</span></span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <OverviewCards total={users.length} normal={normal} medium={medium} high={high} />
        <RiskChart data={chartData} />
        <UserTable users={users} onViewDetails={setSelectedUser} />

        {/* Simulate Button */}
        <div className="flex justify-center pt-2 pb-4">
          <button
            onClick={simulateThreat}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-primary/20"
          >
            <Zap className="h-4 w-4" />
            Simulate Insider Threat Scenario
          </button>
        </div>
      </main>

      {/* Detail Panel */}
      {selectedUser && (
        <UserDetailPanel user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default Index;

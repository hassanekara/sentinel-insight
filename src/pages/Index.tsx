import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, AlertCircle, Zap, LogOut, Activity } from "lucide-react";
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
    lastLogin: "2026-03-03 09:10",
    deviceUsed: "Windows Laptop",
    vpnStatus: "Off",
    flags: [],
    behaviorSummary: "Regular activity patterns. No anomalies detected in the past 30 days.",
    loginHistory: [
      { time: "2026-03-03 09:10", device: "Windows Laptop", vpn: false },
      { time: "2026-03-02 08:55", device: "Windows Laptop", vpn: false },
      { time: "2026-03-01 09:02", device: "Windows Laptop", vpn: false },
    ],
    deviceHistory: ["Windows Laptop"],
  },
  {
    userId: "USR-1034",
    department: "Engineering",
    riskScore: 45,
    status: "Suspicious",
    lastActivity: "2026-03-03 02:40",
    lastLogin: "2026-03-03 02:35",
    deviceUsed: "MacBook Pro",
    vpnStatus: "Active",
    flags: ["Login outside working hours", "Accessed unusual department database"],
    behaviorSummary: "Unusual login time detected. Accessed HR database not related to role.",
    loginHistory: [
      { time: "2026-03-03 02:35", device: "MacBook Pro", vpn: true },
      { time: "2026-03-02 10:20", device: "MacBook Pro", vpn: false },
      { time: "2026-03-01 09:45", device: "MacBook Pro", vpn: false },
    ],
    deviceHistory: ["MacBook Pro"],
  },
  {
    userId: "USR-1052",
    department: "HR",
    riskScore: 12,
    status: "Normal",
    lastActivity: "2026-03-02 17:30",
    lastLogin: "2026-03-02 08:45",
    deviceUsed: "Windows Desktop",
    vpnStatus: "Off",
    flags: [],
    behaviorSummary: "Standard work patterns. All access within authorized scope.",
    loginHistory: [
      { time: "2026-03-02 08:45", device: "Windows Desktop", vpn: false },
      { time: "2026-03-01 08:50", device: "Windows Desktop", vpn: false },
    ],
    deviceHistory: ["Windows Desktop"],
  },
  {
    userId: "USR-1078",
    department: "Operations",
    riskScore: 72,
    status: "High Risk",
    lastActivity: "2026-03-03 01:10",
    lastLogin: "2026-03-03 01:05",
    deviceUsed: "Unknown Android",
    vpnStatus: "Active",
    flags: ["Large data download", "New device used", "Login using VPN", "Login outside working hours"],
    behaviorSummary: "User logged in at 01:05 AM using a new Android device and downloaded 2.3 GB of sensitive files from a department database that is not usually accessed by this user. VPN connection detected.",
    loginHistory: [
      { time: "2026-03-03 01:05", device: "Unknown Android", vpn: true },
      { time: "2026-03-02 09:30", device: "Windows Laptop", vpn: false },
      { time: "2026-03-01 08:15", device: "Windows Laptop", vpn: false },
    ],
    deviceHistory: ["Windows Laptop", "Unknown Android"],
  },
  {
    userId: "USR-1091",
    department: "Marketing",
    riskScore: 25,
    status: "Normal",
    lastActivity: "2026-03-03 10:05",
    lastLogin: "2026-03-03 09:58",
    deviceUsed: "MacBook Air",
    vpnStatus: "Off",
    flags: [],
    behaviorSummary: "Normal browsing and email activity. No flags.",
    loginHistory: [
      { time: "2026-03-03 09:58", device: "MacBook Air", vpn: false },
      { time: "2026-03-02 10:05", device: "MacBook Air", vpn: false },
    ],
    deviceHistory: ["MacBook Air"],
  },
  {
    userId: "USR-1105",
    department: "IT Support",
    riskScore: 55,
    status: "Suspicious",
    lastActivity: "2026-03-02 23:45",
    lastLogin: "2026-03-02 23:40",
    deviceUsed: "Linux Workstation",
    vpnStatus: "Active",
    flags: ["Accessed unusual department database", "Login outside working hours"],
    behaviorSummary: "Accessed finance records outside normal hours. Under review.",
    loginHistory: [
      { time: "2026-03-02 23:40", device: "Linux Workstation", vpn: true },
      { time: "2026-03-02 09:00", device: "Linux Workstation", vpn: false },
    ],
    deviceHistory: ["Linux Workstation"],
  },
  {
    userId: "USR-1112",
    department: "Legal",
    riskScore: 8,
    status: "Normal",
    lastActivity: "2026-03-03 08:50",
    lastLogin: "2026-03-03 08:45",
    deviceUsed: "Windows Laptop",
    vpnStatus: "Off",
    flags: [],
    behaviorSummary: "Routine document review activity. Within expected parameters.",
    loginHistory: [
      { time: "2026-03-03 08:45", device: "Windows Laptop", vpn: false },
      { time: "2026-03-02 09:10", device: "Windows Laptop", vpn: false },
    ],
    deviceHistory: ["Windows Laptop"],
  },
  {
    userId: "USR-1130",
    department: "Research",
    riskScore: 38,
    status: "Suspicious",
    lastActivity: "2026-03-03 04:20",
    lastLogin: "2026-03-03 04:15",
    deviceUsed: "iPad Pro",
    vpnStatus: "Active",
    flags: ["Login outside working hours", "New device used"],
    behaviorSummary: "Logged in from an unrecognized iPad Pro during off-hours. Monitoring escalated.",
    loginHistory: [
      { time: "2026-03-03 04:15", device: "iPad Pro", vpn: true },
      { time: "2026-03-02 10:30", device: "Windows Desktop", vpn: false },
    ],
    deviceHistory: ["Windows Desktop", "iPad Pro"],
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("uba-authenticated");
    if (!auth) navigate("/", { replace: true });
  }, [navigate]);

  const normal = users.filter((u) => u.riskScore <= 30).length;
  const medium = users.filter((u) => u.riskScore > 30 && u.riskScore <= 70).length;
  const high = users.filter((u) => u.riskScore > 70).length;
  const suspicious = users.filter((u) => u.flags.length > 0).length;
  const activeToday = users.filter((u) => u.lastLogin.startsWith("2026-03-03")).length;

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
        vpnStatus: "Active",
        deviceUsed: "Unknown Device",
        flags: [
          "Login outside working hours",
          "Large data download",
          "New device used",
          "Accessed unusual department database",
          "Login using VPN",
        ],
        behaviorSummary:
          "SIMULATED: User logged in at 02:15 AM using a new device and downloaded 350 files from a department database that is not usually accessed by this user. VPN connection from unusual location detected.",
        loginHistory: [
          { time: "2026-03-03 02:15", device: "Unknown Device", vpn: true },
          ...updated[targetIndex].loginHistory,
        ],
        deviceHistory: [...new Set(["Unknown Device", ...updated[targetIndex].deviceHistory])],
      };
      return updated;
    });
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 8000);
  }, []);

  const handleIncidentAction = useCallback((userId: string, action: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.userId === userId
          ? {
              ...u,
              status: action === "isolate" ? "High Risk" as const : u.status,
              behaviorSummary: `${u.behaviorSummary}\n\n[Action Taken: ${action === "isolate" ? "Account Isolated" : action === "escalate" ? "Incident Escalated" : "Marked as Investigated"}]`,
            }
          : u
      )
    );
    setSelectedUser(null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("uba-authenticated");
    navigate("/", { replace: true });
  };

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
            <button onClick={handleLogout} className="ml-2 p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground" title="Logout">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <OverviewCards total={users.length} normal={normal} medium={medium} high={high} suspicious={suspicious} activeToday={activeToday} />
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

        {/* Compliance Footer */}
        <div className="border-t border-border pt-4 pb-6">
          <div className="flex items-start gap-2 max-w-3xl mx-auto">
            <Activity className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground/70">Privacy & Compliance Notice:</span> Employee activity monitoring is performed only for cybersecurity protection purposes and follows principles of data protection and transparency inspired by the General Data Protection Regulation (GDPR). All monitoring data is handled in accordance with organizational privacy policies.
            </p>
          </div>
        </div>
      </main>

      {/* Detail Panel */}
      {selectedUser && (
        <UserDetailPanel user={selectedUser} onClose={() => setSelectedUser(null)} onAction={handleIncidentAction} />
      )}
    </div>
  );
};

export default Index;

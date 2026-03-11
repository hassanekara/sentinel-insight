import { useState } from "react";
import { X, AlertTriangle, Info, Shield, Monitor, Clock, Wifi, ShieldAlert, ShieldCheck, Search } from "lucide-react";
import type { UserData } from "./UserTable";

interface UserDetailPanelProps {
  user: UserData;
  onClose: () => void;
  onAction: (userId: string, action: string) => void;
}

const getScoreColor = (score: number) => {
  if (score <= 30) return "text-risk-low";
  if (score <= 70) return "text-risk-medium";
  return "text-risk-high";
};

const getScoreBg = (score: number) => {
  if (score <= 30) return "bg-risk-low/10 border-risk-low/30";
  if (score <= 70) return "bg-risk-medium/10 border-risk-medium/30";
  return "bg-risk-high/10 border-risk-high/30";
};

const UserDetailPanel = ({ user, onClose, onAction }: UserDetailPanelProps) => {
  const [confirmAction, setConfirmAction] = useState<string | null>(null);

  const handleConfirm = () => {
    if (confirmAction) {
      onAction(user.userId, confirmAction);
      setConfirmAction(null);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-background/60 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 shadow-2xl animate-slide-in-right overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">User Risk Analysis</h2>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-accent transition-colors">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-6">
            {/* User ID & Department */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">User ID</p>
                <p className="text-foreground font-medium mt-1">{user.userId}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Department</p>
                <p className="text-foreground mt-1">{user.department}</p>
              </div>
            </div>

            {/* Risk Score */}
            <div className={`rounded-lg border p-4 ${getScoreBg(user.riskScore)}`}>
              <p className="text-sm text-muted-foreground mb-1">Risk Score</p>
              <p className={`text-4xl font-bold ${getScoreColor(user.riskScore)}`}>{user.riskScore}</p>
              <p className="text-xs text-muted-foreground mt-1">out of 100</p>
            </div>

            {/* Login History */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-foreground">Login History</p>
              </div>
              <div className="space-y-2">
                {user.loginHistory.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2 text-sm">
                    <span className="text-muted-foreground">{entry.time}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-foreground text-xs">{entry.device}</span>
                      {entry.vpn && (
                        <span className="text-xs text-risk-medium font-medium">VPN</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device History */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-foreground">Known Devices</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.deviceHistory.map((device, i) => (
                  <span key={i} className="px-2.5 py-1 bg-secondary rounded-md text-xs text-foreground">
                    {device}
                  </span>
                ))}
              </div>
            </div>

            {/* VPN Detection */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wifi className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-foreground">VPN Status</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${user.vpnStatus === "Active" ? "bg-risk-medium/15 text-risk-medium" : "bg-risk-low/15 text-risk-low"}`}>
                {user.vpnStatus === "Active" ? "VPN Active" : "No VPN"}
              </span>
            </div>

            {/* Behavior Summary */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Behavior Analysis Summary</p>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{user.behaviorSummary}</p>
            </div>

            {/* Flags */}
            {user.flags.length > 0 && (
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Flagged Reasons</p>
                <ul className="space-y-2">
                  {user.flags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="h-4 w-4 text-risk-medium shrink-0 mt-0.5" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Incident Response Actions */}
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Incident Response</p>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setConfirmAction("isolate")}
                  className="flex items-center gap-2 w-full px-4 py-2.5 bg-risk-high/10 border border-risk-high/20 text-risk-high rounded-lg text-sm font-medium hover:bg-risk-high/20 transition-colors"
                >
                  <ShieldAlert className="h-4 w-4" />
                  Isolate User Account
                </button>
                <button
                  onClick={() => setConfirmAction("escalate")}
                  className="flex items-center gap-2 w-full px-4 py-2.5 bg-risk-medium/10 border border-risk-medium/20 text-risk-medium rounded-lg text-sm font-medium hover:bg-risk-medium/20 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Escalate Incident
                </button>
                <button
                  onClick={() => setConfirmAction("investigate")}
                  className="flex items-center gap-2 w-full px-4 py-2.5 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  <Search className="h-4 w-4" />
                  Mark as Investigated
                </button>
              </div>
            </div>

            {/* Confirmation Dialog */}
            {confirmAction && (
              <div className="bg-secondary border border-border rounded-lg p-4">
                <p className="text-sm text-foreground font-medium mb-1">Confirm Action</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Are you sure you want to {confirmAction === "isolate" ? "isolate this user's account" : confirmAction === "escalate" ? "escalate this incident" : "mark this as investigated"}?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleConfirm}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setConfirmAction(null)}
                    className="px-4 py-2 bg-accent text-foreground rounded-lg text-sm font-medium hover:bg-accent/80 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Note */}
            <div className="flex items-start gap-2 bg-secondary/50 rounded-lg p-3">
              <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                AI decisions are explainable and reviewed by a human analyst. All actions are logged for compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailPanel;

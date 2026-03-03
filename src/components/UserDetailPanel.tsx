import { X, AlertTriangle, Info } from "lucide-react";
import type { UserData } from "./UserTable";

interface UserDetailPanelProps {
  user: UserData;
  onClose: () => void;
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

const UserDetailPanel = ({ user, onClose }: UserDetailPanelProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-background/60 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 shadow-2xl animate-slide-in-right overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">User Details</h2>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-accent transition-colors">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-6">
            {/* User ID & Department */}
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="text-foreground font-medium">{user.userId}</p>
              <p className="text-sm text-muted-foreground mt-2">Department</p>
              <p className="text-foreground">{user.department}</p>
            </div>

            {/* Risk Score */}
            <div className={`rounded-lg border p-4 ${getScoreBg(user.riskScore)}`}>
              <p className="text-sm text-muted-foreground mb-1">Risk Score</p>
              <p className={`text-4xl font-bold ${getScoreColor(user.riskScore)}`}>{user.riskScore}</p>
            </div>

            {/* Behavior Summary */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Behavior Summary</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{user.behaviorSummary}</p>
            </div>

            {/* Flags */}
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

            {/* Note */}
            <div className="flex items-start gap-2 bg-secondary/50 rounded-lg p-3">
              <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                AI decisions are explainable and reviewed by a human analyst.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailPanel;

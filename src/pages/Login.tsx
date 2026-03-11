import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, User, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulated login for academic demo
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("uba-authenticated", "true");
        navigate("/dashboard");
      } else {
        setError("Please enter both email and password.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(217 72% 56% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(217 72% 56% / 0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-5">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">AI Insider Threat Detection System</h1>
          <p className="text-sm text-muted-foreground">User Behavior Analytics Security Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-xl p-7 shadow-xl">
          <h2 className="text-lg font-semibold text-foreground mb-1">Welcome Back</h2>
          <p className="text-sm text-muted-foreground mb-6">Sign in to access the security dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Admin Email / Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                  placeholder="admin@acmecorp.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-11 bg-secondary border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-risk-high">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium text-sm transition-colors disabled:opacity-50 shadow-lg shadow-primary/20"
            >
              {loading ? "Authenticating..." : "Login to Security Dashboard"}
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-5">
            Authorized personnel only. All access is logged and monitored.
          </p>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          © 2026 AI Insider Threat Detection System — Academic Research Project
        </p>
      </div>
    </div>
  );
};

export default Login;

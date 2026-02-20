import { useState } from "react";
import { LayoutGrid, Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiService } from "../lib/api";

interface AuthPageProps {
    defaultTab?: "signin" | "signup";
    onAuthSuccess: (userId: number, userName: string) => void;
    onBack: () => void;
}

export default function AuthPage({ defaultTab = "signin", onAuthSuccess, onBack }: AuthPageProps) {
    const [tab, setTab] = useState<"signin" | "signup">(defaultTab);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const reset = () => { setName(""); setEmail(""); setPassword(""); setError(""); };

    const handleSubmit = async () => {
        setError("");
        if (!email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
        if (tab === "signup" && !name.trim()) { setError("Please enter your name."); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

        setLoading(true);
        try {
            if (tab === "signup") {
                const res = await apiService.register({ name: name.trim(), email: email.trim(), password });
                onAuthSuccess(res.data.id, res.data.name);
            } else {
                const res = await apiService.login({ email: email.trim(), password });
                onAuthSuccess(res.data.id, res.data.name);
            }
        } catch (err: any) {
            const detail = err?.response?.data?.detail;
            setError(detail || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans antialiased text-foreground flex items-center justify-center px-4 relative overflow-hidden">
            {/* bg blobs */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-sm relative z-10">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/30">
                        <LayoutGrid className="text-white" size={16} />
                    </div>
                    <span className="font-black text-xl tracking-tight">BetterTasks</span>
                </div>

                {/* Card */}
                <div className="bg-white dark:bg-card border border-border rounded-3xl shadow-2xl shadow-black/10 p-7">
                    {/* Tabs */}
                    <div className="bg-muted p-1 rounded-xl flex mb-6">
                        {(["signin", "signup"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => { setTab(t); reset(); }}
                                className={cn(
                                    "flex-1 py-2 text-xs font-black rounded-lg transition-all",
                                    tab === t ? "bg-white dark:bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {t === "signin" ? "Sign In" : "Sign Up"}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {/* Name — Sign Up only */}
                        {tab === "signup" && (
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest pl-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Ayush Shukla"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    autoFocus
                                    className="w-full bg-muted/50 dark:bg-muted/20 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest pl-1">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                autoFocus={tab === "signin"}
                                className="w-full bg-muted/50 dark:bg-muted/20 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest pl-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                                    className="w-full bg-muted/50 dark:bg-muted/20 border border-border rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-xs font-bold text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-3 py-2">
                                {error}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-black text-sm rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                        >
                            {loading && <Loader2 size={14} className="animate-spin" />}
                            {tab === "signin" ? "Sign In" : "Create Account"}
                        </button>
                    </div>
                </div>

                {/* Back to landing */}
                <button
                    onClick={onBack}
                    className="w-full mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors font-bold py-2"
                >
                    ← Back to home
                </button>
            </div>
        </div>
    );
}

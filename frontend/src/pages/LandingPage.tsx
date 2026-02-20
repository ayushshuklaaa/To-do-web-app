import { LayoutGrid, CheckSquare, Zap, ArrowRight, Star } from "lucide-react";

interface LandingPageProps {
    onGetStarted: () => void;
    onSignIn: () => void;
}

export default function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-background font-sans antialiased text-foreground overflow-hidden">
            {/* Animated background blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-blue-500/8 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Nav */}
            <nav className="relative z-10 flex items-center justify-between px-6 md:px-16 py-5">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/30">
                        <LayoutGrid className="text-white" size={16} />
                    </div>
                    <span className="font-black text-lg tracking-tight">BetterTasks</span>
                </div>
                <button
                    onClick={onSignIn}
                    className="px-5 py-2 text-sm font-bold text-muted-foreground hover:text-foreground border border-border rounded-xl hover:bg-muted/50 transition-all"
                >
                    Sign In
                </button>
            </nav>

            {/* Hero */}
            <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-32">
                {/* Badge */}
                <div className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <Star size={10} fill="currentColor" />
                    Streamline your productivity
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500 max-w-3xl">
                    Tasks done{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                        smarter
                    </span>
                    ,{" "}
                    <br className="hidden md:block" />
                    not harder.
                </h1>

                <p className="text-base md:text-lg text-muted-foreground font-medium max-w-xl mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    BetterTasks keeps your day organized with beautiful lists, priority management, and a lightning-fast interface.
                </p>

                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <button
                        onClick={onGetStarted}
                        className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-black text-sm rounded-2xl hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95"
                    >
                        Get Started Free
                        <ArrowRight size={16} />
                    </button>
                    <button
                        onClick={onSignIn}
                        className="px-6 py-3.5 text-sm font-black text-muted-foreground hover:text-foreground border-2 border-border rounded-2xl hover:bg-muted/50 transition-all hover:scale-105 active:scale-95"
                    >
                        Sign In
                    </button>
                </div>
            </section>

            {/* App Preview Card */}
            <section className="relative z-10 px-6 md:px-16 mb-24 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-card border border-border rounded-3xl shadow-2xl shadow-black/10 p-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    {/* mock header */}
                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-muted/50">
                        <div>
                            <div className="h-5 w-48 bg-muted rounded-lg mb-2" />
                            <div className="h-3 w-32 bg-muted/60 rounded-lg" />
                        </div>
                        <div className="flex gap-2">
                            <div className="h-8 w-20 bg-muted rounded-xl" />
                            <div className="h-8 w-20 bg-primary/20 rounded-xl" />
                        </div>
                    </div>
                    {/* mock task rows */}
                    {[
                        { w: "w-64", badge: "bg-yellow-100 text-yellow-600", label: "High" },
                        { w: "w-48", badge: "bg-blue-100 text-blue-500", label: "Medium" },
                        { w: "w-56", badge: "bg-green-100 text-green-500", label: "Low" },
                    ].map((row, i) => (
                        <div key={i} className="flex items-center gap-4 py-3 border-b border-muted/20 last:border-0">
                            <div className={`w-5 h-5 rounded-md border-2 border-primary/30 flex-shrink-0 ${i === 0 ? "bg-primary border-primary" : ""}`} />
                            <div className={`h-3 ${row.w} bg-muted rounded-full ${i === 0 ? "opacity-40" : ""}`} />
                            <div className="ml-auto">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${row.badge}`}>{row.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="relative z-10 px-6 md:px-16 pb-32 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { icon: CheckSquare, title: "Smart Lists", desc: "Organize tasks into beautiful, emoji-powered lists." },
                        { icon: Zap, title: "Priority System", desc: "Tag tasks as High, Medium, or Low priority with one click." },
                        { icon: Star, title: "Dark Mode", desc: "Easy on the eyes, day or night, with instant theme switching." },
                    ].map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="bg-white dark:bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:shadow-black/5 transition-all hover:-translate-y-0.5">
                            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                <Icon size={18} className="text-primary" />
                            </div>
                            <h3 className="font-black text-sm mb-1">{title}</h3>
                            <p className="text-xs text-muted-foreground font-medium leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

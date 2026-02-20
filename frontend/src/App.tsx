import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import TodoList from "./TodoList";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import "./index.css";

type View = "landing" | "auth-signin" | "auth-signup" | "app";

function App() {
    const [view, setView] = useState<View>("landing");

    // Check if already logged in
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            setView("app");
        }
    }, []);

    const handleAuthSuccess = (userId: number, _userName: string) => {
        localStorage.setItem("userId", String(userId));
        setView("app");
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        setView("landing");
    };

    if (view === "landing") {
        return (
            <LandingPage
                onGetStarted={() => setView("auth-signup")}
                onSignIn={() => setView("auth-signin")}
            />
        );
    }

    if (view === "auth-signin") {
        return (
            <AuthPage
                defaultTab="signin"
                onAuthSuccess={handleAuthSuccess}
                onBack={() => setView("landing")}
            />
        );
    }

    if (view === "auth-signup") {
        return (
            <AuthPage
                defaultTab="signup"
                onAuthSuccess={handleAuthSuccess}
                onBack={() => setView("landing")}
            />
        );
    }

    return <TodoList onLogout={handleLogout} />;
}

createRoot(document.getElementById("root")!).render(<App />);

export default App;

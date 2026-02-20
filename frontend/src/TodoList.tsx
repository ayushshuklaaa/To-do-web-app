import {
    CheckSquare,
    BarChart2,
    Plus,
    Sun,
    Moon,
    ChevronDown,
    Trash2,
    LayoutGrid,
    Info,
    Clock,
    Zap,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { apiService, Task, TaskList, User } from "./lib/api";

// --- Types ---
interface NavItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    badge?: string;
    onClick?: () => void;
}

// --- Sub-Components ---

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    onConfirm,
    confirmLabel = "Create"
}: {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    children: React.ReactNode,
    onConfirm: () => void,
    confirmLabel?: string
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
            <div className="bg-white dark:bg-card border border-border w-full max-w-sm rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
                <h3 className="text-lg font-black tracking-tight mb-4">{title}</h3>
                <div className="mb-6">
                    {children}
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 bg-muted text-muted-foreground font-bold text-xs rounded-xl hover:bg-muted/80 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

const NavItem = ({ icon: Icon, label, active, badge, onClick }: NavItemProps) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all duration-200 group",
            active
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
    >
        <div className="flex items-center gap-2.5">
            <Icon size={15} className={cn(active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
            <span className="text-xs">{label}</span>
        </div>
        {badge && (
            <Badge variant="secondary" className="bg-muted text-[9px] px-1 h-3.5 border-none uppercase font-bold">
                {badge}
            </Badge>
        )}
    </button>
);

const Sidebar = ({
    lists,
    activeListId,
    setActiveListId,
    onAddList,
    onDeleteList,
    user,
    isDarkMode,
    setIsDarkMode,
    onLogout
}: {
    lists: TaskList[],
    activeListId: number | null,
    setActiveListId: (id: number) => void,
    onAddList: () => void,
    onDeleteList: (id: number) => void,
    user: User | null,
    isDarkMode: boolean,
    setIsDarkMode: (dark: boolean) => void,
    onLogout: () => void
}) => {
    return (
        <div className="w-56 h-screen bg-sidebar border-r border-sidebar-border flex flex-col p-4 sticky top-0 overflow-y-auto shrink-0 hidden md:flex">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-7 px-1">
                <div className="bg-primary p-1 rounded-md">
                    <LayoutGrid className="text-white" size={15} />
                </div>
                <span className="font-bold text-base tracking-tight">BetterTasks</span>
            </div>

            {/* Main Menu */}
            <div className="mb-6">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Main Menu</p>
                <div className="space-y-0.5">
                    <NavItem icon={CheckSquare} label="To-do" active />
                    <NavItem icon={BarChart2} label="Analytics" />
                </div>
            </div>

            {/* Lists */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3 px-1">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Lists</p>
                    <button
                        onClick={onAddList}
                        className="text-primary hover:bg-primary/10 p-0.5 rounded transition-colors"
                    >
                        <Plus size={12} />
                    </button>
                </div>

                <div className="space-y-1">
                    {lists.map(list => (
                        <div key={list.id} className="group flex items-center justify-between px-1">
                            <button
                                onClick={() => setActiveListId(list.id)}
                                className={cn(
                                    "flex items-center gap-2 text-xs w-full py-2 px-2 rounded-lg transition-all text-left",
                                    activeListId === list.id
                                        ? "bg-primary/5 text-primary font-bold shadow-sm"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                )}
                            >
                                <span className="text-sm scale-110">{list.emoji}</span> {list.name}
                            </button>
                            <button
                                onClick={() => onDeleteList(list.id)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-destructive transition-all rounded-md hover:bg-destructive/5"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-auto mb-4" />

            {/* Theme Toggle */}
            <div className="bg-muted p-0.5 rounded-lg flex items-center mb-4">
                <button
                    onClick={() => setIsDarkMode(false)}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 py-1 rounded-md text-xs transition-all",
                        !isDarkMode ? "bg-white dark:bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Sun size={12} />
                    Light
                </button>
                <button
                    onClick={() => setIsDarkMode(true)}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 py-1 rounded-md text-xs transition-all",
                        isDarkMode ? "bg-white dark:bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Moon size={12} />
                    Dark
                </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center justify-between w-full p-1.5 bg-white dark:bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-muted shrink-0">
                        <img src={user?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'U'}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                        <p className="text-[11px] font-bold leading-none truncate max-w-[90px]">{user?.name || "Loading..."}</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    title="Logout"
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/5"
                >
                    <LogOut size={12} />
                </button>
            </div>
        </div>
    );
};

const DashboardHeader = ({ user }: { user: User | null }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 px-5 py-4 bg-white dark:bg-card border border-border rounded-2xl shadow-sm relative overflow-hidden">
            {/* Subtle background blob */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-[60px] pointer-events-none" />

            <div className="space-y-0.5 relative z-10 mb-3 sm:mb-0">
                <h1 className="text-xl font-black tracking-tight text-foreground leading-tight">Good Morning, {user?.name.split(' ')[0] || "Ayush"}!</h1>
                <p className="text-xs text-muted-foreground font-semibold">What do you plan to do today?</p>
            </div>

            <div className="flex items-center gap-4 relative z-10">
                <div className="flex -space-x-2.5">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-card overflow-hidden bg-muted shadow-sm hover:translate-y-[-3px] transition-transform duration-300">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 45}`}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const PriorityBadge = ({ priority, onClick }: { priority: Task['priority'], onClick?: () => void }) => {
    const styles = {
        High: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-500 border-yellow-200 dark:border-yellow-900/30",
        Medium: "bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 border-blue-100 dark:border-blue-900/30",
        Low: "bg-green-50 dark:bg-green-900/20 text-green-500 dark:text-green-400 border-green-100 dark:border-green-900/30",
    };

    return (
        <Badge
            variant="outline"
            onClick={(e) => { e.stopPropagation(); onClick?.(); }}
            className={cn("px-2 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-all hover:scale-105 active:scale-95", styles[priority])}
        >
            <div className={cn("w-1.5 h-1.5 rounded-full",
                priority === 'High' ? "bg-yellow-400" :
                    priority === 'Medium' ? "bg-blue-400" :
                        "bg-green-400"
            )} />
            {priority}
        </Badge>
    );
};

const PRIORITIES: Task['priority'][] = ['High', 'Medium', 'Low'];

const priorityStyles: Record<Task['priority'], { dot: string; text: string; hover: string }> = {
    High: { dot: "bg-yellow-400", text: "text-yellow-600 dark:text-yellow-400", hover: "hover:bg-yellow-50 dark:hover:bg-yellow-900/20" },
    Medium: { dot: "bg-blue-400", text: "text-blue-500 dark:text-blue-400", hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20" },
    Low: { dot: "bg-green-400", text: "text-green-500 dark:text-green-400", hover: "hover:bg-green-50 dark:hover:bg-green-900/20" },
};

const TaskListComp = ({
    tasks,
    onToggleTask,
    onDeleteTask,
    onAddTask,
    onFinishAll,
    onSetPriority
}: {
    tasks: Task[],
    onToggleTask: (id: number) => void,
    onDeleteTask: (id: number) => void,
    onAddTask: () => void,
    onFinishAll: () => void,
    onSetPriority: (task: Task, priority: Task['priority']) => void
}) => {
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

    const toggleDropdown = (e: React.MouseEvent, taskId: number) => {
        e.stopPropagation();
        setOpenDropdownId(prev => prev === taskId ? null : taskId);
    };

    return (
        <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden" onClick={() => setOpenDropdownId(null)}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
                <h2 className="text-lg font-black tracking-tight text-foreground">Today's Tasks</h2>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-white dark:bg-muted border-2 border-muted/50 rounded-xl text-xs font-black text-muted-foreground/80 hover:bg-muted/50 hover:border-primary/20 transition-all active:scale-95">
                        <Clock size={13} className="stroke-[2.5px]" />
                        Focus Mode
                    </button>
                    <button className="flex-1 sm:flex-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-[#111111] text-white rounded-xl text-xs font-black hover:bg-black/90 hover:shadow-lg hover:shadow-black/10 transition-all active:scale-95">
                        <Zap size={13} fill="white" className="stroke-none" />
                        AI Assist
                    </button>
                </div>
            </div>

            <div className="space-y-1 mb-5 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        onClick={() => onToggleTask(task.id)}
                        className="flex items-center gap-4 py-3 px-4 border-b border-muted/30 last:border-b-0 hover:bg-[#F9F9FB] dark:hover:bg-muted/30 transition-all group rounded-xl cursor-pointer"
                    >
                        <Checkbox
                            checked={task.completed}
                            onClick={(e) => e.stopPropagation()}
                            onCheckedChange={() => onToggleTask(task.id)}
                            className="w-5 h-5 border-2 border-primary/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white rounded-md transition-all shadow-sm"
                        />

                        <div className="flex-1 min-w-0">
                            <span className={cn(
                                "text-sm font-bold tracking-tight text-foreground/90 transition-all duration-500 block",
                                task.completed && "text-muted-foreground line-through opacity-50 translate-x-1"
                            )}>
                                {task.title}
                            </span>
                            {task.created_at && (
                                <span className="text-[10px] text-muted-foreground/50 font-medium mt-0.5 block">
                                    {(() => {
                                        try {
                                            const dateStr = task.created_at;
                                            let created: Date;
                                            
                                            // Backend sends UTC time, but may not include timezone indicator
                                            // If no timezone info, JavaScript interprets as local time (wrong!)
                                            // Solution: Force UTC parsing by adding 'Z' if missing
                                            
                                            if (dateStr.endsWith('Z') || dateStr.match(/[+-]\d{2}:\d{2}$/)) {
                                                // Already has UTC indicator (Z) or timezone offset (+/-HH:MM)
                                                created = new Date(dateStr);
                                            } else if (dateStr.includes('T')) {
                                                // ISO format without timezone - assume UTC and add 'Z'
                                                created = new Date(dateStr + 'Z');
                                            } else {
                                                // Fallback: try parsing as-is
                                                created = new Date(dateStr);
                                            }
                                            
                                            // Check if date is valid
                                            if (isNaN(created.getTime())) {
                                                console.warn("Invalid date:", task.created_at, "Parsed as:", created);
                                                return "";
                                            }
                                            
                                            const now = new Date();
                                            const diffMs = now.getTime() - created.getTime();
                                            
                                            // Handle negative differences (future dates) - show as "Just now"
                                            if (diffMs < 0 || Math.abs(diffMs) > 86400000 * 365) {
                                                // If difference is negative or more than a year in the past, show "Just now"
                                                // This handles timezone issues where backend time might appear in future
                                                return "Just now";
                                            }
                                            
                                            const diffSec = Math.floor(diffMs / 1000);
                                            if (diffSec < 60) return "Just now";
                                            
                                            const diffMin = Math.floor(diffMs / 60000);
                                            if (diffMin < 60) return `${diffMin}m ago`;
                                            
                                            const diffH = Math.floor(diffMin / 60);
                                            if (diffH < 24) return `${diffH}h ago`;
                                            
                                            const diffD = Math.floor(diffH / 24);
                                            if (diffD < 7) return `${diffD}d ago`;
                                            
                                            // For older dates, show formatted date
                                            return created.toLocaleDateString("en-US", { 
                                                month: "short", 
                                                day: "numeric",
                                                year: diffD >= 365 ? "numeric" : undefined
                                            });
                                        } catch (error) {
                                            console.error("Error parsing date:", task.created_at, error);
                                            return "";
                                        }
                                    })()}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3" onClick={e => e.stopPropagation()}>
                            <PriorityBadge priority={task.priority} />

                            {/* Priority dropdown trigger */}
                            <div className="relative">
                                <button
                                    onClick={(e) => toggleDropdown(e, task.id)}
                                    className={cn(
                                        "p-1 rounded-lg transition-all hover:scale-110 active:scale-90",
                                        openDropdownId === task.id
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground/40 hover:text-primary"
                                    )}
                                    title="Change priority"
                                >
                                    <ChevronDown
                                        size={15}
                                        className={cn("stroke-[2.5px] transition-transform duration-200", openDropdownId === task.id && "rotate-180")}
                                    />
                                </button>

                                {/* Dropdown menu */}
                                {openDropdownId === task.id && (
                                    <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-card border border-border rounded-xl shadow-xl shadow-black/10 py-1 min-w-[110px] animate-in fade-in slide-in-from-top-2 duration-150">
                                        {PRIORITIES.map(p => (
                                            <button
                                                key={p}
                                                onClick={(e) => { e.stopPropagation(); onSetPriority(task, p); setOpenDropdownId(null); }}
                                                className={cn(
                                                    "w-full flex items-center gap-2 px-3 py-2 text-xs font-bold transition-colors",
                                                    priorityStyles[p].hover,
                                                    priorityStyles[p].text,
                                                    task.priority === p && "font-black"
                                                )}
                                            >
                                                <div className={cn("w-2 h-2 rounded-full flex-shrink-0", priorityStyles[p].dot)} />
                                                {p}
                                                {task.priority === p && (
                                                    <span className="ml-auto text-[9px] opacity-60">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={(e) => { e.stopPropagation(); onDeleteTask(task.id); }}
                                className="p-1 text-muted-foreground/40 hover:text-destructive transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-90"
                            >
                                <Trash2 size={15} className="stroke-[2.5px]" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                    onClick={onFinishAll}
                    className="w-full sm:w-auto px-10 py-2.5 bg-primary text-white rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-[0_10px_20px_-5px_rgba(94,92,230,0.3)] active:scale-95"
                >
                    Finish
                </button>
                <button
                    onClick={onAddTask}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#F5F5F7] text-muted-foreground font-black text-sm rounded-xl hover:bg-[#EBEBEF] transition-all active:scale-95"
                >
                    <Plus size={15} className="stroke-[3px]" />
                    Add Task
                </button>
                <button className="hidden sm:block p-2.5 text-muted-foreground/40 hover:text-foreground transition-all ml-2">
                    <Info size={16} className="stroke-[2.5px]" />
                </button>
            </div>
        </div>
    );
};

// --- Main Layout ---
export default function TodoList({ onLogout }: { onLogout?: () => void }) {
    const [user, setUser] = useState<User | null>(null);
    const [lists, setLists] = useState<TaskList[]>([]);
    const [activeListId, setActiveListId] = useState<number | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark';
    });

    // Modal State
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [newListEmoji, setNewListEmoji] = useState("📋");
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [isDeleteListModalOpen, setIsDeleteListModalOpen] = useState(false);
    const [listToDeleteId, setListToDeleteId] = useState<number | null>(null);

    // Theme Effect
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Initial Data Fetch
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = Number(localStorage.getItem("userId") || "1");
                console.log("Fetching user:", userId);
                const userRes = await apiService.getUser(userId);
                console.log("User fetched:", userRes.data);
                setUser(userRes.data);

                console.log("Fetching lists for user:", userId);
                const listsRes = await apiService.getLists(userId);
                console.log("Lists fetched:", listsRes.data);
                setLists(listsRes.data);

                if (listsRes.data.length > 0) {
                    setActiveListId(listsRes.data[0].id);
                } else {
                    console.warn("No lists found for user", userId);
                }
            } catch (err) {
                console.error("Failed to fetch initial data:", err);
            }
        };
        fetchUserData();
    }, []);

    // Fetch Tasks when Active List changes
    useEffect(() => {
        if (activeListId) {
            const fetchTasks = async () => {
                try {
                    const res = await apiService.getTasks(activeListId);
                    setTasks(res.data);
                } catch (err) {
                    console.error("Failed to fetch tasks", err);
                }
            };
            fetchTasks();
        }
    }, [activeListId]);

    // Task Actions
    const handleToggleTask = async (id: number) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        try {
            const res = await apiService.updateTask(id, { completed: !task.completed });
            setTasks(tasks.map(t => t.id === id ? res.data : t));
        } catch (err) {
            console.error("Failed to toggle task", err);
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            await apiService.deleteTask(id);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            console.error("Failed to delete task", err);
        }
    };

    const handleConfirmAddTask = async () => {
        if (!newTaskTitle.trim()) return;

        try {
            let listIdToUse = activeListId;

            // If no list exists, create a default list automatically
            if (!listIdToUse) {
                const userId = Number(localStorage.getItem("userId") || "1");
                try {
                    console.log("No list found, creating default list 'My Tasks'");
                    const listRes = await apiService.createList({
                        name: "My Tasks",
                        emoji: "✅",
                        owner_id: userId
                    });
                    console.log("Default list created:", listRes.data);
                    setLists(prev => [listRes.data, ...prev]);
                    listIdToUse = listRes.data.id;
                    // Set as active list - this will trigger task fetch via useEffect
                    setActiveListId(listRes.data.id);
                } catch (listErr) {
                    console.error("Failed to create default list:", listErr);
                    alert("Failed to create default list. Make sure the backend is running.");
                    return;
                }
            }

            console.log("Creating task:", { title: newTaskTitle, list_id: listIdToUse });
            const res = await apiService.createTask({
                title: newTaskTitle.trim(),
                priority: 'Medium',
                list_id: listIdToUse
            });
            console.log("Task created successfully:", res.data);
            
            // Add task to current tasks list
            // Note: If we just created a new list, the useEffect will fetch tasks automatically
            // but we add it manually here for immediate UI update
            setTasks(prev => {
                // Avoid duplicates - check if task already exists
                if (prev.some(t => t.id === res.data.id)) {
                    return prev;
                }
                return [res.data, ...prev];
            });
            
            setNewTaskTitle("");
            setIsTaskModalOpen(false);
        } catch (err) {
            console.error("Failed to add task:", err);
            alert("Failed to add task. Make sure the backend is running.");
        }
    };

    const handleFinishAll = async () => {
        if (!activeListId) return;
        try {
            const res = await apiService.finishAllTasks(activeListId);
            setTasks(res.data);
        } catch (err) {
            console.error("Failed to finish all tasks", err);
        }
    };

    const handleSetPriority = async (task: Task, priority: Task['priority']) => {
        try {
            const res = await apiService.updateTask(task.id, { priority });
            setTasks(prev => prev.map(t => t.id === task.id ? res.data : t));
        } catch (err) {
            console.error("Failed to set priority", err);
        }
    };

    // List Actions
    const handleConfirmAddList = async () => {
        if (!newListName.trim()) return;

        try {
            const res = await apiService.createList({
                name: newListName.trim(),
                emoji: newListEmoji || "📋",
                owner_id: Number(localStorage.getItem("userId") || "1")
            });
            setLists(prev => [res.data, ...prev]);
            setActiveListId(res.data.id);
            setNewListName("");
            setNewListEmoji("📋");
            setIsListModalOpen(false);
        } catch (err) {
            console.error("Failed to add list", err);
            alert("Failed to add list. Is the backend running?");
        }
    };

    const handleDeleteList = (id: number) => {
        setListToDeleteId(id);
        setIsDeleteListModalOpen(true);
    };

    const handleConfirmDeleteList = async () => {
        if (listToDeleteId === null) return;
        try {
            await apiService.deleteList(listToDeleteId);
            const newList = lists.filter(l => l.id !== listToDeleteId);
            setLists(newList);
            if (activeListId === listToDeleteId) {
                setActiveListId(newList.length > 0 ? newList[0].id : null);
                if (newList.length === 0) setTasks([]);
            }
            setIsDeleteListModalOpen(false);
            setListToDeleteId(null);
        } catch (err) {
            console.error("Failed to delete list", err);
            alert("Failed to delete list. Is the backend running?");
        }
    };

    return (
        <div className="flex min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-300">
            <Sidebar
                lists={lists}
                activeListId={activeListId}
                setActiveListId={setActiveListId}
                onAddList={() => setIsListModalOpen(true)}
                onDeleteList={handleDeleteList}
                user={user}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                onLogout={onLogout || (() => { })}
            />

            <main className="flex-1 flex flex-col p-4 md:p-6 h-screen overflow-hidden">
                <DashboardHeader user={user} />
                <TaskListComp
                    tasks={tasks}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                    onAddTask={() => setIsTaskModalOpen(true)}
                    onFinishAll={handleFinishAll}
                    onSetPriority={handleSetPriority}
                />
            </main>

            {/* List Creator Modal */}
            <Modal
                isOpen={isListModalOpen}
                onClose={() => setIsListModalOpen(false)}
                title="Create New List"
                onConfirm={handleConfirmAddList}
            >
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest pl-1">List Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Work, Groceries..."
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleConfirmAddList()}
                            autoFocus
                            className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold dark:bg-card"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest pl-1">Icon/Emoji</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newListEmoji}
                                onChange={(e) => setNewListEmoji(e.target.value)}
                                className="w-12 bg-muted/50 border border-border rounded-xl text-center py-2.5 text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-card"
                            />
                            <div className="flex-1 flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                                {["📋", "🔥", "🏀", "🏠", "💻", "🎨"].map(e => (
                                    <button
                                        key={e}
                                        onClick={() => setNewListEmoji(e)}
                                        className={cn(
                                            "w-10 h-10 shrink-0 flex items-center justify-center bg-muted/50 rounded-xl hover:bg-muted transition-all border border-transparent dark:bg-card",
                                            newListEmoji === e && "border-primary bg-primary/5 scale-110"
                                        )}
                                    >
                                        {e}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Task Creator Modal */}
            <Modal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                title="Add New Task"
                onConfirm={handleConfirmAddTask}
                confirmLabel="Add Task"
            >
                <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest pl-1">Task Title</label>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleConfirmAddTask()}
                        autoFocus
                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold dark:bg-card"
                    />
                </div>
            </Modal>

            {/* List Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteListModalOpen}
                onClose={() => {
                    setIsDeleteListModalOpen(false);
                    setListToDeleteId(null);
                }}
                title="Delete List?"
                onConfirm={handleConfirmDeleteList}
                confirmLabel="Delete"
            >
                <div className="space-y-3">
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                        Are you sure you want to delete <span className="font-bold text-foreground">"{lists.find(l => l.id === listToDeleteId)?.name}"</span>?
                    </p>
                    <p className="text-[11px] bg-destructive/10 text-destructive p-3 rounded-xl font-bold border border-destructive/20">
                        ⚠️ This action cannot be undone and all tasks in this list will be permanently lost.
                    </p>
                </div>
            </Modal>
        </div>
    );
}

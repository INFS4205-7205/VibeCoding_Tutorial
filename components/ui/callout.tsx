"use client"

import { cn } from "@/lib/utils"
import { Sparkles, AlertTriangle, Info } from "lucide-react"

interface CalloutProps {
    type?: "default" | "pro-tip" | "warning" | "info"
    title?: string
    children: React.ReactNode
}

export function Callout({ type = "default", title, children }: CalloutProps) {
    return (
        <div
            className={cn(
                "my-6 flex flex-col rounded-lg border px-4 py-4 sm:flex-row sm:gap-3",
                type === "pro-tip" && "border-emerald-500/20 bg-emerald-500/5 text-emerald-900 dark:text-emerald-100",
                type === "warning" && "border-amber-500/20 bg-amber-500/5 text-amber-900 dark:text-amber-100",
                type === "info" && "border-blue-500/20 bg-blue-500/5 text-blue-900 dark:text-blue-100",
                type === "default" && "border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100"
            )}
        >
            <div className="shrink-0 pt-0.5">
                {type === "pro-tip" && <Sparkles className="h-5 w-5 text-emerald-500" />}
                {type === "warning" && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                {type === "info" && <Info className="h-5 w-5 text-blue-500" />}
                {type === "default" && <div className="h-5 w-5 rounded-full bg-zinc-400/20" />}
            </div>
            <div className="flex-1 space-y-1">
                {title && (
                    <p className={cn(
                        "font-semibold leading-tight",
                        type === "pro-tip" && "text-emerald-600 dark:text-emerald-400",
                        type === "warning" && "text-amber-600 dark:text-amber-400",
                        type === "info" && "text-blue-600 dark:text-blue-400"
                    )}>
                        {title}
                    </p>
                )}
                <div className="prose prose-sm max-w-none text-muted-foreground prose-p:leading-normal">
                    {children}
                </div>
            </div>
        </div>
    )
}

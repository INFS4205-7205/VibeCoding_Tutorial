"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string
    language?: string
    filename?: string
}

export function CodeBlock({
    code,
    language = "bash",
    filename,
    className,
    ...props
}: CodeBlockProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    const onCopy = React.useCallback(() => {
        navigator.clipboard.writeText(code)
        setHasCopied(true)
        setTimeout(() => setHasCopied(false), 2000)
    }, [code])

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-xl border bg-zinc-950 dark:bg-zinc-900 text-zinc-50 shadow-sm",
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-2.5">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 font-mono">
                    {filename || (language === "bash" ? "terminal" : language)}
                </span>
            </div>
            <div className="relative group">
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2 h-8 w-8 text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={onCopy}
                >
                    {hasCopied ? (
                        <Check className="h-4 w-4 text-green-500" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy code</span>
                </Button>
                <div className="overflow-x-auto p-4 pt-4 bg-zinc-50 dark:bg-zinc-950">
                    <pre className="text-sm font-mono leading-relaxed text-zinc-800 dark:text-zinc-300">
                        <code className={language}>{code}</code>
                    </pre>
                </div>
            </div>
        </div>
    )
}

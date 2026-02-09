"use client"

import * as React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CollapsibleBlockProps {
    title: string
    children: React.ReactNode
    defaultOpen?: boolean
}

export function CollapsibleBlock({ title, children, defaultOpen = false }: CollapsibleBlockProps) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm my-6">
            <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto font-semibold hover:bg-muted/50 rounded-t-lg rounded-b-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            {isOpen && (
                <div className="p-4 pt-0 border-t bg-muted/20">
                    {children}
                </div>
            )}
        </div>
    )
}

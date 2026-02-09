"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/ui/code-block"
import { Apple, Monitor } from "lucide-react"

interface OsSelectorProps {
    macContent: string
    windowsContent: string
    macLabel?: string
    windowsLabel?: string
}

export function OsSelector({
    macContent,
    windowsContent,
    macLabel = "macOS",
    windowsLabel = "Windows",
}: OsSelectorProps) {
    return (
        <Tabs defaultValue="mac" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mac" className="gap-2">
                    <Apple className="h-4 w-4" />
                    {macLabel}
                </TabsTrigger>
                <TabsTrigger value="windows" className="gap-2">
                    <Monitor className="h-4 w-4" />
                    {windowsLabel}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="mac">
                <CodeBlock code={macContent} />
            </TabsContent>
            <TabsContent value="windows">
                <CodeBlock code={windowsContent} />
            </TabsContent>
        </Tabs>
    )
}

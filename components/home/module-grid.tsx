"use client"

import { motion } from "framer-motion"
import { Rocket, Code, Zap, Plug, Book } from "lucide-react"
import Link from "next/link"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { courseData } from "@/lib/course-content"

const icons = [Rocket, Code, Zap, Plug, Book]

const modules = courseData.map((module, index) => {
    // Fallback descriptions based on module ID or index
    const descriptions = [
        "Orient yourself, see the module map, and choose your favorite agent workspace.",
        "Focus on workspace navigation, safety switches, and running your first agent coding tasks.",
        "Learn context management, parallel threading, environment setup, and diff review mastery.",
        "Build real-world features including APIs, UI components, data visualizations, and testing workflows.",
        "Extend agent capabilities with reusable Skills and connect to live systems via MCP.",
        "Essential documentation, tools, and links for your Coding Agent journey."
    ]

    return {
        title: module.title,
        description: descriptions[index] || "Advanced Coding Agent techniques.",
        icon: icons[index] || Rocket,
        href: `/course/${module.id}/${module.lessons[0].id}`,
        features: module.lessons.slice(0, 3).map(l => l.title),
    }
})

export function ModuleGrid() {
    return (
        <div className="container mx-auto py-24 sm:py-32">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Course Curriculum
                </h2>
                <p className="mt-2 text-lg leading-8 text-muted-foreground">
                    A structured path to becoming a coding agent power user.
                </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none md:grid-cols-2 lg:grid-cols-3">
                {modules.map((module, index) => (
                    <motion.div
                        key={module.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Link href={module.href} className="flex h-full">
                            <Card className="flex h-full w-full flex-col hover:border-primary/50 transition-colors cursor-pointer group">
                                <CardHeader>
                                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                        <module.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">{module.title}</CardTitle>
                                    <CardDescription className="mt-2 text-base">
                                        {module.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto">
                                    <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                                        {module.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

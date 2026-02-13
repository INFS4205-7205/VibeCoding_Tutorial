"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { courseData } from "@/lib/course-content"

export function Sidebar() {
    const pathname = usePathname()

    // Flatten all lessons to a single list to calculate global position
    const allLessons = courseData.flatMap(module =>
        module.lessons.map(lesson => ({
            ...lesson,
            moduleId: module.id,
            href: `/course/${module.id}/${lesson.id}`
        }))
    )

    // Find current lesson index
    const currentIndex = allLessons.findIndex(lesson => lesson.href === pathname)

    // Calculate progress: If on a lesson page, it's (index + 1) / total. 
    // If not (e.g. home), it's 0.
    const totalLessons = allLessons.length
    const progressPercentage = currentIndex >= 0
        ? Math.round(((currentIndex + 1) / totalLessons) * 100)
        : 0

    return (
        <div className="fixed inset-y-0 left-0 z-50 hidden w-72 flex-col border-r bg-background lg:flex">
            <div className="flex h-14 items-center border-b px-6">
                <Link href="/" className="flex items-center font-bold text-lg text-primary">
                    INFS4205/7205 <br></br> Vibe Coding
                </Link>
            </div>
            <div className="px-6 py-6 border-b">
                <h2 className="mb-2 text-sm font-semibold text-foreground">Course Overview</h2>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{progressPercentage}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                        className="h-2 rounded-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
            <div className="flex-1 overflow-auto py-6">
                <nav className="grid items-start px-4 text-sm font-medium">
                    {courseData.map((module) => (
                        <div key={module.id} className="mb-8">
                            <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                                {module.title}
                            </h3>
                            <div className="grid gap-2">
                                {module.lessons.map((lesson) => {
                                    const href = `/course/${module.id}/${lesson.id}`
                                    const isActive = pathname === href

                                    return (
                                        <Link
                                            key={lesson.id}
                                            href={href}
                                            className={cn(
                                                "group flex items-center justify-between rounded-lg border border-transparent px-4 py-3 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                                                isActive
                                                    ? "border-primary/50 bg-primary/5 text-primary"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            <div className="flex flex-col gap-1">
                                                <span className={cn("text-sm font-medium", isActive ? "text-primary" : "text-foreground")}>
                                                    {lesson.title}
                                                </span>

                                            </div>

                                            <div className="flex h-5 w-5 items-center justify-center">
                                                {isActive ? (
                                                    <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(81,36,122,0.5)]" />
                                                ) : (
                                                    <div className="h-2.5 w-2.5 rounded-full border-2 border-muted-foreground/30 group-hover:border-primary/50" />
                                                )}
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    )
}

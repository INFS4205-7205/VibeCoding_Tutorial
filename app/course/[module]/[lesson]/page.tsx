import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import { ChevronRight, ChevronLeft, Download, ExternalLink } from "lucide-react"
import { type ComponentPropsWithoutRef } from "react"

import { courseData } from "@/lib/course-content"
import { CodeBlock } from "@/components/ui/code-block"
import { OsSelector } from "@/components/course/os-selector"
import { Button } from "@/components/ui/button"
import { CollapsibleBlock } from "@/components/ui/collapsible-block"
import { ZoomableImage } from "@/components/ui/zoomable-image"
import { cn } from "@/lib/utils"


import remarkUnwrapImages from "remark-unwrap-images"

// Helper to make hrefs work with GitHub Pages / subdirectory deployment
const repoName = process.env.NEXT_PUBLIC_REPO_NAME || "VibeCoding_Tutorial";
const basePath = `/${repoName}`;

const processHref = (href?: string) => {
    return href?.startsWith("/") && !href.startsWith(basePath)
        ? `${basePath}${href}`
        : href
}

const MarkdownLink = ({ href, title, children }: ComponentPropsWithoutRef<"a">) => {
    if (title === "button-primary") {
        const finalHref = processHref(href)
        return (
            <span className="my-8 flex justify-center sm:justify-start not-prose w-full">
                <Button size="lg" className="text-base px-8 h-12 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold" asChild>
                    <a href={finalHref} target="_blank" rel="noopener noreferrer">
                        {children}
                        <Download className="ml-2 w-4 h-4" />
                    </a>
                </Button>
            </span>
        )
    }
    if (title === "button-soft") {
        const finalHref = processHref(href)
        return (
            <span className="my-4 flex justify-start not-prose w-full">
                <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-6 h-11 font-semibold border-border/70 bg-card/70 hover:bg-card shadow-sm hover:shadow-md transition-all"
                    asChild
                >
                    <a href={finalHref}>
                        {children}
                        <ChevronRight className="ml-2 w-4 h-4 opacity-60" />
                    </a>
                </Button>
            </span>
        )
    }
    if (title === "pill-link") {
        const finalHref = processHref(href)
        return (
            <Button
                size="sm"
                variant="outline"
                className="inline-flex items-center gap-2 rounded-full px-4 h-9 text-sm font-semibold border-border/60 bg-card/60 hover:bg-card/80 shadow-sm"
                asChild
            >
                <a href={finalHref}>
                    {children}
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </a>
            </Button>
        )
    }
    // Default link
    const finalHref = processHref(href)

    return (
        <a href={finalHref} target={finalHref?.startsWith("http") ? "_blank" : undefined} rel={finalHref?.startsWith("http") ? "noopener noreferrer" : undefined}>
            {children}
            {finalHref?.startsWith("http") && <ExternalLink className="inline-block w-3 h-3 ml-1 align-super opacity-50" />}
        </a>
    )
}

const MarkdownImage = ({ src, alt, className }: ComponentPropsWithoutRef<"img">) => {
    const srcString = src as string
    if (!srcString) return null

    const finalSrc = processHref(srcString)

    return (
        <div className="my-10 not-prose">
            <ZoomableImage
                src={finalSrc || ""}
                alt={alt || "Lesson Image"}
                className={cn("w-full shadow-lg rounded-xl border border-border/50 bg-card", className)}
            />
            {alt && <p className="text-center text-sm text-muted-foreground mt-3 italic">{alt}</p>}
        </div>
    )
}


interface LessonPageProps {
    params: {
        module: string
        lesson: string
    }
}

export async function generateStaticParams() {
    const params: { module: string; lesson: string }[] = []
    courseData.forEach((mod) => {
        mod.lessons.forEach((lesson) => {
            params.push({ module: mod.id, lesson: lesson.id })
        })
    })
    return params
}

export default async function LessonPage({ params }: LessonPageProps) {
    // Await params mainly for newer Next.js versions compatibility but here it's static
    const { module: moduleId, lesson: lessonId } = await Promise.resolve(params)

    const courseModule = courseData.find((m) => m.id === moduleId)
    const lesson = courseModule?.lessons.find((l) => l.id === lessonId)

    if (!courseModule || !lesson) {
        notFound()
    }

    // Find prev/next lessons
    const allLessons: { id: string; title: string; href: string }[] = []
    courseData.forEach(m => {
        m.lessons.forEach(l => {
            allLessons.push({
                id: l.id,
                title: l.title,
                href: `/course/${m.id}/${l.id}`
            })
        })
    })

    const currentIndex = allLessons.findIndex(l => l.id === lesson.id)
    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

    // Calculate metadata
    const moduleLessons = courseModule.lessons
    const moduleLessonIndex = moduleLessons.findIndex(l => l.id === lessonId) + 1
    const totalModuleLessons = moduleLessons.length



    return (
        <div className="mx-auto max-w-4xl space-y-12 pb-20 pt-8 px-6">
            {/* Header Section */}
            <div className="space-y-8 text-center sm:text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-center sm:justify-start space-x-2.5 text-sm font-medium text-primary bg-primary/10 w-fit sm:mx-0 mx-auto px-4 py-1.5 rounded-full border border-primary/20">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                    <span>{courseModule.title}</span>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1] bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {lesson.title}
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto sm:mx-0">
                        {lesson.description}
                    </p>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground border-t border-border/40 pt-6">
                    <div className="flex items-center gap-1.5">
                        <span className="h-4 w-4 bg-primary/10 rounded-full flex items-center justify-center text-[10px] font-bold text-primary">{moduleLessonIndex}</span>
                        <span className="font-medium text-foreground">Lesson {moduleLessonIndex} of {totalModuleLessons}</span>
                    </div>

                </div>
            </div>

            {/* Separator equivalent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />

            {/* Content Section */}
            <div className="prose prose-zinc dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight 
                prose-h1:text-4xl prose-h1:border-b prose-h1:pb-4 prose-h1:mb-8
                prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:text-foreground
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-semibold
                prose-p:text-lg prose-p:leading-8 prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:my-6
                prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:text-primary/80 transition-colors
                prose-strong:font-bold prose-strong:text-foreground
                prose-ul:my-6 prose-ul:space-y-2
                prose-li:text-lg prose-li:text-zinc-700 dark:prose-li:text-zinc-300
                prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl prose-pre:p-0 prose-pre:my-8 prose-pre:shadow-lg
                prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-code:font-medium prose-code:text-[0.9em]
                ">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkUnwrapImages]}
                    components={{
                        p: ({ children }: ComponentPropsWithoutRef<"p">) => (
                            <div className="text-lg leading-8 text-zinc-700 dark:text-zinc-300 my-6">
                                {children}
                            </div>
                        ),
                        a: MarkdownLink,
                        // Images
                        img: MarkdownImage,
                        blockquote: ({ children }: ComponentPropsWithoutRef<"blockquote">) => {
                            return (
                                <div className="my-8 border-l-4 border-primary/50 bg-secondary/30 p-6 rounded-r-lg italic text-lg text-muted-foreground relative overflow-hidden">
                                    <span className="absolute top-0 right-0 p-4 text-6xl text-primary/10 font-serif leading-none">”</span>
                                    <div className="relative z-10">{children}</div>
                                </div>
                            )
                        },
                        table: (props: ComponentPropsWithoutRef<"table">) => (
                            <div className="my-10 w-full overflow-y-auto rounded-xl border border-border/50 bg-card shadow-sm">
                                <table className="w-full text-left text-sm" {...props} />
                            </div>
                        ),
                        thead: (props: ComponentPropsWithoutRef<"thead">) => (
                            <thead className="bg-secondary/50 text-secondary-foreground" {...props} />
                        ),
                        tr: (props: ComponentPropsWithoutRef<"tr">) => (
                            <tr className="border-b border-border/50 transition-colors hover:bg-secondary/20" {...props} />
                        ),
                        th: (props: ComponentPropsWithoutRef<"th">) => (
                            <th className="h-14 px-6 text-left align-middle font-semibold text-foreground" {...props} />
                        ),
                        td: (props: ComponentPropsWithoutRef<"td">) => (
                            <td className="p-6 align-middle" {...props} />
                        ),
                        ul: (props: ComponentPropsWithoutRef<"ul">) => (
                            <ul className="my-6 ml-6 list-none space-y-3" {...props} />
                        ),
                        li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
                            <li className="relative pl-7" {...props}>
                                <span className="absolute left-0 top-2.5 h-2 w-2 rounded-full bg-primary/70" />
                                {children}
                            </li>
                        ),
                        hr: (props: ComponentPropsWithoutRef<"hr">) => (
                            <hr className="my-12 border-border" {...props} />
                        ),

                        pre: (props: ComponentPropsWithoutRef<"pre">) => (
                            // @ts-expect-error - Casting pre props to div props to fix hydration error (div inside pre is invalid)
                            <div className="not-prose" {...props} />
                        ),
                        code({ inline, className, children, ...props }: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) {
                            const match = /language-(\w+)/.exec(className || "")
                            const language = match ? match[1] : ""
                            const contentStr = String(children).replace(/\n$/, "")

                            if (!inline && language === "os") {
                                try {
                                    const content = JSON.parse(contentStr)
                                    return (
                                        <div className="my-10">
                                            <OsSelector
                                                macContent={content.mac || ""}
                                                windowsContent={content.windows || ""}
                                            />
                                        </div>
                                    )
                                } catch {
                                    return null
                                }
                            }

                            if (!inline && language === "toggle") {
                                try {
                                    const content = JSON.parse(contentStr)
                                    return (
                                        <CollapsibleBlock title={content.title} defaultOpen={content.defaultOpen}>
                                            <div className="prose prose-zinc dark:prose-invert max-w-none text-sm leading-normal">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm, remarkUnwrapImages]}
                                                    components={{
                                                        img: MarkdownImage,
                                                        a: MarkdownLink
                                                    }}
                                                >
                                                    {content.content}
                                                </ReactMarkdown>
                                            </div>
                                        </CollapsibleBlock>
                                    )
                                } catch {
                                    return <code className={className} {...props}>{children}</code>
                                }
                            }

                            if (!inline && language === "highlight") {
                                try {
                                    const content = JSON.parse(contentStr)
                                    return (
                                        <div className={cn(
                                            "my-8 p-6 rounded-xl border-l-4 shadow-sm",
                                            content.type === "tip" ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500" :
                                                content.type === "warning" ? "bg-amber-50 dark:bg-amber-950/30 border-amber-500" :
                                                    "bg-blue-50 dark:bg-blue-950/30 border-blue-500"
                                        )}>
                                            <h4 className={cn(
                                                "text-base font-bold mb-2 flex items-center gap-2",
                                                content.type === "tip" ? "text-emerald-700 dark:text-emerald-400" :
                                                    content.type === "warning" ? "text-amber-700 dark:text-amber-400" :
                                                        "text-blue-700 dark:text-blue-400"
                                            )}>
                                                {content.title || "Note"}
                                            </h4>
                                            <div className="text-foreground/90 prose-sm">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {content.content}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    )
                                } catch {
                                    return <code className={className} {...props}>{children}</code>
                                }
                            }

                            if (!inline && language === "video") {
                                try {
                                    const content = JSON.parse(contentStr)
                                    const videoSrc = processHref(content.src)
                                    return (
                                        <div className="my-10 not-prose">
                                            <video
                                                src={videoSrc}
                                                controls={content.controls !== false}
                                                className="w-full rounded-xl shadow-lg border border-border/50 bg-black"
                                            />
                                            {content.caption && (
                                                <p className="text-center text-sm text-muted-foreground mt-3 italic">
                                                    {content.caption}
                                                </p>
                                            )}
                                        </div>
                                    )
                                } catch {
                                    return <code className={className} {...props} >{children}</code>
                                }
                            }

                            return !inline && match ? (
                                <CodeBlock
                                    language={language}
                                    code={contentStr}
                                    // Use a simpler check for filename or language based filename mapping
                                    filename={language === "json" ? "antigravity.config.json" : (language === "ts" || language === "typescript" ? "index.ts" : undefined)}
                                    className="my-10 shadow-xl border-zinc-200 dark:border-zinc-800 rounded-xl"
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                >
                    {lesson.content}
                </ReactMarkdown>
            </div>

            {/* Footer Navigation */}
            <div className="mt-16 flex items-center justify-between border-t pt-8">
                {
                    prevLesson ? (
                        <Button variant="outline" className="group h-11 px-4" asChild>
                            <Link href={prevLesson.href}>
                                <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Previous Lesson
                            </Link>
                        </Button>
                    ) : <div />
                }



                {
                    nextLesson ? (
                        <Button variant="outline" className="group h-11 px-4" asChild>
                            <Link href={nextLesson.href}>
                                Next Lesson
                                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    ) : <div />
                }
            </div>
        </div>
    )
}

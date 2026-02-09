import { Sidebar } from "@/components/layout/sidebar"
import { CourseHeader } from "@/components/course/course-header"

export default function CourseLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Sidebar />
            <main className="flex-1 lg:pl-72">
                <CourseHeader />
                <div className="container mx-auto max-w-5xl py-8 px-6 lg:px-12">
                    {children}
                </div>
            </main>
        </div>
    )
}

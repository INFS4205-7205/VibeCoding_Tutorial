import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/home/hero-section"
import { ModuleGrid } from "@/components/home/module-grid"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ModuleGrid />
      </main>
      <footer className="py-6 md:px-8 md:py-0 w-full">
        <div className="container flex flex-col items-center justify-center gap-2 md:h-24 px-4 text-center">
          <p className="text-sm leading-loose text-muted-foreground break-words w-full max-w-screen-lg">
            Team: <span className="font-bold text-foreground">Danny Wang</span><sup>*</sup>, Yadan Luo<sup>†</sup>, Zhuoxiao Chen, Yan Jiang, Xiangyu Sun, Xuwei Xu, Fengyi Zhang, Zhizhen Zhang.
          </p>
          <p className="text-xs text-muted-foreground">
            * Author, † Coordinator.
          </p>
        </div>
      </footer>
    </div>
  )
}

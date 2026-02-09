"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

interface ZoomableImageProps {
    alt: string
    src: string
    className?: string
}

export function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const uniqueId = React.useId()

    // Lock body scroll when open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <>
            <motion.div
                layoutId={`image-container-${uniqueId}`}
                className={cn(
                    "relative group cursor-zoom-in rounded-xl overflow-hidden border border-border/50 shadow-sm transition-all hover:shadow-md",
                    className
                )}
                onClick={() => setIsOpen(true)}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-black/50 text-white rounded-full p-2 backdrop-blur-sm">
                        <ZoomIn className="w-5 h-5" />
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 cursor-zoom-out"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            layoutId={`image-container-${uniqueId}`}
                            className="relative cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute -top-4 -right-4 md:-right-12 md:top-0 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-zinc-800/80 rounded-full transition-colors z-50 backdrop-blur-md border border-white/10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <Image
                                src={src}
                                alt={alt}
                                width={1600}
                                height={1200}
                                className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain drop-shadow-2xl rounded-lg"
                            />
                            <div className="absolute -bottom-10 left-0 right-0 text-center text-white/90 text-sm font-medium px-4 pointer-events-none">
                                {alt}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

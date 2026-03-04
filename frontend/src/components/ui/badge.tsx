import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" | "glow" | "secondary" }
>(({ className, variant = "default", ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
                variant === "default" && "bg-zinc-100 text-zinc-900 border border-zinc-200",
                variant === "outline" && "border border-zinc-800 text-zinc-400 bg-transparent",
                variant === "glow" && "bg-zinc-100 text-zinc-900 border border-zinc-200 shadow-sm shadow-zinc-200/20",
                variant === "secondary" && "border border-zinc-800 bg-zinc-900 text-zinc-300",
                className
            )}
            {...props}
        />
    )
})
Badge.displayName = "Badge"

export { Badge }

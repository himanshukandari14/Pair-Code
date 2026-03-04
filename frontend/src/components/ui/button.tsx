import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    "bg-zinc-50 text-zinc-900 shadow hover:bg-zinc-200",
                destructive:
                    "bg-red-500 text-zinc-50 hover:bg-red-500/90",
                outline:
                    "border border-zinc-800 bg-transparent text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50",
                secondary:
                    "bg-zinc-900 text-zinc-100 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700",
                ghost:
                    "hover:bg-zinc-900 hover:text-zinc-50",
                link:
                    "text-zinc-50 underline-offset-4 hover:underline",
                glow:
                    "bg-zinc-50 text-zinc-900 shadow hover:bg-zinc-200",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8 text-base",
                xl: "h-12 rounded-lg px-10 text-lg",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

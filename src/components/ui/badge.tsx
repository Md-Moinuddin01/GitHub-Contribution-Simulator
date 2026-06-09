import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30",
      blue: "bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/30",
      purple: "bg-purple-500/15 text-purple-300 ring-1 ring-purple-500/30",
      zinc: "bg-zinc-800 text-zinc-300 ring-1 ring-zinc-700",
      warning: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30",
      danger: "bg-red-500/15 text-red-300 ring-1 ring-red-500/30",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

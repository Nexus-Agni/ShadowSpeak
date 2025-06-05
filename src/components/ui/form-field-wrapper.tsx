import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FormFieldWrapperProps {
  children: ReactNode
  className?: string
  icon?: ReactNode
  label?: string
}

export function FormFieldWrapper({ children, className, icon, label }: FormFieldWrapperProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-gray-300 font-medium flex items-center gap-2 text-sm">
          {icon}
          {label}
        </label>
      )}
      <div className="relative group">
        {children}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  )
}

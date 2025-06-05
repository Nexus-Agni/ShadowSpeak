import { User } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  user?: {
    username?: string
    email?: string
    image?: string
  }
  size?: "sm" | "md" | "lg"
  className?: string
}

export function UserAvatar({ user, size = "md", className }: UserAvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  }

  const getInitials = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase()
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return "U"
  }

  return (
    <div
      className={cn(
        "bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold",
        sizeClasses[size],
        className,
      )}
    >
      {user?.image ? (
        <img
          src={user.image || "/placeholder.svg"}
          alt="User avatar"
          className="w-full h-full rounded-full object-cover"
        />
      ) : user ? (
        <span className={size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm"}>{getInitials()}</span>
      ) : (
        <User className={iconSizes[size]} />
      )}
    </div>
  )
}

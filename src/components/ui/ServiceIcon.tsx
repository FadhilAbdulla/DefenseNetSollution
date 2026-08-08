import {
  Radar,
  Crosshair,
  ShieldAlert,
  Cloud,
  Activity,
  Scale,
  Brain,
  BadgeCheck,
  FileText,
  Coins,
  Users,
  Globe,
  type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  radar: Radar,
  crosshair: Crosshair,
  "shield-alert": ShieldAlert,
  cloud: Cloud,
  activity: Activity,
  scale: Scale,
  brain: Brain,
  badge: BadgeCheck,
  file: FileText,
  coins: Coins,
  users: Users,
  globe: Globe,
};

export function ServiceIcon({
  name,
  size = 20,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = registry[name] ?? Radar;
  return <Icon size={size} className={className} aria-hidden />;
}

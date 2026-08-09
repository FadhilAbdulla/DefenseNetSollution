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
  Landmark,
  HeartPulse,
  Building2,
  Code2,
  Factory,
  GraduationCap,
  ShoppingCart,
  Truck,
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
  // Industries
  landmark: Landmark,
  "heart-pulse": HeartPulse,
  building: Building2,
  code: Code2,
  factory: Factory,
  "graduation-cap": GraduationCap,
  "shopping-cart": ShoppingCart,
  truck: Truck,
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

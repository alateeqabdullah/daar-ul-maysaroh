"use client";

import { NavItem } from "./nav-item";

interface NavSectionProps {
  section: {
    title: string;
    items: Array<{
      name: string;
      href: string;
      icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
      badge?: string;
      description?: string;
    }>;
  };
  currentPath: string;
  onNavigate: (href: string) => void;
}

export function NavSection({
  section,
  currentPath,
  onNavigate,
}: NavSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="px-3 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
        {section.title}
      </h3>
      <div className="space-y-1">
        {section.items.map((item) => {
          const isActive =
            currentPath === item.href ||
            currentPath?.startsWith(`${item.href}/`);

          return (
            <NavItem
              key={item.name}
              item={item}
              isActive={isActive}
              onClick={() => onNavigate(item.href)}
            />
          );
        })}
      </div>
    </div>
  );
}

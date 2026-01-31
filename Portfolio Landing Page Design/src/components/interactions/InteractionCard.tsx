import { cn } from "../../components/ui/utils";

interface InteractionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  footerText?: string;
  children: React.ReactNode;
}

export function InteractionCard({ 
  title, 
  subtitle, 
  footerText = "Click to interact", 
  children,
  className,
  ...props 
}: InteractionCardProps) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-[#0a0a0a] rounded-xl p-4 shadow-sm border border-border/50 flex flex-col items-center gap-3 w-55 select-none cursor-pointer transition-transform active:scale-[0.98]",
        className
      )}
      {...props}
    >
      <div className="w-full text-center">
        <h3 className="text-sm font-semibold text-foreground m-0">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground hidden">{subtitle}</p>}
      </div>

      <div className="relative">
        {children}
      </div>

      <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mt-1">
        {footerText}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
};

/**
 * Brand wordmark matching the logo: "Insight" neutral + "Exus" in brand color.
 */
export default function BrandMark({ className }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "font-display font-semibold tracking-tight leading-none text-base sm:text-lg",
        className
      )}
      aria-label="InsightExus"
    >
      <span className="text-foreground">Insight</span>
      <span className="text-primary">Exus</span>
    </span>
  );
}

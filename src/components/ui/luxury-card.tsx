import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface LuxuryCardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
  animation?: "fade" | "slide" | "scale";
}

const LuxuryCard = React.forwardRef<HTMLDivElement, LuxuryCardProps>(
  ({ className, hover = true, animation, ...props }, ref) => {
    const getAnimationVariants = () => {
      switch (animation) {
        case "fade":
          return {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          };
        case "slide":
          return {
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          };
        case "scale":
          return {
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
          };
        default:
          return {};
      }
    };

    return (
      <motion.div
        ref={ref}
        initial={animation ? "hidden" : false}
        animate={animation ? "visible" : false}
        variants={getAnimationVariants()}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "bg-white/80 backdrop-blur-sm border border-luxury-200/20 rounded-xl shadow-lg",
          hover && "hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
          className
        )}
        {...props}
      />
    );
  }
);
LuxuryCard.displayName = "LuxuryCard";

const LuxuryCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
LuxuryCardHeader.displayName = "LuxuryCardHeader";

const LuxuryCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-luxury-700",
      className
    )}
    {...props}
  />
));
LuxuryCardTitle.displayName = "LuxuryCardTitle";

const LuxuryCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-luxury-600/90", className)}
    {...props}
  />
));
LuxuryCardDescription.displayName = "LuxuryCardDescription";

const LuxuryCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
LuxuryCardContent.displayName = "LuxuryCardContent";

const LuxuryCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
LuxuryCardFooter.displayName = "LuxuryCardFooter";

export {
  LuxuryCard,
  LuxuryCardHeader,
  LuxuryCardFooter,
  LuxuryCardTitle,
  LuxuryCardDescription,
  LuxuryCardContent,
};
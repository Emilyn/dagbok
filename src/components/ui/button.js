import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const buttonVariants = cva('inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium font-sans transition-all duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-95', {
    variants: {
        variant: {
            default: 'bg-accent text-white hover:bg-accent-light shadow-md shadow-accent/20',
            ghost: 'text-ink-500 hover:bg-ink-100 hover:text-ink-DEFAULT',
            outline: 'border border-ink-200 text-ink-500 hover:bg-ink-100 hover:text-ink-DEFAULT',
            destructive: 'bg-sev-severe/10 text-sev-severe hover:bg-sev-severe/20 border border-sev-severe/30',
            link: 'text-accent underline-offset-4 hover:underline',
        },
        size: {
            default: 'h-10 px-5 py-2',
            sm: 'h-8 px-3 text-xs',
            lg: 'h-12 px-8 text-base',
            icon: 'h-10 w-10',
        },
    },
    defaultVariants: { variant: 'default', size: 'default' },
});
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return _jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref: ref, ...props });
});
Button.displayName = 'Button';
export { Button, buttonVariants };

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className="h-4 w-4 rounded-md border border-primary bg-background data-[state=checked]:bg-primary"
    {...props}
  />
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
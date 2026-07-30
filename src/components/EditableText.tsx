import { ElementType, FocusEvent, KeyboardEvent, useRef, useLayoutEffect, useEffect } from "react";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  isEditMode: boolean;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
}

const EditableText = ({
  value,
  onChange,
  isEditMode,
  as: Tag = "span",
  className,
  multiline = false,
}: EditableTextProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const focused = useRef(false);

  // Set initial content synchronously (no flash on mount)
  useLayoutEffect(() => {
    if (ref.current) ref.current.textContent = value;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update DOM when value (language switch) or isEditMode changes.
  // Needed because toggling edit mode switches between React-children and ref-managed DOM,
  // so React removes the text node on entry — this restores it.
  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el || focused.current) return;
    if (el.textContent !== value) el.textContent = value;
  }, [value, isEditMode]);

  if (!isEditMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => { focused.current = true; }}
      onBlur={(e: FocusEvent<HTMLElement>) => {
        focused.current = false;
        const next = e.currentTarget.textContent ?? "";
        if (next !== value) onChange(next);
      }}
      onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      className={cn(
        className,
        "cursor-text rounded outline-dashed outline-2 outline-offset-2 outline-primary/40 hover:outline-primary focus:outline-primary focus:bg-primary/5 transition-colors"
      )}
    />
  );
};

export default EditableText;

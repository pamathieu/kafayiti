import { ElementType, FocusEvent, KeyboardEvent } from "react";
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
  if (!isEditMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    const next = e.currentTarget.textContent ?? "";
    if (next !== value) onChange(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(
        className,
        "cursor-text rounded outline-dashed outline-2 outline-offset-2 outline-primary/40 hover:outline-primary focus:outline-primary focus:bg-primary/5 transition-colors"
      )}
    >
      {value}
    </Tag>
  );
};

export default EditableText;

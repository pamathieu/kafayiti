import { Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditModeFabProps {
  isEditMode: boolean;
  onToggle: () => void;
}

const EditModeFab = ({ isEditMode, onToggle }: EditModeFabProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isEditMode}
      aria-label={isEditMode ? "Exit edit mode" : "Enter edit mode"}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
        isEditMode && "ring-4 ring-secondary"
      )}
    >
      {isEditMode ? <X className="h-6 w-6" /> : <Pencil className="h-6 w-6" />}
    </button>
  );
};

export default EditModeFab;

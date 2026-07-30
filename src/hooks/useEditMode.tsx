import { createContext, useContext, useState, ReactNode } from "react";

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
}

const SESSION_KEY = "kafa_edit_mode";

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    try { return sessionStorage.getItem(SESSION_KEY) === "1"; } catch { return false; }
  });

  const toggleEditMode = () => {
    setIsEditMode((prev) => {
      const next = !prev;
      try {
        if (next) sessionStorage.setItem(SESSION_KEY, "1");
        else sessionStorage.removeItem(SESSION_KEY);
      } catch { /* ignore */ }
      return next;
    });
  };

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be used within EditModeProvider");
  return ctx;
};

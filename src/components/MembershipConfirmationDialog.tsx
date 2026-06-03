import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MembershipConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fullName: string;
  commune: string;
}

const MembershipConfirmationDialog = ({
  open,
  onOpenChange,
  fullName,
  commune,
}: MembershipConfirmationDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl text-center">
            {t('confirmation.title')} 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {t('confirmation.subtitle')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted-foreground">{t('confirmation.fullName')}</span>
              <span className="font-medium text-foreground">{fullName}</span>
            </div>
            {commune && (
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">{t('confirmation.commune')}</span>
                <span className="font-medium text-foreground">{commune}</span>
              </div>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => onOpenChange(false)}
        >
          {t('confirmation.close')}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipConfirmationDialog;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MembershipConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberNumber: string;
  fullName: string;
  commune: string;
}

const MembershipConfirmationDialog = ({
  open,
  onOpenChange,
  memberNumber,
  fullName,
  commune,
}: MembershipConfirmationDialogProps) => {
  const { toast } = useToast();

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(memberNumber);
    toast({
      title: "Nimewo kopye!",
      description: "Nimewo manb ou kopye nan clipboard.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl text-center">
            Felisitasyon! 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Ou enskri kòm manb KAFA avèk siksè!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Nimewo Manb KAFA ou:
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-primary tracking-wide break-all">
                    {memberNumber}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyNumber}
                    className="h-8 w-8 shrink-0"
                    title="Kopye nimewo"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Tanpri konsève nimewo sa a pou referans ou.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted-foreground">Non Konplè:</span>
              <span className="font-medium text-foreground">{fullName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted-foreground">Komin:</span>
              <span className="font-medium text-foreground">{commune}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Fèmen
          </Button>
          <Button
            className="flex-1"
            onClick={handleCopyNumber}
          >
            <Copy className="mr-2 h-4 w-4" />
            Kopye Nimewo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipConfirmationDialog;

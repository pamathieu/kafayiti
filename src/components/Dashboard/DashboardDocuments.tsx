import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentData } from "@/hooks/useMemberData";

interface DashboardDocumentsProps {
  documents: DocumentData[];
  isLoading: boolean;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
          <CheckCircle className="h-3 w-3 mr-1" />
          Apwouve
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30">
          <Clock className="h-3 w-3 mr-1" />
          An atant
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-500/20 text-red-700 border-red-500/30">
          <XCircle className="h-3 w-3 mr-1" />
          Rejte
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const DashboardDocuments = ({ documents, isLoading }: DashboardDocumentsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-HT", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-primary" />
          Dokiman Mwen
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Ap chaje dokiman...
          </div>
        ) : documents.length > 0 ? (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-primary/10 p-2 rounded">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{doc.document_name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {doc.document_type} • {formatDate(doc.uploaded_at)}
                    </div>
                    {doc.notes && (
                      <div className="text-xs text-muted-foreground mt-1 italic">
                        {doc.notes}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  {getStatusBadge(doc.status)}
                  {doc.document_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-primary hover:text-primary"
                    >
                      <a href={doc.document_url} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Pa gen dokiman ankò</p>
            <p className="text-xs text-muted-foreground mt-1">
              Dokiman ou yo ap parèt la a lè administratè KAFA ajoute yo
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

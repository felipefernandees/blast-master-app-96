import { SendJob } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Send } from "lucide-react";

interface ActionFooterProps {
  lastJob?: SendJob;
  onSendNow: () => void;
  onSchedule: () => void;
  isValid: boolean;
  selectedGroupsCount: number;
  totalContacts: number;
}

export function ActionFooter({
  lastJob,
  onSendNow,
  onSchedule,
  isValid,
  selectedGroupsCount,
  totalContacts,
}: ActionFooterProps) {
  const getStatusColor = (status: SendJob['status']) => {
    switch (status) {
      case 'running':
        return 'bg-warning';
      case 'done':
        return 'bg-success';
      case 'failed':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = (status: SendJob['status']) => {
    switch (status) {
      case 'queued':
        return 'Na fila';
      case 'running':
        return 'Enviando';
      case 'done':
        return 'Concluído';
      case 'failed':
        return 'Falhou';
      default:
        return status;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-header border-t border-border shadow-header z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Status do Último Job */}
          <div className="flex-1 min-w-0">
            {lastJob ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(lastJob.status)}`} />
                  <span className="text-sm font-medium text-foreground">
                    {getStatusText(lastJob.status)}
                  </span>
                  {lastJob.status === 'running' && (
                    <Badge variant="outline" className="text-xs">
                      {lastJob.progress}%
                    </Badge>
                  )}
                </div>
                
                {lastJob.status === 'running' && (
                  <Progress value={lastJob.progress} className="w-full max-w-md" />
                )}
                
                {(lastJob.status === 'done' || lastJob.status === 'failed') && (
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Enviados: {lastJob.sentCount || 0}</span>
                    {(lastJob.failedCount || 0) > 0 && (
                      <span>Falhas: {lastJob.failedCount}</span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Nenhum disparo realizado ainda
              </div>
            )}
          </div>

          {/* Estatísticas e Ações */}
          <div className="flex items-center gap-4">
            {/* Estatísticas */}
            <div className="hidden sm:flex items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="outline">
                {selectedGroupsCount} grupos
              </Badge>
              <Badge variant="outline">
                {totalContacts} contatos
              </Badge>
            </div>

            {/* Botões de Ação */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={onSchedule}
                disabled={!isValid}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Agendar
              </Button>

              <Button
                onClick={onSendNow}
                disabled={!isValid}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Send className="w-4 h-4 mr-2" />
                Disparar Agora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
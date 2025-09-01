import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { SendJob } from "@/types";
import { Eye, Calendar, Clock, X, MessageSquare, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DisparosModalProps {
  children: React.ReactNode;
}

// Mock data para demonstração
const mockDisparos: SendJob[] = [
  {
    id: '1',
    groups: [
      { id: '1', name: 'Equipe de Desenvolvimento', participantsCount: 12 },
      { id: '2', name: 'Marketing e Vendas', participantsCount: 8 }
    ],
    payload: {
      title: 'Reunião de alinhamento',
      type: 'texto',
      text: 'Pessoal, teremos reunião amanhã às 14h para alinhamento dos projetos.',
      useFirstName: true,
      mentionAll: false
    },
    status: 'done',
    progress: 100,
    sentCount: 20,
    failedCount: 0
  },
  {
    id: '2',
    groups: [
      { id: '3', name: 'Suporte ao Cliente', participantsCount: 15 }
    ],
    payload: {
      title: 'Promoção especial',
      type: 'foto',
      text: 'Confira nossa promoção especial válida até sexta-feira!',
      mediaUrl: '/placeholder-image.jpg',
      useFirstName: false,
      mentionAll: true
    },
    scheduleAt: '2024-12-15T10:00:00Z',
    status: 'queued',
    progress: 0
  },
  {
    id: '3',
    groups: [
      { id: '4', name: 'Diretoria', participantsCount: 5 }
    ],
    payload: {
      title: 'Relatório mensal',
      type: 'arquivo',
      text: 'Segue o relatório mensal de performance.',
      mediaUrl: '/relatorio.pdf',
      useFirstName: true,
      mentionAll: false
    },
    status: 'running',
    progress: 65,
    sentCount: 3,
    failedCount: 0
  }
];

export function DisparosModal({ children }: DisparosModalProps) {
  const [open, setOpen] = useState(false);
  const [disparos, setDisparos] = useState<SendJob[]>(mockDisparos);
  const { toast } = useToast();

  const getStatusColor = (status: SendJob['status']) => {
    switch (status) {
      case 'running':
        return 'bg-warning text-warning-foreground';
      case 'done':
        return 'bg-success text-success-foreground';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      case 'queued':
        return 'bg-info text-info-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: SendJob['status']) => {
    switch (status) {
      case 'queued':
        return 'Agendado';
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

  const handleCancelDisparo = (id: string) => {
    setDisparos(prev => prev.filter(d => d.id !== id));
    toast({
      title: "Disparo cancelado",
      description: "O disparo agendado foi cancelado com sucesso.",
    });
  };

  const getTotalContacts = (groups: SendJob['groups']) => {
    return groups.reduce((sum, group) => sum + group.participantsCount, 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            Histórico de Disparos
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            {disparos.map((disparo) => (
              <Card key={disparo.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{disparo.payload.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(disparo.status)}>
                        {getStatusText(disparo.status)}
                      </Badge>
                      {disparo.status === 'queued' && disparo.scheduleAt && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <X className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancelar Disparo Agendado</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja cancelar este disparo? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Não, manter</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleCancelDisparo(disparo.id)}>
                                Sim, cancelar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Informações da Mensagem */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">MENSAGEM</h4>
                      <div className="space-y-1">
                        <p className="text-sm"><strong>Tipo:</strong> {disparo.payload.type}</p>
                        {disparo.payload.text && (
                          <p className="text-xs text-muted-foreground line-clamp-2">"{disparo.payload.text}"</p>
                        )}
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {disparo.payload.useFirstName ? 'Com nome' : 'Sem nome'} • 
                            {disparo.payload.mentionAll ? ' Mencionar todos' : ' Sem menção'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Grupos e Contatos */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">DESTINATÁRIOS</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{getTotalContacts(disparo.groups)} contatos</span>
                        </div>
                        <div className="space-y-1">
                          {disparo.groups.map((group, index) => (
                            <div key={group.id} className="text-xs text-muted-foreground">
                              • {group.name} ({group.participantsCount})
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Status e Progresso */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">STATUS</h4>
                      <div className="space-y-2">
                        {disparo.scheduleAt && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {formatDate(disparo.scheduleAt)}
                            </span>
                          </div>
                        )}
                        
                        {disparo.status === 'running' && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progresso</span>
                              <span>{disparo.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all" 
                                style={{ width: `${disparo.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        
                        {(disparo.status === 'done' || disparo.status === 'failed') && (
                          <div className="text-xs space-y-1">
                            <div>✅ Enviados: {disparo.sentCount || 0}</div>
                            {(disparo.failedCount || 0) > 0 && (
                              <div>❌ Falhas: {disparo.failedCount}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {disparos.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum disparo encontrado</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
import { useState, useMemo } from "react";
import { MessagePayload, Group, SendJob, ConnectionStatus } from "@/types";
import { MessageCard } from "@/components/MessageCard";
import { GroupsCard } from "@/components/GroupsCard";
import { ActionFooter } from "@/components/ActionFooter";
import { DisparosModal } from "@/components/DisparosModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye } from "lucide-react";

// Mock data para demonstração
const mockGroups: Group[] = [
  { id: '1', name: 'Equipe de Desenvolvimento', participantsCount: 12 },
  { id: '2', name: 'Marketing e Vendas', participantsCount: 8 },
  { id: '3', name: 'Suporte ao Cliente', participantsCount: 15 },
  { id: '4', name: 'Diretoria', participantsCount: 5 },
  { id: '5', name: 'RH e Gestão de Pessoas', participantsCount: 7 },
  { id: '6', name: 'Financeiro', participantsCount: 4 },
];

const Index = () => {
  const { toast } = useToast();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('online');
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [message, setMessage] = useState<MessagePayload>({
    title: '',
    type: 'texto',
    text: '',
    useFirstName: false,
    mentionAll: false,
  });
  const [lastJob, setLastJob] = useState<SendJob>();
  const [isLoading, setIsLoading] = useState(false);

  // Validações
  const isMessageValid = useMemo(() => {
    if (!message.title) return false;
    if (message.type === 'texto' && !message.text?.trim()) return false;
    if (message.type !== 'texto' && !message.mediaUrl) return false;
    return selectedGroups.length > 0;
  }, [message, selectedGroups]);

  const totalContacts = useMemo(() => {
    return groups
      .filter(group => selectedGroups.includes(group.id))
      .reduce((sum, group) => sum + group.participantsCount, 0);
  }, [groups, selectedGroups]);

  // Handlers
  const handleRefreshGroups = async () => {
    setIsLoading(true);
    try {
      // Simular chamada API GET /api/groups
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Grupos atualizados",
        description: "Lista de grupos foi atualizada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar grupos",
        description: "Não foi possível atualizar a lista de grupos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendNow = async () => {
    if (!isMessageValid) {
      toast({
        title: "Mensagem incompleta",
        description: "Preencha todos os campos obrigatórios e selecione ao menos um grupo.",
        variant: "destructive",
      });
      return;
    }

    try {
      const selectedGroupsData = groups.filter(g => selectedGroups.includes(g.id));
      const newJob: SendJob = {
        id: Date.now().toString(),
        groups: selectedGroupsData,
        payload: message,
        status: 'running',
        progress: 0,
      };

      setLastJob(newJob);
      
      // Simular progresso do envio
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setLastJob(prev => prev ? { ...prev, progress } : prev);
      }

      setLastJob(prev => prev ? {
        ...prev,
        status: 'done',
        sentCount: totalContacts,
        failedCount: 0,
      } : prev);

      toast({
        title: "Disparo concluído",
        description: `Mensagem enviada para ${totalContacts} contatos em ${selectedGroups.length} grupos.`,
      });
    } catch (error) {
      setLastJob(prev => prev ? { ...prev, status: 'failed' } : prev);
      toast({
        title: "Erro no disparo",
        description: "Falha ao enviar mensagem. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleSchedule = () => {
    if (!isMessageValid) {
      toast({
        title: "Mensagem incompleta",
        description: "Preencha todos os campos obrigatórios e selecione ao menos um grupo.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Agendar disparo",
      description: "Modal de agendamento será implementado em breve.",
    });
  };

  const handlePreview = () => {
    toast({
      title: "Prévia da mensagem",
      description: "Modal de prévia será implementado em breve.",
    });
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Salvar template",
      description: "Modal para salvar template será implementado em breve.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard de Disparo</h1>
            <p className="text-muted-foreground">Gerencie e envie mensagens para seus grupos de WhatsApp</p>
          </div>
          <DisparosModal>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Ver Disparos
            </Button>
          </DisparosModal>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Coluna da Esquerda - Mensagem */}
          <div className="space-y-6">
            <MessageCard
              message={message}
              onChange={setMessage}
              onSendNow={handleSendNow}
              onSchedule={handleSchedule}
              onPreview={handlePreview}
              onSaveTemplate={handleSaveTemplate}
              isValid={isMessageValid}
            />
          </div>

          {/* Coluna da Direita - Grupos */}
          <div className="space-y-6">
            <GroupsCard
              groups={groups}
              selectedGroups={selectedGroups}
              onGroupSelectionChange={setSelectedGroups}
              onRefreshGroups={handleRefreshGroups}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      {/* Footer de Ações */}
      <ActionFooter
        lastJob={lastJob}
        onSendNow={handleSendNow}
        onSchedule={handleSchedule}
        isValid={isMessageValid}
        selectedGroupsCount={selectedGroups.length}
        totalContacts={totalContacts}
      />
    </div>
  );
};

export default Index;

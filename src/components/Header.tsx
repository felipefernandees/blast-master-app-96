import { User } from "lucide-react";
import { ConnectionStatus } from "@/types";

interface HeaderProps {
  connectionStatus: ConnectionStatus;
}

export function Header({ connectionStatus }: HeaderProps) {
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'online':
        return 'bg-status-online';
      case 'connecting':
        return 'bg-warning';
      default:
        return 'bg-status-offline';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'online':
        return 'Online';
      case 'connecting':
        return 'Conectando...';
      default:
        return 'Offline';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-header border-b border-border shadow-header">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e Título */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img 
                src="/lovable-uploads/fd066860-7c2e-4df9-ab27-2254517d3633.png" 
                alt="Doce Vaidade Logo" 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  // Fallback para o ícone anterior se a imagem não carregar
                  e.currentTarget.outerHTML = '<div class="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center"><span class="text-primary-foreground font-bold text-sm">D</span></div>';
                }}
              />
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              Doce Vaidade • <span className="font-normal text-muted-foreground">Dashboard</span>
            </h1>
          </div>

          {/* Status e Usuário */}
          <div className="flex items-center space-x-4">
            {/* Status de Conexão */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-card rounded-lg border">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${
                connectionStatus === 'connecting' ? 'animate-pulse-dot' : ''
              }`} />
              <span className="text-sm font-medium text-foreground">
                {getStatusText()}
              </span>
            </div>

            {/* Ícone do Usuário */}
            <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
              <User className="w-4 h-4 text-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
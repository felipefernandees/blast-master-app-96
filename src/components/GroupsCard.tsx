import { useState, useMemo } from "react";
import { Group } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, RefreshCw, Users } from "lucide-react";

interface GroupsCardProps {
  groups: Group[];
  selectedGroups: string[];
  onGroupSelectionChange: (groupIds: string[]) => void;
  onRefreshGroups: () => void;
  isLoading?: boolean;
}

export function GroupsCard({
  groups,
  selectedGroups,
  onGroupSelectionChange,
  onRefreshGroups,
  isLoading = false,
}: GroupsCardProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = useMemo(() => {
    if (!searchTerm) return groups;
    return groups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [groups, searchTerm]);

  const totalContacts = useMemo(() => {
    return groups
      .filter(group => selectedGroups.includes(group.id))
      .reduce((sum, group) => sum + group.participantsCount, 0);
  }, [groups, selectedGroups]);

  const handleGroupToggle = (groupId: string) => {
    const newSelection = selectedGroups.includes(groupId)
      ? selectedGroups.filter(id => id !== groupId)
      : [...selectedGroups, groupId];
    onGroupSelectionChange(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedGroups.length === filteredGroups.length) {
      onGroupSelectionChange([]);
    } else {
      onGroupSelectionChange(filteredGroups.map(group => group.id));
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-card-hover transition-all animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Grupos para Envio</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Busca e Ações */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar grupos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onRefreshGroups}
              disabled={isLoading}
              className="flex-1"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar Grupos
            </Button>
            
            <Button
              variant="outline"
              onClick={handleSelectAll}
              className="flex-1"
            >
              {selectedGroups.length === filteredGroups.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
            </Button>
          </div>
        </div>

        {/* Lista de Grupos */}
        <div className="border border-border rounded-lg">
          <ScrollArea className="h-[400px]">
            <div className="p-2 space-y-1">
              {filteredGroups.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm ? 'Nenhum grupo encontrado' : 'Nenhum grupo disponível'}
                </div>
              ) : (
                filteredGroups.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                    onClick={() => handleGroupToggle(group.id)}
                  >
                    <Checkbox
                      checked={selectedGroups.includes(group.id)}
                      onChange={() => handleGroupToggle(group.id)}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {group.name}
                      </p>
                    </div>
                    
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {group.participantsCount}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Footer com Estatísticas */}
        <div className="pt-3 border-t border-border">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              {selectedGroups.length} grupos selecionados
            </span>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {totalContacts} contatos totais
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
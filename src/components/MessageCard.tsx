import { useState, useRef } from "react";
import { MessagePayload, ContentType, CarouselItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Mic, Image, Calendar, Eye, Save, ImageIcon, Plus, X, RotateCcw } from "lucide-react";

interface MessageCardProps {
  message: MessagePayload;
  onChange: (message: MessagePayload) => void;
  onSendNow: () => void;
  onSchedule: () => void;
  onPreview: () => void;
  onSaveTemplate: () => void;
  isValid: boolean;
}

const contentTypeIcons = {
  texto: FileText,
  audio: Mic,
  arquivo: Upload,
  foto: Image,
  carrossel: ImageIcon,
};

export function MessageCard({
  message,
  onChange,
  onSendNow,
  onSchedule,
  onPreview,
  onSaveTemplate,
  isValid,
}: MessageCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const carouselFileRef = useRef<HTMLInputElement>(null);
  const [charCount, setCharCount] = useState(message.text?.length || 0);
  const maxChars = 4096;

  const handleContentTypeChange = (type: ContentType) => {
    onChange({
      ...message,
      type,
      text: type === 'texto' ? message.text : undefined,
      mediaUrl: type !== 'texto' && type !== 'carrossel' ? message.mediaUrl : undefined,
      carouselItems: type === 'carrossel' ? message.carouselItems || [] : undefined,
    });
  };

  const addCarouselItem = () => {
    const newItem: CarouselItem = {
      id: `item-${Date.now()}`,
      type: 'foto',
    };
    
    const currentItems = message.carouselItems || [];
    if (currentItems.length < 10) {
      onChange({
        ...message,
        carouselItems: [...currentItems, newItem],
      });
    }
  };

  const updateCarouselItem = (itemId: string, updates: Partial<CarouselItem>) => {
    const updatedItems = (message.carouselItems || []).map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    );
    onChange({ ...message, carouselItems: updatedItems });
  };

  const removeCarouselItem = (itemId: string) => {
    const updatedItems = (message.carouselItems || []).filter(item => item.id !== itemId);
    onChange({ ...message, carouselItems: updatedItems });
  };

  const handleCarouselFileUpload = (itemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const mockUrl = `https://example.com/uploads/${file.name}`;
      updateCarouselItem(itemId, { mediaUrl: mockUrl });
    }
  };

  const handleTextChange = (text: string) => {
    setCharCount(text.length);
    if (text.length <= maxChars) {
      onChange({ ...message, text });
    }
  };

  const insertToken = (token: string) => {
    const textarea = document.getElementById('message-text') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentText = message.text || '';
      const newText = currentText.slice(0, start) + token + currentText.slice(end);
      handleTextChange(newText);
      
      // Restore cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + token.length;
        textarea.focus();
      }, 0);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate upload - in real app would POST to /api/upload
      const mockUrl = `https://example.com/uploads/${file.name}`;
      onChange({ ...message, mediaUrl: mockUrl });
    }
  };

  const IconComponent = contentTypeIcons[message.type];

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-card-hover transition-all animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Mensagem para Disparo</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Título da Mensagem */}
        <div className="space-y-2">
          <Label htmlFor="message-title" className="text-sm font-medium">
            Título da Mensagem
          </Label>
          <Input
            id="message-title"
            placeholder="Ex: Fala pessoal! Bom sábado a todos! 🚀"
            value={message.title}
            onChange={(e) => onChange({ ...message, title: e.target.value })}
            className="border-input"
          />
        </div>

        {/* Tabs de Tipo de Conteúdo */}
        <div className="space-y-4">
          <Tabs
            value={message.type}
            onValueChange={(value) => handleContentTypeChange(value as ContentType)}
          >
            <TabsList className="grid w-full grid-cols-5">
              {(['texto', 'audio', 'arquivo', 'foto', 'carrossel'] as ContentType[]).map((type) => {
                const Icon = contentTypeIcons[type];
                return (
                  <TabsTrigger key={type} value={type} className="flex items-center gap-1">
                    <Icon className="w-4 h-4" />
                    <span className="capitalize">{type}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="texto" className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="message-text" className="text-sm font-medium">
                    Conteúdo da Mensagem
                  </Label>
                  <Badge variant={charCount > maxChars ? "destructive" : "secondary"}>
                    {charCount}/{maxChars}
                  </Badge>
                </div>
                <Textarea
                  id="message-text"
                  placeholder="Digite sua mensagem aqui..."
                  value={message.text || ''}
                  onChange={(e) => handleTextChange(e.target.value)}
                  className={`min-h-[120px] resize-none ${
                    charCount > maxChars ? 'border-destructive' : 'border-input'
                  }`}
                />
                {charCount > maxChars && (
                  <p className="text-sm text-destructive">
                    Mensagem excede o limite de {maxChars} caracteres
                  </p>
                )}
              </div>
            </TabsContent>

            {(['audio', 'arquivo', 'foto'] as ContentType[]).map((type) => (
              <TabsContent key={type} value={type} className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  {message.mediaUrl ? (
                    <div className="space-y-2">
                      <IconComponent className="w-8 h-8 mx-auto text-success" />
                      <p className="text-sm font-medium text-foreground">Arquivo enviado</p>
                      <p className="text-xs text-muted-foreground">{message.mediaUrl}</p>
                    </div>
                  ) : (
                    <>
                      <IconComponent className="w-8 h-8 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Arraste e solte ou clique para enviar
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Selecionar {type}
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept={
                          type === 'audio' ? 'audio/*' :
                          type === 'foto' ? 'image/*' : '*/*'
                        }
                      />
                    </>
                  )}
                </div>
              </TabsContent>
            ))}

            <TabsContent value="carrossel" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Itens do Carrossel (máx. 10)
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addCarouselItem}
                    disabled={(message.carouselItems?.length || 0) >= 10}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Item
                  </Button>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {(message.carouselItems || []).map((item, index) => (
                    <div key={item.id} className="border border-border rounded-lg p-4 bg-background/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Item {index + 1}</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCarouselItem(item.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Button
                            variant={item.type === 'foto' ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateCarouselItem(item.id, { type: 'foto' })}
                          >
                            <Image className="w-4 h-4 mr-1" />
                            Foto
                          </Button>
                          <Button
                            variant={item.type === 'arquivo' ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateCarouselItem(item.id, { type: 'arquivo' })}
                          >
                            <Upload className="w-4 h-4 mr-1" />
                            Arquivo
                          </Button>
                        </div>

                        <div className="border border-dashed border-border rounded-lg p-4 text-center">
                          {item.mediaUrl ? (
                            <div className="space-y-2">
                              <div className="w-8 h-8 mx-auto text-success flex items-center justify-center">
                                {item.type === 'foto' ? <Image className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
                              </div>
                              <p className="text-sm font-medium">Arquivo enviado</p>
                              <p className="text-xs text-muted-foreground">{item.mediaUrl}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateCarouselItem(item.id, { mediaUrl: undefined })}
                              >
                                <RotateCcw className="w-4 h-4 mr-1" />
                                Trocar
                              </Button>
                            </div>
                          ) : (
                            <>
                              <div className="w-8 h-8 mx-auto text-muted-foreground mb-2 flex items-center justify-center">
                                {item.type === 'foto' ? <Image className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                Clique para selecionar {item.type}
                              </p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const input = document.createElement('input');
                                  input.type = 'file';
                                  input.accept = item.type === 'foto' ? 'image/*' : '*/*';
                                  input.onchange = (e) => handleCarouselFileUpload(item.id, e as any);
                                  input.click();
                                }}
                              >
                                Selecionar {item.type}
                              </Button>
                            </>
                          )}
                        </div>

                        <Input
                          placeholder="Texto do item (opcional)"
                          value={item.text || ''}
                          onChange={(e) => updateCarouselItem(item.id, { text: e.target.value })}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  ))}

                  {(message.carouselItems?.length || 0) === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Nenhum item adicionado ao carrossel</p>
                      <p className="text-xs">Clique em "Adicionar Item" para começar</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Opções */}
        <div className="space-y-4 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <Label htmlFor="mention-all" className="text-sm font-medium">
              Mencionar todos os contatos
            </Label>
            <Switch
              id="mention-all"
              checked={message.mentionAll}
              onCheckedChange={(checked) => onChange({ ...message, mentionAll: checked })}
            />
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={onSendNow}
            disabled={!isValid}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Disparar Agora
          </Button>
          
          <Button
            variant="outline"
            onClick={onSchedule}
            disabled={!isValid}
            className="flex-1"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Agendar Disparo
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
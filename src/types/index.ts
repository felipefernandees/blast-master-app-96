export type ContentType = 'texto' | 'audio' | 'arquivo' | 'foto' | 'carrossel';

export type CarouselItem = {
  id: string;
  mediaUrl?: string;
  text?: string;
  type: 'foto' | 'arquivo';
};

export type MessagePayload = {
  title: string;
  type: ContentType;
  text?: string;
  mediaUrl?: string;
  carouselItems?: CarouselItem[];
  useFirstName: boolean;
  mentionAll: boolean;
  variables?: string[];
};

export type Group = {
  id: string;
  name: string;
  participantsCount: number;
};

export type SendJob = {
  id: string;
  groups: Group[];
  payload: MessagePayload;
  scheduleAt?: string;
  status: 'queued' | 'running' | 'done' | 'failed';
  progress: number;
  sentCount?: number;
  failedCount?: number;
};

export type ConnectionStatus = 'online' | 'offline' | 'connecting';
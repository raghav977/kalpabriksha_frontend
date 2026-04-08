export interface EventImage {
  id?: number;
  url: string;
  eventId?: number;
}

export interface EventFile {
  id?: number;
  url: string;
  filename: string;
  fileType?: string;
  eventId?: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string | Date;
  location: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  images?: EventImage[];
  files?: EventFile[];
}

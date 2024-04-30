export interface EventFile {
  event_file_id: string;
  event_id: string;
  url: string;
  type: string;
  name: string;
}

export interface EventParameter {
  event_parameter_id: string;
  event_id: string;
  title: string;
  value: string;
}

export interface Event {
  event_id: string;
  title: string;
  description: string;
  files: EventFile[];
  cover: string;
  parameters: EventParameter[];
}

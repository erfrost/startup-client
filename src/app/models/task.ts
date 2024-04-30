import UploadedFile from "./uploadedFile";

export interface Task {
  class_id: string;
  class_task_id: string;
  title: string;
  description: string;
  date: string;
  files: UploadedFile[];
}

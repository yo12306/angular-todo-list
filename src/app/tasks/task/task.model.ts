export interface Task {
    id: string;
    userId: string | undefined;
    title: string;
    summary: string;
    dueDate: string;
  }
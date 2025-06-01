export type TaskType = {
  id: number;
  description: string;
  created: Date;
  completed: boolean;
};

export type FilterType = "all" | "active" | "completed";

export type TaskListProps = {
  tasks: TaskType[];
  onDeleted: (id: number) => void;
  onToggleDone: (id: number) => void;
};

export type FooterProps = {
  tasks: TaskType[];
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  deleteAllTasks: () => void;
};

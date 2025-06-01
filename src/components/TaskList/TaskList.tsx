import React from "react";
import Task from "../Task/Task.tsx";
import styles from "./TaskList.module.scss";
import { TaskListProps } from "../types/types.d.ts";

const TaskList = ({ tasks, onDeleted, onToggleDone }: TaskListProps) => {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleDone={onToggleDone}
          onDelete={onDeleted}
        />
      ))}
    </ul>
  );
};

export default TaskList;

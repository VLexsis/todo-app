import React from "react";
import { formatDistanceToNow } from "date-fns";
import styles from "./Task.module.scss";
import { TaskType } from "../types/types.d.ts";

type TaskProps = {
  task: TaskType;
  onDelete: (id: number) => void;
  onToggleDone: (id: number) => void;
};

const Task = ({
  task = {
    id: 0,
    description: "",
    created: new Date(),
    completed: false,
  },
  onDelete = () => {},
  onToggleDone = () => {},
}: TaskProps) => {
  const formattedDate = formatDistanceToNow(task.created, {
    addSuffix: true,
    includeSeconds: true,
  });

  return (
    <li
      className={`${styles.taskItem} ${task.completed ? styles.completed : ""}`}
    >
      <div className={styles.view}>
        <input
          id={`task-${task.id}`}
          type="checkbox"
          className={styles.toggle}
          checked={task.completed}
          onChange={() => onToggleDone(task.id)}
        />
        <label htmlFor={`task-${task.id}`} />
        <span
          className={styles.taskTitle}
          onClick={() => onToggleDone(task.id)}
        >
          {task.description}
        </span>
        <span className={styles.taskDescription}>{formattedDate}</span>
        <button
          className={styles.icon}
          onClick={() => onDelete(task.id)}
          aria-label={`Delete task: ${task.description}`}
        />
      </div>
    </li>
  );
};

export default Task;

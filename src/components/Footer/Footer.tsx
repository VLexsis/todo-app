import React from "react";
import styles from "./Footer.module.scss";
import { FilterType, FooterProps } from "../types/types.d.ts";

const Footer = ({
  tasks,
  filter,
  onFilterChange,
  deleteAllTasks,
}: FooterProps) => {
  const buttons: { name: FilterType; label: string }[] = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  const activeTasksCount = tasks.filter((task) => !task.completed).length;

  return (
    <footer className={styles.footer}>
      <span className={styles.todoCount}>{activeTasksCount} items left</span>
      <ul className={styles.filters}>
        {buttons.map(({ name, label }) => (
          <li key={name}>
            <button
              className={`${styles.filterButton} ${filter === name ? styles.selected : ""}`}
              onClick={() => onFilterChange(name)}
              aria-current={filter === name ? "page" : undefined}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={styles.clearCompleted}
        onClick={deleteAllTasks}
        disabled={!tasks.some((task) => task.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;

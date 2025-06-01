import React from "react";
import styles from "./TasksFilter.module.scss";
import { FilterType } from "../types/types.d.ts";

type TaskFilterProps = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

const TasksFilter = ({ filter, onFilterChange }: TaskFilterProps) => {
  const buttons: { name: FilterType; label: string }[] = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  return (
    <ul className={styles.filterList}>
      {buttons.map(({ name, label }) => {
        const isActive = filter === name;
        const buttonClass = isActive
          ? `${styles.filterButton} ${styles.selected}`
          : styles.filterButton;

        return (
          <li key={name} className={styles.filterListItem}>
            <button
              className={buttonClass}
              onClick={() => onFilterChange(name)}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TasksFilter;

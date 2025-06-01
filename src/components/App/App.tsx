import React, { useState, useCallback, useRef } from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm.tsx";
import TaskList from "../TaskList/TaskList.tsx";
import Footer from "../Footer/Footer.tsx";
import { TaskType, FilterType } from "../types/types.d.ts";
import styles from "./App.module.scss";

const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const maxId = useRef<number>(1);

  const createNewTask = (description: string): TaskType => {
    return {
      id: maxId.current++,
      description: description,
      created: new Date(),
      completed: false,
    };
  };

  const deleteTask = useCallback((id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const onAddTask = useCallback((text: string) => {
    const newTask = createNewTask(text);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const toggleProperty = useCallback(
    (
      arr: TaskType[],
      id: number,
      propName: keyof Pick<TaskType, "completed">
    ): TaskType[] => {
      const idx = arr.findIndex((el) => el.id === id);
      const oldTask = arr[idx];
      const newItem = { ...oldTask, [propName]: !oldTask[propName] };
      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    },
    []
  );

  const onToggleDone = useCallback(
    (id: number) => {
      setTasks((prevTasks) => toggleProperty(prevTasks, id, "completed"));
    },
    [toggleProperty]
  );

  const deleteAllTasks = useCallback(() => {
    setTasks([]);
  }, []);

  const filterTasks = useCallback(
    (tasks: TaskType[], filter: FilterType): TaskType[] => {
      switch (filter) {
        case "all":
          return tasks;
        case "active":
          return tasks.filter((task) => !task.completed);
        case "completed":
          return tasks.filter((task) => task.completed);
        default:
          return tasks;
      }
    },
    []
  );

  const onFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  const visibleTasks = filterTasks(tasks, filter);

  return (
    <section className={styles.todoapp}>
      <header className={styles.header}>
        <h1>todos</h1>
        <NewTaskForm onAddTask={onAddTask} />
      </header>
      <section className={styles.main}>
        <TaskList
          tasks={visibleTasks}
          onDeleted={deleteTask}
          onToggleDone={onToggleDone}
        />
        <Footer
          tasks={tasks}
          filter={filter}
          onFilterChange={onFilterChange}
          deleteAllTasks={deleteAllTasks}
        />
      </section>
    </section>
  );
};

export default App;

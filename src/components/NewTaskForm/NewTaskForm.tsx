import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./NewTaskForm.module.scss";

type NewTaskFormProps = {
  onAddTask: (text: string) => void;
};

const NewTaskForm = ({ onAddTask }: NewTaskFormProps) => {
  const [description, setDescription] = useState<string>("");

  const onTaskChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value);
  };

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (description.trim()) {
      onAddTask(description);
      setDescription("");
    }
  };

  return (
    <form className={styles.newTodoForm} onSubmit={onSubmit}>
      <input
        className={styles.newTodoFormInput}
        placeholder="What needs to be done?"
        autoFocus
        value={description}
        onChange={onTaskChange}
      />
      <button type="submit" className={styles.newTodoFormButton}></button>
    </form>
  );
};

export default NewTaskForm;

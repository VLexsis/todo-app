import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

beforeEach(() => {
  render(<App />);
});

const addTask = (text: string) => {
  const input = screen.getByPlaceholderText("What needs to be done?");
  fireEvent.change(input, { target: { value: text } });
  fireEvent.submit(input.closest("form")!);
};

test("добавляет задачи", () => {
  addTask("Задача 1");
  expect(screen.getByText("Задача 1")).toBeInTheDocument();
});

test("переключает статус задачи", () => {
  addTask("Задача 2");
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test("фильтрует активные задачи", () => {
  addTask("Задача 1");
  addTask("Задача 2");

  const checkboxes = screen.getAllByRole("checkbox");
  fireEvent.click(checkboxes[0]);

  fireEvent.click(screen.getByText("Active"));
  expect(screen.queryByText("Задача 1")).not.toBeInTheDocument();
  expect(screen.getByText("Задача 2")).toBeInTheDocument();
});

test("фильтрует выполненные задачи", () => {
  addTask("Задача 1");
  addTask("Задача 2");

  const checkboxes = screen.getAllByRole("checkbox");
  fireEvent.click(checkboxes[0]);

  fireEvent.click(screen.getByText("Completed"));
  expect(screen.getByText("Задача 1")).toBeInTheDocument();
  expect(screen.queryByText("Задача 2")).not.toBeInTheDocument();
});

test("удаляет задачу", () => {
  addTask("Удаляемая задача");
  const deleteButton = screen.getByLabelText(/delete task: удаляемая задача/i);
  fireEvent.click(deleteButton);
  expect(screen.queryByText("Удаляемая задача")).not.toBeInTheDocument();
});

test("отображает количество активных задач", () => {
  addTask("Активная задача");
  expect(screen.getByText(/1\s+item[s]?\s+left/i)).toBeInTheDocument();
});

test("очищает выполненные задачи", () => {
  addTask("Очистить выполненные");
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  const clearButton = screen.getByText(/clear completed/i);
  fireEvent.click(clearButton);
  expect(screen.queryByText("Очистить выполненные")).not.toBeInTheDocument();
});

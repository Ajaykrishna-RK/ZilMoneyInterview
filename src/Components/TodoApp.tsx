"use client";
import React, { useState, useEffect } from "react";
import { Pencil, Trash2, CheckCircle2, XCircle } from "lucide-react";
import TextInput from "./TextInput";
import EditableInput from "./EditableInput";
import { useValidation } from "../hooks/UseValidation";
import Toast from "./common/Toast";
import Button from "./common/Button";

// ✅ Toast component

type Task = {
  id: number;
  text: string;
  completed: boolean;
  editing?: boolean;
};

type FilterType = "all" | "active" | "completed";

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [showError, setShowError] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // ✅ Validation rules (minimum 4 chars)
  const { error, isValid } = useValidation(newTask, [
    {
      validate: (v) => v.trim().length >= 4,
      message: "Task name must be at least 4 characters.",
    },
    {
      validate: (v) => v.trim().length <= 50,
      message: "Task name must be under 50 characters.",
    },
  ]);

  // ✅ Toast auto-hide after 2 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // ✅ Add Task
  const handleAddTask = () => {
    setShowError(true);
    if (!isValid) return;

    const newItem = { id: Date.now(), text: newTask.trim(), completed: false };
    setTasks([...tasks, newItem]);
    setNewTask("");
    setShowError(false);
    setToast({ message: "Task added successfully!", type: "success" });
  };

  // ✅ Delete Task
  const handleDelete = (id: number) => {
    const deletedTask = tasks.find((t) => t.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    setToast({
      message: `Deleted "${deletedTask?.text}"`,
      type: "error",
    });
  };

  // ✅ Toggle Complete
  const handleToggle = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const task = tasks.find((t) => t.id === id);
    if (task)
      setToast({
        message: task.completed
          ? `Marked "${task.text}" as active`
          : `Marked "${task.text}" as completed`,
        type: "success",
      });
  };

  const handleSave = (id: number, newText: string) => {
    if (newText.trim().length < 4) {
      setToast({
        message: "Task name must be at least 4 characters.",
        type: "error",
      });
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, editing: false } : task
      )
    );
    setToast({ message: "Task updated!", type: "success" });
  };

  const handleToggleEdit = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, editing: !t.editing } : t))
    );
  };

  // ✅ Filtered tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // ✅ Summary count
  const remainingCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg relative">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Task Manager
      </h1>

      {/* Add Task */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2">
          <TextInput
            value={newTask}
            onChange={(val) => {
              setNewTask(val);
              if (showError) setShowError(false);
            }}
            placeholder="Add a new task..."
            onEnter={handleAddTask}
            error={showError ? error : ""}
          />
          <button
            onClick={handleAddTask}
            className={`px-4 py-2 rounded-lg text-white transition ${
              isValid
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Add
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-3 mb-4">
        {(["all", "active", "completed"] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              filter === type
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* ✅ Task Summary */}
      <p className="text-sm text-gray-600 text-center mb-3">
        {tasks?.length === 0
          ? ""
          : remainingCount === 0
          ? "All tasks completed! 🎉"
          : `${remainingCount} task${remainingCount > 1 ? "s" : ""} remaining`}
      </p>

      {/* Task List */}
      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2"
            >
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                  className="cursor-pointer"
                />

                {task.editing ? (
                  <EditableInput
                    initialValue={task.text}
                    onSave={(value) => handleSave(task.id, value)}
                    onCancel={() => handleToggleEdit(task?.id)}
                  />
                ) : (
                  <span
                    className={`${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.text}
                  </span>
                )}
              </div>

              {!task.editing && (
                <div className="flex gap-2 ml-3">
                  <Button
                    onClick={() => handleToggleEdit(task?.id)}
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </li>
          ))
        )}
      </ul>

      {/* ✅ Toast feedback */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default TodoApp;

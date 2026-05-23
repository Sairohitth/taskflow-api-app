import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskControls from "../components/TaskControls";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function TaskPage() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    const inputRef = useRef(null);

    useEffect(() => {
        if (!loading && inputRef.current) {
            inputRef.current.focus();
        }
    }, [loading]);

    useEffect(() => {
        async function fetchTasks() {
            try {
                setLoading(true);
                /*
                FETCH VERSION

                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/todos?_limit=5"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }

                const data = await response.json();
                for(let i=0;i<1000000000;i++){}
                */

                
                // AXIOS VERSION

                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/todos?_limit=5"
                );

                // for(let i=0;i<1000000000;i++){}

                const data = response.data;

                const formattedTasks = data.map((task) => ({
                    id: task.id,
                    title: task.title,
                    completed: task.completed,
                }));

                setTasks(formattedTasks);
                } catch (err) {
                setError("Failed to fetch tasks");
                } finally {
                setLoading(false);
                }
            }

        fetchTasks();
    }, []);

    function addTask() {
        if (input.trim() === "") {
            return;
        }

        const newTask = {
            id: Date.now(),
            title: input,
            completed: false,
        };

        setTasks([...tasks, newTask]);
        setInput("");
        inputRef.current.focus();
    }

    function deleteTask(id) {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
    }

  function toggleTask(id) {
        const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
            return {
            ...task,
            completed: !task.completed,
            };
        }

        return task;
    });

        setTasks(updatedTasks);
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }
    const filteredTasks = tasks.filter((task) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "completed" && task.completed === true) ||
            (filter === "pending" && task.completed === false);

        const matchesSearch = task.title
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

  return (
    <div>
      <h1>TaskFlow</h1>

      <TaskForm
        input={input}
        setInput={setInput}
        addTask={addTask}
        inputRef={inputRef}
        />
        <TaskControls
            search={search}
            setSearch={setSearch}
            setFilter={setFilter}
        />


      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        />
    </div>
  );
}

export default TaskPage;
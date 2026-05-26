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
                setLoading(true)
                const res = await axios.get('http://localhost:5001/tasks')
                setTasks(res.data)
                setError('')
            } catch (err) {
                setError('Failed to fetch tasks')
            } finally {
                setLoading(false)
            }
        }

    fetchTasks()
    }, [])

    async function addTask(e) {
        e.preventDefault()
        if (!input.trim()) return
        try {
            const res = await axios.post(
                'http://localhost:5001/tasks',
                {
                    title: input
                }
            )
            setTasks([...tasks, res.data])
            setInput("")
            inputRef.current.focus()
        } catch (err) {
            console.log(err)
        }
    }

    async function deleteTask(id) {
        try {
            await axios.delete(
                `http://localhost:5001/tasks/${id}`
            )
            const updatedTasks = tasks.filter(
                (task) => task._id !== id
            )
            setTasks(updatedTasks)
        } catch (err) {
            console.log(err)
        }
    }

    async function toggleTask(id) {
        try {
            const taskToUpdate = tasks.find((task) => task._id === id)
            const res = await axios.patch(
                `http://localhost:5001/tasks/${id}`,
                {
                    completed: !taskToUpdate.completed
                }
            )
            const updatedTasks = tasks.map((task) => {
                if (task._id === id) {
                    return res.data
                }
                return task
            })
            setTasks(updatedTasks)
        } catch (err) {
            console.log(err)
        }
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
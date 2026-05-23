function TaskItem(props) {
  return (
    <div>
      <p>
        {props.task.title} -{" "}
        {props.task.completed ? "Done" : "Pending"}
      </p>

      <button onClick={() => props.deleteTask(props.task.id)}>
        Delete
      </button>

      <button onClick={() => props.toggleTask(props.task.id)}>
        Toggle Complete
      </button>
    </div>
  );
}

export default TaskItem;
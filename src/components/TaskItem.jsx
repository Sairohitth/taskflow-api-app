function TaskItem(props) {
  const isDeleting = props.deletingId === props.task._id;
  const isToggling = props.togglingId === props.task._id;
  return (
    <div>
      <p>
        {props.task.title} -{" "}
        {props.task.completed ? "Done" : "Pending"}
      </p>

      <button onClick={() => props.deleteTask(props.task._id)} disabled={isDeleting || isToggling}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>

      <button onClick={() => props.toggleTask(props.task._id)} disabled={isDeleting || isToggling}>
        {isToggling ? "Updating..." : "Toggle Complete"}
      </button>
    </div>
  );
}

export default TaskItem;
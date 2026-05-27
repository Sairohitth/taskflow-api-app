function TaskForm(props) {

  return (

    <form onSubmit={props.addTask}>

      <input
        type="text"
        placeholder="Enter task"
        value={props.input}
        onChange={(e) => props.setInput(e.target.value)}
        ref={props.inputRef}
      />

      <button type="submit" disabled={props.adding}>
        {props.adding ? "Adding..." : "Add"}
      </button>

    </form>

  );
}

export default TaskForm;

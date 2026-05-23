function TaskForm(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter task"
        value={props.input}
        onChange={(e) => props.setInput(e.target.value)}
        ref={props.inputRef}
      />

      <button onClick={props.addTask}>Add</button>
    </div>
  );
}

export default TaskForm;
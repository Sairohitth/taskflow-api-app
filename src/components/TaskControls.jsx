function TaskControls(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks"
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
      />

      <div>
        <button onClick={() => props.setFilter("all")}>All</button>
        <button onClick={() => props.setFilter("completed")}>Completed</button>
        <button onClick={() => props.setFilter("pending")}>Pending</button>
      </div>
    </div>
  );
}

export default TaskControls;
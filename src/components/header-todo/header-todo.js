import './header-todo.css';

function HeaderTodo() {
    return (
    <div >
        <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" />
      </header> 
      </section>
    </div>
    )
}

export default HeaderTodo;
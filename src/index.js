import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
const Title = ({ todoCount }) => {
  return (
    <header className="App-header">
      <div>
        <div>
          <h1>TODO {todoCount} </h1>
        </div>
      </div>
    </header>
  );
};
class MainPage extends React.Component {
  state = {
    value: "",
    todos: []
  };
  handleChange = e => {
    e.preventDefault();
    this.setState({ value: e.target.value });
  };
  handleClick = () => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          name: prevState.value,
          key: Date.now(),
          isFinished: false
        }
      ]
    }));
  };
  deletehandleClick = () => {
    this.setState(state => ({
      todos: []
    }));
  };
  markAsDoneClick = key => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.key !== key) {
          return todo;
        }
        return {
          ...todo,
          isFinished: !todo.isFinished
        };
      })
    }));
  };
  removehandleClick = key => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.key !== key)
    }));
  };
  clearInput = () => {
    document.getElementById("input").value = "";
  };
  render() {
    return (
      <div className="App-mid">
        <Title todoCount={this.state.value.length} />
        <label className="index">
          <input
            className="input"
            id="input"
            onClick={this.clearInput}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <button className="G0" onClick={this.handleClick}>
          Add new todo
        </button>
        <button className="G00" onClick={this.deletehandleClick}>
          Remove everything
        </button>
        {this.state.todos.map(todo => (
          <div
            className="list"
            key={todo.key}
            style={{
              textDecoration: todo.isFinished ? "line-through" : "none"
            }}
          >
            {todo.name}
            <button
              className="G1"
              onClick={() => this.removehandleClick(todo.key)}
            >
              Delete task
            </button>
            <button
              id="Unmark"
              className="G2"
              onClick={() => this.markAsDoneClick(todo.key)}
            >
              Mark as done
            </button>
          </div>
        ))}
      </div>
    );
  }
}
ReactDOM.render(<MainPage />, document.getElementById("root"));

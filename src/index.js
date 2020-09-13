import React from "react";
import ReactDOM from "react-dom";
import data from "./data";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

class App extends React.Component {
  state = data;

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newTasksId = Array.from(column.tasksID);
    newTasksId.splice(source.index, 1);
    newTasksId.splice(destination.index, 0, draggableId);

    const newColumns = {
      ...column,
      tasksID: newTasksId,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumns.id]: newColumns,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const tasks = column.tasksID.map(
            (taskID) => this.state.tasks[taskID]
          );

          return <Column key={columnId} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

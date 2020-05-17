import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: '5px',
    margin: `0 0 ${10}px 0`,
    borderRadius: "10px",
    position: "relative",
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    width: '100%',
    borderRadius: "11px"
});

class IngredientCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.ingredients
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.props.ingredients,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        });
        this.props.reorderList(items)
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.props.ingredients.map((item, index) => (
                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <div className="edit-ingredient" >
                                                <button className='btn btn-warning ingredient-edit-button' onClick={this.props.editIngredient.bind(this, item.ingredient)}>Edit</button></div>
                                            <div className='main-ingredient'>{item.ingredient}</div>
                                            <div className="delete-ingredient ">
                                                <button className='btn btn-danger ingredient-delete-button' onClick={this.props.deleteIngredient.bind(this, item.ingredient)}>Delete</button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default IngredientCards
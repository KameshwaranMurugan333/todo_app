import React from "react";

export const AddTodo = ({
    value = "",
    onChange = () => false,
    onAddBtnClicked = () => false
}) => {
    return <div>
        <textarea onChange={(e) => onChange(e.target.value)}>{value}</textarea>
        <button onClick={onAddBtnClicked} >Add Todo</button>
    </div>
}   
import React from "react";
import { Form, Button, Stack } from "react-bootstrap";

export const AddTodo = ({
    value = "",
    onChange = () => false,
    onAddBtnClicked = () => false,
    loading = false
}) => {
    return <Stack gap={2}>
        <Form.Control
            as="textarea"
            value={value}
            placeholder={"Your Todo..."}
            onChange={(e) => onChange(e.target.value)} />
        <Button
            disabled={loading}
            onClick={onAddBtnClicked}>
            {loading ? "Adding Todo..." : "Add Todo"}
        </Button>
    </Stack>
}   
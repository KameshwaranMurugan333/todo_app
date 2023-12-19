import React from "react"
import { Alert, Button, Form } from "react-bootstrap"

export const TodoForm = ({ title, setTitle, date, setDate, errorMessage, isLoading, onSubmit }) => {

    return <Form onSubmit={(e) => e.preventDefault()}>
        {/* Title */}
        <Form.Group className="mb-3" controlId="formTodoTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control value={title} required onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
        </Form.Group>

        {/* Date */}
        <Form.Group className="mb-3" controlId="formTodoDate">
            <Form.Label>Date</Form.Label>
            <Form.Control value={date} required onChange={(e) => setDate(e.target.value)} type="date" />
        </Form.Group>

        {errorMessage.length > 0 && <Alert className='mb-3' variant={'danger'}>{errorMessage}</Alert>}

        {/* Login Button */}
        <Button variant="primary" type="submit" disabled={isLoading} onClick={onSubmit} >
            Submit
        </Button>
    </Form>
}
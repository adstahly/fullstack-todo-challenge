import React from 'react';
import { TextField, Button, Stack } from '@mui/material';
import {useState} from "react";

const TaskForm = ({ onSubmit, initialText = '', onCancel }) => {
    const [text, setText] = useState(initialText);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
                label="Task"
                value={text}
                onChange={(e) => setText(e.target.value)}
                fullWidth
                required
                autoFocus
            />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                    {initialText ? 'Update Task' : 'Add Task'}
                </Button>
                {onCancel && (
                    <Button variant="outlined" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
            </Stack>
        </form>
    );
};

export default TaskForm;
import React from 'react';
import { useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    ListItemSecondaryAction,
    Typography,
    Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskForm from './TaskForm';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
    const [editingId, setEditingId] = useState(null);

    const handleEditClick = (taskId) => {
        setEditingId(taskId);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleSubmit = (taskId, newText) => {
        onUpdate(taskId, newText);
        setEditingId(null);
    };

    if (!tasks.length) {
        return (
            <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                No tasks found. Start by adding a new task!
            </Typography>
        );
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {tasks.map((task) => (
                <ListItem key={task._id} divider>
                    {editingId === task._id ? (
                        <TaskForm
                            onSubmit={(text) => handleSubmit(task._id, text)}
                            initialText={task.text}
                            onCancel={handleCancelEdit}
                        />
                    ) : (
                        <>
                            <ListItemText
                                primary={task.text}
                                secondary={`Created: ${new Date(task.createdAt).toLocaleDateString()}`}
                            />
                            <ListItemSecondaryAction>
                                <Stack direction="row" spacing={1}>
                                    <IconButton
                                        edge="end"
                                        onClick={() => handleEditClick(task._id)}
                                        aria-label="edit"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        onClick={() => onDelete(task._id)}
                                        aria-label="delete"
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </ListItemSecondaryAction>
                        </>
                    )}
                </ListItem>
            ))}
        </List>
    );
};

export default TaskList;
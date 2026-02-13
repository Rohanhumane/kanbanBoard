import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { setTasks, addTask, updateTask, deleteTask } from '../../redux/slices/taskSlice';
import { logout } from '../../redux/slices/authSlice';
import { taskAPI } from '../../services/api';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import DeleteModal from '../common/DeleteModal';
import EditTaskModal from './EditTaskModal';
import '../../styles/Kanban.css';

const STAGES = [
  { id: 0, name: 'Backlog', color: '#ff6b6b' },
  { id: 1, name: 'To Do', color: '#4ecdc4' },
  { id: 2, name: 'Ongoing', color: '#ffd93d' },
  { id: 3, name: 'Done', color: '#95e1d3' },
];

const KanbanBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: tasks } = useSelector((state) => state.tasks);
  const [showTrash, setShowTrash] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      dispatch(setTasks(response.data));
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask({
        ...taskData,
        stage: 0, // Always start in Backlog
      });
      dispatch(addTask(response.data));
    } catch (error) {
      alert('Failed to create task');
    }
  };

  const handleDragStart = () => {
    setShowTrash(true);
  };

  const handleDragEnd = async (result) => {
    setShowTrash(false);

    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // Check if dropped in trash
    if (destination.droppableId === 'trash') {
      const task = tasks.find(t => t.id === draggableId);
      setTaskToDelete(task);
      setDeleteModalOpen(true);
      return;
    }

    // Move between stages
    if (source.droppableId !== destination.droppableId) {
      const newStage = parseInt(destination.droppableId);
      const task = tasks.find(t => t.id === draggableId);
      
      try {
        const response = await taskAPI.updateTask(task.id, { ...task, stage: newStage });
        dispatch(updateTask(response.data));
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    }
  };

  const handleMoveTask = async (taskId, direction) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newStage = task.stage + direction;
    if (newStage < 0 || newStage > 3) return;

    try {
      const response = await taskAPI.updateTask(task.id, { ...task, stage: newStage });
      dispatch(updateTask(response.data));
    } catch (error) {
      console.error('Failed to move task:', error);
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;

    try {
      await taskAPI.deleteTask(taskToDelete.id);
      dispatch(deleteTask(taskToDelete.id));
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setEditModalOpen(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await taskAPI.updateTask(updatedTask.id, updatedTask);
      dispatch(updateTask(response.data));
      setEditModalOpen(false);
      setTaskToEdit(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getTasksByStage = (stageId) => {
    return tasks.filter(task => task.stage === stageId);
  };

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <div className="header-left">
          <h1>Kanban Board</h1>
          <button onClick={() => navigate('/dashboard')} className="back-button">
            ← Dashboard
          </button>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <TaskForm onSubmit={handleCreateTask} />

      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="board-container">
          {STAGES.map((stage) => (
            <Droppable key={stage.id} droppableId={String(stage.id)}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`board-column ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                >
                  <div className="column-header" style={{ borderColor: stage.color }}>
                    <h3>{stage.name}</h3>
                    <span className="task-count">{getTasksByStage(stage.id).length}</span>
                  </div>

                  <div className="tasks-list">
                    {getTasksByStage(stage.id).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onMoveBack={() => handleMoveTask(task.id, -1)}
                              onMoveForward={() => handleMoveTask(task.id, 1)}
                              onEdit={() => handleEditTask(task)}
                              onDelete={() => {
                                setTaskToDelete(task);
                                setDeleteModalOpen(true);
                              }}
                              canMoveBack={task.stage > 0}
                              canMoveForward={task.stage < 3}
                              isDragging={snapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>

        {showTrash && (
          <Droppable droppableId="trash">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`trash-zone ${snapshot.isDraggingOver ? 'active' : ''}`}
              >
                <span className="trash-icon">🗑️</span>
                <p>Drop here to delete</p>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDeleteTask}
        taskName={taskToDelete?.name}
      />

      <EditTaskModal
        isOpen={editModalOpen}
        task={taskToEdit}
        onClose={() => {
          setEditModalOpen(false);
          setTaskToEdit(null);
        }}
        onSave={handleUpdateTask}
      />
    </div>
  );
};

export default KanbanBoard;

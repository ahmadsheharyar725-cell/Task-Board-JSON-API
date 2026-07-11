import React, { useContext, useEffect, useState } from "react";
import { Spinner, Button, Modal, Form, Table } from "react-bootstrap";
import { TeamContext } from "../Context/TeamContext";
import API_URL from "../config";
const Task = () => {
  const { tasks, team, dispatch } = useContext(TeamContext);
  const [loading, setLoading] = useState(false);

  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAssignedUser, setEditAssignedUser] = useState("");
  const [editStatus, setEditStatus] = useState("To Do");

  const handleEdit = (task) => {
    setEditTask(task);
    setEditTitle(task.title);
    setEditStatus(task.status);
    setEditAssignedUser(task.assignTo);
  };

  const handleClose = () => {
    setEditTask(null);
    setEditTitle("");
    setEditAssignedUser("");
    setEditStatus("To Do");
  };

  const handleSave = async () => {
    if (!editTask) return;
    const updatedTask = {
      ...editTask,
      title: editTitle,
      assignTo: editAssignedUser,
      status: editStatus,
    };
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/tasks/${editTask.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) throw new Error("Failed to update task!");
      dispatch({ type: "UPDATE_TASK", payload: updatedTask });
      handleClose();
    } catch (err) {
      alert("Error updating task: " + err.message);
    } finally {
      setTimeout(()=>setLoading(false),400);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task!");
      dispatch({ type: "DELETE_TASK", payload: id });
    } catch (err) {
      console.error("Error deleting task: ", err);
      alert("Couldn't delete task, try later!");
    } finally {
      setTimeout(()=>setLoading(false),500);
    }
  };

 

  return (
    <div>
      <h3 className="mb-4 text-center">Tasks</h3>

      {loading ? (
        <div className="d-flex justify-content-center p-5">
          <Spinner animation="border" />
        </div>
      ) : tasks && tasks.length > 0 ? (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="fw-semibold">{task.title}</td>
                <td>
                  <span
                    className={`badge ${
                      task.status === "Done"
                        ? "bg-success"
                        : task.status === "In Progress"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td>{task.assignTo}</td>
                <td className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center text-muted">No tasks found</p>
      )}

      <Modal show={editTask !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task title</Form.Label>
              <Form.Control
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="assignUser" className="mb-3">
              <Form.Label>Assign to User</Form.Label>
              <Form.Select
                value={editAssignedUser}
                onChange={(e) => setEditAssignedUser(e.target.value)}
                required
              >
                <option value="">Select a user</option>
                {team.teamMembers?.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="taskStatus" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Task;

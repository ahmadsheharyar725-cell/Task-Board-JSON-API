import React, { useState, useContext } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { TeamContext } from "../Context/TeamContext";
import API_URL from "../config";

const AssignTasks = () => {
  const{team,dispatch}=useContext(TeamContext);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("To Do");
  const [assignedUser, setAssignedUser] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const newTask = {
    id: Date.now(),
    title,
    assignTo: assignedUser,
    status,
  };

  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!res.ok) {
      throw new Error("Failed to add task!");
    }

    const savedTask = await res.json();
setTimeout(()=>{
  
    dispatch({ type: "ADD_TASK", payload: savedTask });

    setTitle("");
    setAssignedUser("");
    setStatus("To Do");
    setLoading(false);
},1000)
  } catch (err) {
    console.error("Error adding task:", err);
    alert("Could not save task. Please try again.");
  }
};

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center fw-bold">Add New Task</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="g-4 justify-content-center">
          <Col xs={12} md={5}>
            <Card className="shadow-sm p-3 h-100">
              <Card.Body>
                <Card.Title className="mb-3 fw-semibold">Task Details</Card.Title>
                <Form.Group controlId="taskTitle" className="mb-3">
                  <Form.Label>Task Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={5}>
            <Card className="shadow-sm p-3 h-100">
              <Card.Body>
                <Card.Title className="mb-3 fw-semibold">Assign Task</Card.Title>
                <Form.Group controlId="assignUser" className="mb-3">
                  <Form.Label>Assign to User</Form.Label>
                  <Form.Select
                    value={assignedUser}
                    onChange={(e) => setAssignedUser(e.target.value)}
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
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-4">
          <Button
            type="submit"
            variant="purple"
            size="lg"
            className="fw-bold"
            style={{ backgroundColor: "#656465ff", border: "none", minWidth: "200px" }}
            disabled={loading}
          >
            {loading ? "Adding Task..." : "Add Task"}
          </Button>
        </div>
      </Form>

     
    </Container>
  );
};

export default AssignTasks;

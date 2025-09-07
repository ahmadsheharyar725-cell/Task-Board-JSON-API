import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaTasks, FaUsers, FaChartLine } from "react-icons/fa";

const Home = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center fw-bold text-dark mb-4">Welcome to Team Flow</h1>
      <p className="text-center text-muted mb-5">
        Manage your team and tasks effectively with our simple and powerful dashboard.
      </p>

      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-lg border-0 hover-shadow">
            <Card.Body className="text-center">
              <FaUsers size={40} className="text-primary mb-3" />
              <Card.Title className="fw-bold">Team Management</Card.Title>
              <Card.Text>
                Add, view, and manage all your team members in one place.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-lg border-0 hover-shadow">
            <Card.Body className="text-center">
              <FaTasks size={40} className="text-success mb-3" />
              <Card.Title className="fw-bold">Task Tracking</Card.Title>
              <Card.Text>
                Keep track of all tasks and monitor their progress easily.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-lg border-0 hover-shadow">
            <Card.Body className="text-center">
              <FaChartLine size={40} className="text-warning mb-3" />
              <Card.Title className="fw-bold">Performance</Card.Title>
              <Card.Text>
                View insights and analytics for your team’s performance.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
    
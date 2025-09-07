import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaWater, FaUsers } from "react-icons/fa";

const MyNavBar = () => {
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-dark bg-gradient shadow-lg sticky-top"
        style={{ backgroundImage: "linear-gradient(90deg, #6f42c1, #d63384)" }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-warning">
            <FaWater style={{ color: "#FFD700", fontSize: "1.5rem" }} />
            <FaUsers
              style={{
                color: "#FFD700",
                fontSize: "1.5rem",
                marginLeft: "5px",
              }}
            />
            <span style={{ color: "white", marginLeft: "8px" }}>Team Flow</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="fw-semibold text-light">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/team" className="fw-semibold text-light">
                Team
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/tasks"
                className="fw-semibold text-light"
              >
                Tasks
              </Nav.Link>
              <Button
                as={Link}
                to="/assign-task"
                variant="success"
                className="ms-3 fw-bold"
              >
                + Assign Task
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default MyNavBar;

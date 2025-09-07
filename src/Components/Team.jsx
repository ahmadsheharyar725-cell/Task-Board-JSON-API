import React, { useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { TeamContext } from "../Context/TeamContext";

const Team = () => {
  const { team, loading } = useContext(TeamContext);

  if (loading) return <p className="text-center mt-5">Loading team...</p>;

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 fw-bold">👨‍💻 Our Team</h2>
      <Row>
        {team.teamMembers?.map((member) => (
          <Col key={member.id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="shadow-lg border-0 rounded-3 h-100 team-card">
              <Card.Body className="text-center">
                {/* Circle Avatar */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "#566f89ff",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px auto",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {member.name.charAt(0)}
                </div>

                {/* User Info */}
                <Card.Title className="fw-bold">{member.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {member.role}
                </Card.Subtitle>
                <Card.Text>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-decoration-none"
                  >
                    {member.email}
                  </a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Team;

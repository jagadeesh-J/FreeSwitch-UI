import React, { useState, Fragment, useRef } from "react";
import { Alert, Button, Form, Image, Row, Col, Container } from "react-bootstrap";
import "./Login.scss";

const Login  = (props) => {
  const [show, setShowName] = useState(false);
  const user = useRef();
  const passwd = useRef();
  const logo = "/fsLogo.png";
  const handleLogin = async(event) => {
    event.preventDefault();
    if (!user.current.value) {
      setShowName(true);
      user.current.focus();
    } else if (!user.current.value) {
      setShowName(true);
      passwd.current.focus();
    } else
      await props.handleEvent({'username': user.current.value, 'password': passwd.current.value});
  };
  return (
    <Fragment>
      <Alert className='positionSet' show={show} variant='danger' onClick={() => setShowName(false)} dismissible>
        <span>
          Please enter a username
        </span>
      </Alert>
      <Col sm={8} lg={8} className="logo m-0">
        <Container fluid className="welText p-0">
          <span>
            Welcome to <b>{props.companyName}</b>
          </span>
          <p>Login to access your account</p>
        </Container>
      </Col>
      <Col sm={4} lg={4} className="rightBox">
        <Row className="h-100 justify-content-center">
          <Col xs={12} align="left"></Col>
          <Col xs={12}>
            {/* <span className="titleColor">{props.shortText}</span> */}
            <p><Image src={logo} width="70%" alt="Logo" /></p>
            <Form noValidate className="inputGroup" onSubmit={handleLogin}>
            <div className='relative'>
              <Form.Group controlId="formUser">
                <Form.Control
                  type="text"
                  className="userName"
                  placeholder="Enter username"
                  ref={user}
                  autoFocus
                  required
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                </Form.Group>
                </div>
                <div className="relative">
                <Form.Group controlId="formPassswd">
                <Form.Control
                  type="password"
                  className="password"
                  placeholder="Enter password"
                  ref={passwd}
                  required
                />
                <span className="highlight"></span>
                <span className="bar"></span>
              </Form.Group>
              </div>
              <Button size="sm" className="loginBtn" type='submit'>
                <span>Login</span>
              </Button>
            </Form>
          </Col>
        </Row>
      </Col>
    </Fragment>
  );
}
export default Login;

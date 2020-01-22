import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

const NotFound = () => (
  <Col xs={9} className='align-self-center text-center'>
    <h1>Error 404: Page not found</h1>
    <Link to="/">Go Back</Link>
  </Col>
);

export default NotFound;

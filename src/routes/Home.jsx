import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

const Home = (props) => (
    <Col md={props.isToggle ? 9 : 12} xl={props.isToggle ? 10 : 12} className={props.isToggle ? 'align-self-center text-center' :'align-self-center text-center flexBasis'}>
        <h1 align="center">This page is currently under construction</h1>
        <Link to="/dashboard">Back to dashboard</Link>
    </Col>
);

export default Home;

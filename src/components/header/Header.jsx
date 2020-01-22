import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap';
import './Header.scss';

const Header = (props) => {
  const handleClickLogout = () => {
    props.setAuth(false);
  }
  return (
    <Fragment>
      <Form.Group controlId="formControl" className="d-none position-relative mt-3 mb-4 mr-3 wCalc">
        <FontAwesomeIcon className="text-muted ml-3 posSearch position-absolute" icon="search" />
        <Form.Control
          type="search"
          className="userName pl-5 border-0 font-1 bgColorFocus"
          placeholder="Search"
        />
        <span className="highlight"></span>
        <span className="bar"></span>
      </Form.Group>
      <div className='text-right m-3 align-middle'>
        <FontAwesomeIcon icon="bell" className="d-none" />
        <NavLink to='/' className="ml-3 text-secondary textLink" onClick={handleClickLogout}>Logout</NavLink>
      </div>
    </Fragment>
  );
};

export default Header;

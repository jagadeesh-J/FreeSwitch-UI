import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import './Nav.scss';
import classNames from 'classnames';

const Nav = (props) => {
  const logo = "/fs-logo-thick-sm.png";
  const userIcon = "/bgimg.jpg";
  const [aside, setAside] = useState(props.user.isToggle);
  const navlinks = [
    { url: '/dashboard', title: 'Configuration Variables', icon: 'tachometer-alt'},
  ];
  const changeWidthEvent = () => {
    setAside(!aside);
    props.user.setToggle(!aside);
  }
  return (
    <Col md={aside ? 3 : 1} xl={aside ? 2 : 1} className={classNames(aside ? "slideIn h-100" : "h-100 slideOut aside-width", "border-right bg-white shadow-sm aside-nav")}>
      <div className="right-half-cirle" onClick={changeWidthEvent}>
        <FontAwesomeIcon className="align-middle fa-lg" icon='angle-right' />
      </div>
      <Row noGutters={true} className='mb-3'>
        <Col xs={10} className={aside ? 'offset-sm-2' : 'text-center'}>
          <Image src={logo} alt='Logo' width='80%' className="py-3"/>
        </Col>
        <hr className='mt-0 w-100' />
        <Col xs={10} className={aside ? 'offset-sm-2' : 'text-center'}>
          <Image src={userIcon} alt='userIcon' width={aside ? "55" : "22"} height={aside ? "55" : "22"} className="rounded-circle d-inline-block" />
            <div hidden={!aside} className='ml-3 d-inline-block align-middle'>
            <span className="text-dark">{props.user.userName}</span>
            <small className="text-muted d-block"> Role of user </small>
            </div>
        </Col>
      </Row>
      <ListGroup className="row">
        {navlinks.map((link) => (
          <ListGroup.Item key={link.title} className="p-0 border-0 lineHeight-0">
            <NavLink activeClassName='actStyle' exact to={link.url} className="py-1 d-block colorDark">
              <span className={aside ? 'offset-sm-2 text-center' : 'd-block text-center'}>
                <FontAwesomeIcon className={aside ? "m-3 align-middle fa-lg" : "my-3 align-middle fa-lg"} icon={link.icon} /> <span hidden={aside ? false : true}>{link.title}</span>
              </span>
            </NavLink>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
}

export default Nav;

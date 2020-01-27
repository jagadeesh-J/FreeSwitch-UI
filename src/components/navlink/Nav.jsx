import React, {useState, useRef} from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Image, ListGroup, Row, Tooltip, OverlayTrigger } from 'react-bootstrap';
import './Nav.scss';
import classNames from 'classnames';

const Nav = (props) => {
  const logo = "/fsLogo.png";
  const minimizelogo = "/fsLogoMin.png";
  const userIcon = "/bgimg.jpg";
  const [aside, setAside] = useState(props.user.isToggle);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const navlinks = [
    { url: '/dashboard', title: 'Configuration Variables', icon: 'tachometer-alt'},
    { url: '/reports', title: 'Reports', icon: 'chart-bar'},
    { url: '/applications', title: 'Applications', icon: 'window-restore'},
    { url: '/dialplan', title: 'Dialplan', icon: 'blender-phone'},
    { url: '/extensions', title: 'Extensions', icon: 'expand'},
    { url: '/services', title: 'Services', icon: 'cogs'},
    { url: '/logs', title: 'Logs', icon: 'file-alt'}
  ];
  const changeWidthEvent = () => {
    setAside(!aside);
    props.user.setToggle(!aside);
  }
  const overLay = (navlinks) => {
    return <ListGroup className="row">
      {navlinks.map((link, index) => (
        <ListGroup.Item key={link.title} className="p-0 border-0 lineHeight-0">
        <OverlayTrigger
          key={index}
          placement='bottom'
          overlay={
            <Tooltip className="toolTip" id={`tooltip-${index}`}>
              {link.title}
            </Tooltip>
          }
        >
          <NavLink activeClassName='actStyle' exact to={link.url} className="pt-2 pb-2 d-block colorDark">
            <span className={aside ? 'offset-sm-1' : 'd-block text-center'}>
              <React.Fragment>
                <FontAwesomeIcon variant="secondary" className={aside ? "m-1 align-middle fa-lg icon" : "my-1 align-middle fa-lg"} icon={link.icon} /> <span hidden={aside ? false : true}>{link.title}</span>
                </React.Fragment>
            </span>
          </NavLink>
          </OverlayTrigger>
        </ListGroup.Item>
      ))}
    </ListGroup>
  }
  return (
    <Col md={aside ? 3 : 1} xl={aside ? 2 : 1} className={classNames(aside ? "slideIn h-100" : "h-100 slideOut aside-width", "border-right bg-white shadow-sm aside-nav")}>
      <div className="right-half-cirle" onClick={changeWidthEvent}>
        <FontAwesomeIcon className="align-middle fa-lg" icon='angle-right' />
      </div>
      <Row noGutters={true} className='mb-2'>
        <Col xs={12} className={aside ? 'text-center' : 'text-center menu-logo'}>
          <Image src={minimizelogo} alt='Logo' width='42' className="py-3 minimize-logo"/>
          <Image src={logo} alt='Logo' width='90%' className="py-3 maximize-logo"/>
        </Col>
        <hr className='mt-0 w-100' />
        <Col xs={10} className={aside ? 'offset-sm-2' : 'text-center'}>
          <Image src={userIcon} alt='userIcon' width={aside ? "43" : "30"} height={aside ? "43" : "30"} className="rounded-circle d-inline-block mb-2" />
            <div hidden={!aside} className='ml-3 d-inline-block align-middle'>
            <span className="text-dark">{props.user.userName}</span>
            <small className="text-muted d-block"> Role of user </small>
            </div>
        </Col>
        <hr className='mt-2 w-100' />
      </Row>
      {!aside ? overLay(navlinks) : <ListGroup className="row">
        {navlinks.map((link, index) => (
          <ListGroup.Item key={link.title} className="p-0 border-0 lineHeight-0">
            <NavLink activeClassName='actStyle' exact to={link.url} className="pt-2 pb-2 d-block colorDark">
              <span className={aside ? 'offset-sm-1' : 'd-block text-center'}>
              <FontAwesomeIcon className={aside ? "m-1 align-middle fa-lg icon" : "my-1 align-middle fa-lg"} icon={link.icon} /> <span hidden={aside ? false : true}>{link.title}</span>
              </span>
            </NavLink>
          </ListGroup.Item>
        ))}
      </ListGroup>}
    </Col>
  );
}

export default Nav;

import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faChartBar, faTachometerAlt, faBell, faSearch, faAngleRight, faAngleLeft, faWindowRestore, faBlenderPhone, faExpand, faCogs, faFileAlt, faEdit, faSave, faWindowClose, faUserCircle, faRedo } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Row } from 'react-bootstrap';
import history from './modules/history';
import NotFound from './routes/NotFound';
import Dashboard from './components/dashboard/Dashboard';
import Applications from './components/applications/Applications';
import Dialplan from './components/dialplan/Dialplan';
import Extensions from './components/extensions/Extensions';
import Services from './components/services/Services';
import Nav from './components/navlink/Nav';
import PublicRoute from './routes/PublicRoute';
import { loadUsers } from "./store/actions";
import Login from './components/login/Login'
import AuthenticatedRoute from './routes/AuthenticatedRoute';
import serviceRequest from './serviceRequest';
import Reports from './components/reports/Reports';
// import Home from './routes/Home';
import './App.scss';

library.add(fab, faCog, faChartBar, faTachometerAlt, faBell, faSearch, faAngleRight, faAngleLeft, faWindowRestore, faBlenderPhone, faExpand, faCogs, faFileAlt, faEdit, faSave, faWindowClose, faUserCircle, faRedo);

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: localStorage.getItem('auth') ? true : false,
            isToggle: true,
            userName: localStorage.getItem('username')
        }
    }

    setAuth = (val) => {
        localStorage.clear();
        this.setState({ isAuthenticated: val });
    }
    setToggle = (val) => {
      this.setState({ isToggle: val});
    }
    handleLogin = async (data) => {
        localStorage.clear();
        const request = await serviceRequest.login(data);
        if(request && request.access_token) {
            localStorage.setItem('auth', true);
            localStorage.setItem('token', `Bearer ${request.access_token}`);
            localStorage.setItem('username', data.username);
            this.setState({isAuthenticated: true});
            this.setState({userName: data.username});
        }
    }
    render() {
        let user = {
            shortText: 'freeSwitch',
            companyName: 'FreeSwitch',
            setAuth: this.setAuth,
            setToggle: this.setToggle,
            isToggle: this.state.isToggle,
            userName: this.state.userName,
        };

        return (
            <React.Fragment>
                <div className="d-flex h-100 p-0">
                    <Router history={history}>
                        <Row className="mx-0 w-100 h-100">
                            {this.state.isAuthenticated && <Nav user={user} />}
                            <Switch>
                                <PublicRoute
                                    isAuthenticated={this.state.isAuthenticated}
                                    path="/"
                                    exact
                                    component={Login}
                                    user={user}
                                    handleEvent = {this.handleLogin}
                                />
                                <AuthenticatedRoute
                                    isAuthenticated={this.state.isAuthenticated}
                                    path="/dashboard"
                                    component={Dashboard}
                                    exact
                                    user={user}
                                    handleEvent = {this.handleLogin}
                                />
                                <AuthenticatedRoute
                                    isAuthenticated={this.state.isAuthenticated}
                                    path="/reports"
                                    component={Reports}
                                    exact
                                    user={user}
                                    handleEvent = {this.handleLogin}
                                />
                                <AuthenticatedRoute
                                    isAuthenticated={this.state.isAuthenticated}
                                    path="/applications"
                                    component={Applications}
                                    exact
                                    user={user}
                                    handleEvent = {this.handleLogin}
                                />
                                <AuthenticatedRoute
                                    isAuthenticated={this.state.isAuthenticated}
                                    path="/dialplan"
                                    component={Dialplan}
                                    exact
                                    user={user}
                                    handleEvent = {this.handleLogin}
                                />
                                <AuthenticatedRoute
                                    isAuthenticated={this.state.isAuthenticated}
                                    path="/extensions"
                                    component={Extensions}
                                    exact
                                    user={user}
                                    handleEvent = {this.handleLogin}
                                />
                                <AuthenticatedRoute
                                    isAuthenticated={this.state.isAuthenticated}
                                    path="/services"
                                    component={Services}
                                    exact
                                    user={user}
                                    handleEvent = {this.handleLogin}
                                />
                                <Route component={NotFound} />
                            </Switch>
                        </Row>
                    </Router>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        app: state.app.app,
        loading: state.app.loading,
        error: state.app.error,
    }
}

const mapDispatchToProps = {
    loadUsers
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom';
import imagelogOut from '../images/logOut.png'

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const { user} = this.props.auth;
        const logOut = (
            <ul className="navbar-nav ml-auto">
                <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img  src={imagelogOut} alt="log out" title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px'}} />
                </a>
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </ul>
      )
      const authLinks = (
        <ul className=" navbar-nav ml-auto right">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/addAdmin">Add Admin</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/categories">Categorie</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/suggestion">Suggestion</Link>
            </li>
        </ul>
      )
      const vide = (
        <ul className="right">
    </ul>
      )
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                 {localStorage.jwtToken ? authLinks : vide}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {localStorage.jwtToken ? logOut : guestLinks}
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
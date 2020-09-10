import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../fonctions/authFunctions';
import { FormErrors } from './FormErrors';

class Register extends Component {

    constructor() {
        super();
        this.state = { 
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            Password: '',
            admin:true,
            formErrors: {email: '', password: '',Password:''},
            emailValid: false,
            cPasswordValid: false,
            passwordValid: false,
            formValid: false


        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let cPasswordValid =this.state.cPasswordValid;
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 3;
            cPasswordValid= this.state.Password === this.state.password;
            fieldValidationErrors.Password = cPasswordValid ? '': 'not equals';
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
            case 'Password':
            cPasswordValid= this.state.Password === this.state.password;
            fieldValidationErrors.Password = cPasswordValid ? '': 'not equals';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        cPasswordValid: cPasswordValid,
                        
                      }, this.validateForm);
      }


      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.cPasswordValid});
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            Password: this.state.Password,
            admin:this.state.admin,
        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/users')
        }
    }

    // componentDidMount() {
    //     if(this.props.auth.isAuthenticated) {
    //         this.props.history.push('/');
    //     }
    // }

    render() {
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Add New Admin</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Name"
                    name="first_name"
                    onChange={ this.handleInputChange }
                    value={ this.state.first_name }
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    onChange={ this.handleInputChange }
                    value={ this.state.last_name }
                    />
                </div>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    name="Password"
                    onChange={ this.handleInputChange }
                    value={ this.state.Password }
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>
                        Add Admin
                    </button>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
            </form>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))
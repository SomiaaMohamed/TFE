import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser,getUser } from '../fonctions/userFunction'

class Edit extends Component {

  constructor(props) {

    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: this.props.email,
      first_name: '',
      last_name: '',
      id: ''
    }
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id)
    


  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        email: nextProps.user.email,
        first_name: nextProps.user.first_name,
        last_name: nextProps.user.last_name,
        id: nextProps.user._id
      })
    }
    else{
      this.props.history.push('/users')
    }
  }


  onChange = (e) => {
   this.setState({
     [ e.target.name ]: e.target.value
   })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      id: this.state.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email
    };
   this.props.updateUser(obj,this.props.history)

  }


  render() {
    return (
      this.props.user ? (<div>
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
        <h2 style={{marginBottom: '40px'}}>Update User</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Email:  </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Person First Name: </label>
              <input type="text"
              name="first_name"
                className="form-control"
                defaultValue={this.state.first_name}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label>Person Last Name: </label>
              <input type="text"
                className="form-control"
                name="last_name"
                defaultValue={this.state.last_name}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input type="submit"
                value="Update"
                className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>) : (<div>... Loading </div>)

    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userFunctionReducer.user,


  }
}

Edit.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  // user : PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { getUser,updateUser })(Edit);
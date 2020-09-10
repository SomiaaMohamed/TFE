import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllUsers, deleteUser } from '../fonctions/userFunction'
import PropTypes from 'prop-types';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import imagedelete from '../images/delete.png'
import imageEdit from '../images/edit.png'

class Users extends Component {
  state = {
    columns: [{
      dataField: 'email',
      text: 'Email',
      sort: true,
      filter: textFilter()
    },
    {
      dataField: 'last_name',
      text: 'Last Name',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'first_name',
      text: 'First Name',
      sort: true,
      filter: textFilter()
    },
    {
      dataField: 'date',
      text: 'Date Inscription',
      sort: true,
      filter: dateFilter(),
      formatter: (cellContent: string, row: IMyColumnDefinition) => {

        let date = new Date(cellContent.replace('- - -', '/').substr(0, 10))
        let test = date.toLocaleString()
        let res = test.substr(0, 10)
        return res

      }

    },
    {
      dataField: 'id',
      formatter: this.renderButtons,
      text: '',
      headerTitle: false,
      headerStyle: (colum, colIndex) => {
        return { width: '4%', textAlign: 'center' };
      }
    },
    {
      dataField: '_id',
      text: "",

      formatter: (cellContent: string, row: IMyColumnDefinition) => {

        return <img src={imagedelete} alt="delete"
          className="rounded-circle"
          title='Delete'

          style={{ width: '21px', marginRight: '5px' }}
          onClick={() => this.handleDelete(row)}
        />

      },
      headerStyle: (colum, colIndex) => {
        return { width: '4%', textAlign: 'center' };
      }
    }
    ]
  }
  handleDelete(row) {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure to delete ' + row.email + ' .',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.deleteUser(row._id)
        },
        {
          label: 'No',
        }
      ]
    })

  }


  renderButtons(cell, row) {
    return (
      <span>
        <Link


          to={"/edit/" + row.email}
          title="Edit"
          recordable_id={cell}
        > <img src={imageEdit} alt="Edit"
          className="rounded-circle"

          style={{ width: '21px', marginRight: '5px' }}
          />
        </Link>
      </span>

    );
  }

  componentDidMount() {
    const id = this.props.auth.user._id
    console.log(id)
    this.props.getAllUsers()
  }

  render() {
    console.log(this.props.auth.user)
    let users = this.props.users.filter(user => {
      return this.props.auth.user._id !== user._id
    })
    return (
      users.length ? (


        <div className="container" style={{ marginTop: 50 }}>
          <BootstrapTable
            striped
            hover
            keyField='_id'
            data={users}
            columns={this.state.columns}
            filter={filterFactory()}
            pagination={paginationFactory()}

          />
        </div>)
        :
        (<div className="center">No post Yet</div>)
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userFunctionReducer.users,
    auth: state.auth,


  }
}


Users.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { getAllUsers, deleteUser })(Users);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {getSugg, getAllCat,newCat,conCat,delSugg } from '../fonctions/categoriesFunctions'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import imagedelete from '../images/delete.png'
import imageadd from '../images/add.png'
import confirm from '../images/confirm.png'
import imageEdit from '../images/edit.png'
import { Link } from 'react-router-dom';


class Suggestion extends Component {

  state = {
    newCat:'',
    columns: [{
      dataField: 'name',
      text: 'Categorie suggestion',
      sort: true,
      filter: textFilter(),

    },
    {
      dataField: '_id',
      text: "",

      formatter: (cellContent: string, row: IMyColumnDefinition) => {

        return <img src={confirm} alt="confirme"
          className="rounded-circle"
          title='Confirme'

          style={{ width: '21px', marginRight: '5px' }}
          onClick={() => this.handleConfirm(row)}
        />
      },
      headerStyle: (colum, colIndex) => {
        return { width: '4%', textAlign: 'center' };
      }
    },
 
    {
      dataField: 'id',
      text: "",

      formatter: (cellContent: string, row: IMyColumnDefinition) => {

        return <img src={imagedelete} alt="delete"
          className="rounded-circle"
          title='delete'

          style={{ width: '21px', marginRight: '5px' }}
          onClick={() => this.handleDelete(row)}
        />
      },
      headerStyle: (colum, colIndex) => {
        return { width: '4%', textAlign: 'center' };
      }
    }

    ],

  }

  handleDelete(row) {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure to delete ' + row.name + ' .',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.delSugg(row._id)
        },
        {
          label: 'No',
        }
      ]
    })

  }

  handleConfirm(row) {
    confirmAlert({
      title: 'Confirm ',
      message: 'Are you sure to confirm ' + row.name + ' .',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.conCat(row._id)
        },
        {
          label: 'No',
        }
      ]
    })

  }




  componentDidMount() {
    this.props.getSugg()
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
    
  }


  render() {
    let cat = this.props.sugg
    return (
      cat ? (


        <div className="container" style={{ marginTop: 50 }}>
          <BootstrapTable
            striped
            hover
            keyField='_id'
            data={cat}
            columns={this.state.columns}

            filter={filterFactory()}

          />
  
        </div>) : (<div>not yet</div>)
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sugg: state.categoriesReducer.sugg
  }
}

Suggestion.propTypes = {
  getSugg: PropTypes.func.isRequired,
  conCat : PropTypes.func.isRequired,
  delSugg : PropTypes.func.isRequired,
  
}

export default connect(mapStateToProps, { getSugg,conCat,delSugg })(Suggestion);

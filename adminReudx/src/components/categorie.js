import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getAllCat,newCat,conCat,delCat } from '../fonctions/categoriesFunctions'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import imagedelete from '../images/delete.png'
import imageadd from '../images/add.png'
import confirm from '../images/confirm.png'


class Categorie extends Component {

  state = {
    newCat:'',
    col: [{
      dataField: 'name',
      text: 'Categorie',
      sort: true,
      filter: textFilter(),

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
      message: 'Are you sure to delete ' + row.name + ' .',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.delCat(row._id)
        },
        {
          label: 'No',
        }
      ]
    })

  }

  componentDidMount() {
    this.props.getAllCat()
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  handleSubmit = (e) => {
    e.preventDefault(e)
    const categorie = {
      name: this.state.newCat
    }
    this.props.newCat(categorie)
    this.setState({
      newCat:''
    })
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
    
  }


  render() {
    let cat = this.props.categories
    return (
      cat ? (


        <div className="container" style={{ marginTop: 50 }}>

<BootstrapTable
            striped
            hover
            keyField='_id'
            data={cat}
            columns={this.state.col}
            filter={filterFactory()}

          />
  
          

          <form onSubmit={ this.handleSubmit}>
            <input 
            name="newCat"
            value={this.state.newCat}
              onChange={this.handleInputChange}
            />
            <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={!this.state.newCat}>
                        Create New
                    </button>
                </div>
          </form>
        </div>) : (<div>not yet</div>)
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer.categories
  }
}

Categorie.propTypes = {
  getAllCat: PropTypes.func.isRequired,
  newCat:  PropTypes.func.isRequired,
  conCat : PropTypes.func.isRequired,
  delCat : PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { getAllCat,newCat,conCat,delCat })(Categorie);

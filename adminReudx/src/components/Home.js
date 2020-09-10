import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllUsers,getAll } from '../actions/usersActions';
import PropTypes from 'prop-types';
import       '../../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Link , NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css'
// import console = require('console');
//import console = require('console');


export default class Home extends Component {

  submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are sure to do this.',
      div : [
        {
          input :''
        }
      ]
      
    })
  };

  test = () => {
    fetch('/users/getAll',{
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q0YTRlMDBhYzQ2YjNlNDBhMTU4MzYiLCJmaXJzdF9uYW1lIjoiYW1pbmUiLCJsYXN0X25hbWUiOiJ1c2VyIiwiZW1haWwiOiJVc2VyMkBnbWFpbC5jb20iLCJuZXdNZXNzYWdlIjpmYWxzZSwiaWF0IjoxNTU3NTI2NjI2LCJleHAiOjE1NTc1MjgwNjZ9.gZf2l53nGBrTuQLffIpeVH4V5f8eJZOQSd5MB29lj4A', 
 
      }
    })
    .then( res => {
       console.log(res)
    })
    .catch(err => {
        confirmAlert({
            message: 'Serveur Error Please Try Later',
            buttons: [
                {
                    label: 'Ok',
                },
            ]
        })
    });

  }


  render() {
    return (
      <div className="container">
        <button onClick={this.submit}>Confirm dialog</button>
        
        <button onClick={this.test}>serveur</button>
      </div>
  
    );
  }
}



//  class Home extends Component {
// //      state ={
// //         columns: [{
// //             dataField: 'email',
// //             text: 'Email',
// //             sort: true,
// //             filter: textFilter()
// //           },
// //           {
// //             dataField: 'last_name',
// //             text: 'Last Name',
// //             sort: true,
// //             filter: textFilter()
// //           }, {
// //             dataField: 'first_name',
// //             text: 'First Name',
// //             sort: true,
// //             filter: textFilter()
// //           },
// //           {
// //             dataField: 'date',
// //             text: 'Date Inscription',
// //             sort: true,
// //             filter: dateFilter(),
// //             formatter :(cellContent: string, row: IMyColumnDefinition)  =>{
              
// //                let  date = new Date(cellContent.replace('- - -','/').substr(0,10))
// //                let test = date.toLocaleString()
// //                let res = test.substr(0,10)
// //                console.log(res)
// //               return res
            
// //             }
// //           },
// //           {dataField: 'id',
// //             text: "Remove",
// //             formatter: (cellContent: string, row: IMyColumnDefinition) => {
// //               // if (row.canRemove)
// //                     return <button className="btn btn-danger btn-xs" onClick={() => this.handleDelete(row)}>Delete</button>
// //               //return null
// //             },
// //         }
      
          
          
// //       ]
// //      }

// //      handleDelete(row){
// //          console.log(row)
// //     //    const _id = row._id
// //        // deleteOne(_id).then(
// //        //   res=>{
// //        //     console.log(res)
// //        //   }
// //        // )
// //       // window.location.reload()
// //      }
 

// //      renderButtons(cell, row) {
// //     //     console.log(row)
// //     //     return (
// //     //       <span>
// //     //         <Link
    
          
// //     // to={"/edit/"+row.email}
// //     //           className="btn btn-primary"
// //     //           title="Edit User"
// //     //           recordable_id={cell}
// //     //         >
// //     //           <i className="fa fa-plus" aria-hidden="true" /> Edit
// //     //         </Link>
// //     // </span>
          
// //     //     );
// //       }

// //     componentDidMount(){
// //        this.props.getAllUsers()
// //     }

// //     render() {
// //         let users =this.props.users.users
// //         console.log(users)
// //         return (

// //             <div></div>
// //     //          users.length ? (
             
             
// //     //             <div className="container" style={{ marginTop: 50 }}>
// //     //             <BootstrapTable 
// //     //    striped
// //     //    hover
// //     //    keyField='_id' 
// //     //    data={ users } 
// //     //    columns={ this.state.columns }
// //     //    filter={ filterFactory() } 
// //     //    pagination={ paginationFactory()}
       
// //     //    />
// //     //        </div>
                
                
                
                
// //     //             ) : (<div className="center">No post Yet</div>) 



// //         //     <div className="container" style={{ marginTop: 50 }}>
// //         //          <BootstrapTable 
// //         // striped
// //         // hover
// //         // keyField='_id' 
// //         // data={ users } 
// //         // columns={ this.state.columns }
// //         // filter={ filterFactory() } 
// //         // pagination={ paginationFactory()}
       

        
// //         // />
// //         //     </div>
// //         );



            
// //     }
// // }

// // // mapDispatchToProps = (dispatch) =>{
// // // return {
// // //     getAll : () => {dispatch({ type:"GET_ALL_USERS"})};
// // // }
// // // }

// // const mapStateToProps = (state) => {
// //     return {
// //         users:state.userFunctionReducer
// //     }
// // }


// // Home.propTypes = {
// //     getAllUsers: PropTypes.func.isRequired,
// // }

// // export default connect (mapStateToProps, { getAllUsers } ) (Home);
import {GET_ALL_CAT,NEW_CAT,CON_CAT, SUG_CAT, DEL_CAT ,DEL_SUGG} from '../actions/types'

const initialState ={
    categories :[],
    sugg:[],
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_ALL_CAT:
        //console.log(action.payload.data)
            return {
               // ...state,
                categories: action.payload.data,
            }
            case NEW_CAT:
            let categories = [...state.categories,action.payload.data]
                return {
                categories
                }

                case CON_CAT:

                let newCat = state.sugg.filter(cat=>{
                     return action.payload.data !== cat._id
                })
                return {
                    ...state,
                    sugg:newCat
                }

                case DEL_CAT:
               // let catego = [...state.categories,action.payload.data]
               // console.log(action.payload.data)
               // console.log("hello")
                let newcate = state.categories.filter(cat=>{
                   // console.log(cat._id)
                     return action.payload.data !== cat._id
                })

                // //console.log(newCat)
                return {
                    ...state,
                    categories:newcate
                }
                case DEL_SUGG:
                    // let catego = [...state.categories,action.payload.data]
                     console.log(action.payload.data)
                    // console.log("hello")
                    //  let newcate = state.categories.filter(cat=>{
                    //     // console.log(cat._id)
                    //       return action.payload.data !== cat._id
                    //  })
     
                     // //console.log(newCat)
                    //  return {
                    //      ...state,
                    //      categories:newcate
                    //  }

                case SUG_CAT:
                console.log(action.payload.data)
                return {
                     sugg: action.payload.data,
                 }
         
        default: 
       
            return state;
    }
}
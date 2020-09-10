import { GET_ALL_CAT , NEW_CAT ,CON_CAT,SUG_CAT,DEL_CAT,DEL_SUGG} from './types'

export const getAllCatActions = data => {
    return {
        type : GET_ALL_CAT,
        payload: {data}
    }
}

export const newCatActions = data => {
    return {
        type : NEW_CAT,
        payload: {data}
    }
}

export const conCatActions = data => {
    return {
        type : CON_CAT,
        payload: {data}
    }
}

export const delCatAction = data => {
    return {
        type : DEL_CAT,
        payload: {data}
    }
}
export const delSuggAction = data => {
    return {
        type : DEL_SUGG,
        payload: {data}
    }
}

export const getSuggCatActions = data => {
    return {
        type : SUG_CAT,
        payload: {data}
    }
}
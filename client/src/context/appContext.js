import {createContext, useReducer, useState} from "react"

import Reducer from "./reducer"

const initialState = {
    isFetching:false,
    moments:[],
    error:null
}
export const Context = createContext(initialState)

export default function ContextProvider({children}){
    const [user, setUser] = useState(false)
    const [tag, setTag] = useState("")
    const [show, setShow] = useState(false)
   const [ state, dispatch ]= useReducer(Reducer, initialState)

    return(
        <Context.Provider value={
            {
                dispatch,
                user, setUser,
                tag, setTag,
                show, setShow,
                isFetching:state.isFetching,
                moments:state.moments,
                error:state.error
            }
            }>
            {children}
        </Context.Provider>
    )
}


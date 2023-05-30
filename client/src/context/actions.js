export const initateLoading = ()=>({
    type:"LOAD_MOMENTS"
})

export const loadingSuccess = (moments)=>({
    type:"LOADING_SUCCESS",
    payload: moments,

})
export const loadingFailure = (error)=>({
    type:"LOADING_FAILURE",
    payload:error
})


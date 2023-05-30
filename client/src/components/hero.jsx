import { Box } from "@mui/material"


const Hero = ()=>{
    return(
        <Box sx={{position:"relative",height:"40vh" }}>
            <div style={{height:"100%",width:"100%", color:"white", display:"flex", justifyContent:"center", alignItems:"center", position:"absolute", background:"rgba(0,0,0,0.4"}}><h3>Forever edged in Space</h3></div>
            <div>
            <img src="https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BhY2UlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" style={{height:"100%",position:"absolute", objectFit:"fill", width:"100%"}}/>
            </div>
            
        </Box>
    )
}
export default Hero
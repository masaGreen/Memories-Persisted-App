import { Typography, Box } from "@mui/material"

const Footer =()=>{
    return(
        <Box sx={{display:"grid", placeContent:"center",position:"fixed", bottom:0, height:"40px",width:"100%", background:"linear-gradient(rgba(223, 221, 221,0.4), rgba(223,221,221, 0.6))"}}>
            <Typography variant="p" component="h5">copyright @2022</Typography>
        </Box>
    )
}
export default Footer
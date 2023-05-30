import {Box} from "@mui/material"
import Navbar from "./Navbar"
import Footer from "./footer"

const Layout = ({children})=>{
    return(
        <Box>
            <Navbar/>
            
            <Box sx={{display:"flex"}}>
            {children}
            </Box>
            <Footer/>
        </Box>
    )
}
export default Layout
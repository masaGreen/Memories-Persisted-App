import { Toolbar, Typography, Box, AppBar, styled } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate, useSearchParams} from "react-router-dom";
import { Context } from "../context/appContext";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import navbar from "./navbar.module.css";

const MyAppBar = styled(AppBar)({
  position: "fixed",
  color: "black",
  height: "60px",
  zIndex: 1000,
  background:
    "linear-gradient(50deg,rgba(223, 221, 221,0.6), rgba(223,221,221, 0.8))",
});

const Navbar = () => {
  const navigate = useNavigate()
  
  const {setTag, setUser,show, setShow} = useContext(Context)
  const [, setSearchParams] = useSearchParams()
  const handleNavigate = ()=>{
    setTag("")
    setSearchParams({})
    navigate("/")
  }
  const handleLogout = ()=>{
    setUser(false)
    navigate("/login")
    setShow(false)
  }
  return (
    <Box>
      <MyAppBar elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link to="/createmoment" style={{ textDecoration: "none" }}>
          <button className={navbar.iconbox}><AddIcon/></button>
          {show && <div className={navbar.momenthide}>
            <Typography
            variant="h4"
            component="h6"
            sx={{ color: "teal", fontSize: "17px" }}
          >
            Add a Moment
          </Typography>
          </div>}
        </Link>
          <Link to="/" style={{ textDecoration: "none" }} >
          <button className={navbar.iconbox} onClick={handleNavigate}><HomeIcon/></button>
            <div className={navbar.momenthide}>
              <Typography
              onClick={handleNavigate}
              align="right"
              variant="h6"
              component="h3"
              sx={{ fontWeight: 400, fontFamily: "'Pacifico', cursive" }}
            >
              Life Moments/Home
            </Typography>
            </div>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }} >
          
            {show &&<Typography
              onClick={handleLogout}
              align="right"
              variant="h6"
              component="h3"
              sx={{ fontWeight: 400, fontFamily: "'Pacifico', cursive" }}
            >
              Logout
            </Typography>}
          </Link>
        </Toolbar>
      </MyAppBar>
    </Box>
  );
};
export default Navbar;

import notfoundStyles from "./404.module.css"
import { Link } from "react-router-dom"
const NotFound = ()=>{
    return(
        <div className={notfoundStyles.wrapper}>
            <h4 style={{fontSize:"20px"}}>page not found, go back <Link to="/" className={notfoundStyles.link}><span>home</span></Link></h4>
        </div>
    )
}
export default NotFound
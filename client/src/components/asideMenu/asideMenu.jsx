import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import asideStyles from "./asideMenu.module.css"
import axios from 'axios';
import { useContext } from 'react';
import { useSearchParams} from "react-router-dom"
import { Context } from '../../context/appContext';
const AsideMenu = ()=>{
    
    
    const {dispatch,tag, setTag} = useContext(Context)
    const [ searchParams, setSearchParams] = useSearchParams()
    const handleTag = async(tagged)=>{

        setSearchParams({tag:tagged})
        setTag(tagged)
        dispatch({type:"LOAD_MOMENTS"})
        try {
            console.log("log")
            const response = await axios.get(`http://localhost:8080/api?tag=${tag}`)
            console.log(response.data)
            dispatch({type:"LOADING_SUCCESS", payload:response.data})

        } catch (error) {

            dispatch({type:"LOADING_FAILURE", payload:error})
        }
        
    }

    return(
        <div className={asideStyles.asideMenuWrapper}>
            <h3 className={asideStyles.asidetitle}>About me</h3>
            <img className={asideStyles.asideMenuImg} src="https://images.unsplash.com/photo-1556711905-4bd1b6603275?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt=""/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, libero pariatur voluptatem modi dolorum sapiente sunt ducimus. Modi, ipsa hic.
            </p>
            <div className={asideStyles.asideMenuCat}>
                <ul className={asideStyles.asideMenuList}>
                    <div>
                    <li className={asideStyles.asideMenuItem} onClick={()=>handleTag("Family")}>Family</li>
                    <li className={asideStyles.asideMenuItem} onClick={()=>handleTag("Music")}>Music</li>
                    <li className={asideStyles.asideMenuItem} onClick={()=>handleTag("Classes")}>Classes</li>
                    </div>
                    <div>
                    <li className={asideStyles.asideMenuItem} onClick={()=>handleTag("Sports")}>Sports</li>
                    <li className={asideStyles.asideMenuItem} onClick={()=>handleTag("Work")}>Work</li>
                    <li className={asideStyles.asideMenuItem} onClick={()=>handleTag("Nature")}>Nature</li>
                    </div>
                </ul>
            </div>
            <div className={asideStyles.asideIcons}>
            <FacebookIcon  className={asideStyles.fb}/>
            <PinterestIcon className={asideStyles.pi}/>
            <InstagramIcon className={asideStyles.ig}/>
            <TwitterIcon className={asideStyles.tw}/>
            </div>

        </div>
    )
}
export default AsideMenu
import momentStyles from "./momentForm.module.css"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import {useNavigate,useParams} from "react-router-dom";
import { useContext,useState} from "react";
import {Context} from "../../context/appContext";
import axios from 'axios'
const MemoryEdit = ()=>{
    const {id} = useParams()
    const navigate = useNavigate()
    const {moments} = useContext(Context)
    const moment = moments.find(moment=>moment.id === id)
    const [errors, setError] = useState(null)
    const [caption, setCaption] = useState(moment.caption)
    const [description, setDescription] = useState(moment.description)
    const [tag, setTag] = useState(moment.tag)
    const [file, setFile] = useState("")
    const [image, setImage] = useState(moment.image)

    const handleImage = (e)=>{
        
        setFile(e.target.files[0])
        setImage(null)
        
    }
    const handleFormDataUpdate = async(e)=>{
        e.preventDefault()
        const data = {
            caption,
            description,
            tag,
            image
        }
        if(file.name !== undefined && (file.name !== (moment.image.split("-")[1]))){
            console.log("hell")
            const formData = new FormData()
            const fileName = `${Date.now()}_${file.name}`
            formData.append("name", fileName)
            formData.append("uploadFile", file)
            data.image = fileName
            try {
                await axios.put(`http://localhost:8080/api/${moment.id}`, data)
                setTimeout(() => {
                    navigate("/")
                  }, 500);
            } catch (error) {
                setError(error)
            }
            try {
                await axios.post("http://localhost:8080/api/imageupload", formData)
            } catch (error) {
                setError(error)
            }
        }
        
        try {
                await axios.put(`http://localhost:8080/api/${moment.id}`, data)
                setTimeout(() => {
                    navigate("/")
                  }, 500);
            } catch (error) {
                setError(error)
            }
        
      
    }
    return(
        <div className={momentStyles.formWrapper}>
            {errors?<h2>{errors.message}</h2>:
            <div className={momentStyles.form}>
               
                <form className={momentStyles.formmain} onSubmit={handleFormDataUpdate}>
                    <div className={momentStyles.imageWrapper}>
                        <img src={`http://localhost:8080/${moment.image}`} alt="" className={momentStyles.image}/>
                        
                    </div>
                    <label>caption</label>
                    <input type="text" placeholder="enter your caption" required autoFocus value = {caption} onChange={(e)=>setCaption(e.target.value)}/>
                    <label>Description</label>
                    <textarea type="text" rows="5" placeholder="describe your moment here" value = {description} onChange={(e)=>setDescription(e.target.value)}/>
                    <label>Select tag</label>
                    <select className={momentStyles.selectTag} value={tag} onChange={(e)=>setTag(e.target.value)}>
                        <option>Family</option>
                        <option>Music</option>
                        <option>Classes</option>
                        <option>Sports</option>
                        <option>Work</option>
                        <option>Nature</option>
                    </select>
                    <label className={momentStyles.uploadformgroup} htmlFor="uploadFile"><div style={{display:"flex", alignItems:"center"}}><AddCircleOutlineIcon/> upload image</div></label>
                    <input type="file" className={momentStyles.upload} id="uploadFile" name="uploadFile" onChange={(e)=>handleImage(e)}/>
                    <button type="submit" className={momentStyles.submit} >Publish</button>
                </form>
            </div>}
        </div>
    )
}
export default MemoryEdit
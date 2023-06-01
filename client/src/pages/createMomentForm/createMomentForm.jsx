import createMomentStyles from "./createMomentForm.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateMoment = () => {
  const caption = useRef("");
  const description = useRef("");
  const tagged = useRef("");
  const [notify, setNotify] = useState(false)
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 

  function handleFiling(e){
    setFile(e.target.files[0])
    setNotify(true)

  }
  const handleFormData = async (e) => {
    setNotify(false)
    e.preventDefault();
    const data = {
      caption: caption.current.value,
      description: description.current.value,
      tag: tagged.current.value,
    };
    if (file) {
      //handle file upload to the server and send the image string reference to the db
      const formData = new FormData();
      const filename = `${Date.now()}-${file.name}`;
      formData.append("name", filename);
      formData.append("uploadFile", file);

      data.image = filename;

      try {
        await axios.post("http://localhost:8080/api", data);
   
        
        e.target.reset();
      } catch (error) {
        setError(error);
      }

      //post the data to backend
      try {
        await axios.post("http://localhost:8080/api/imageupload", formData);
        
        setTimeout(() => {
          navigate("/")
        }, 500);
        
      } catch (error) {
        setError(error);
      }
    }else{
      try {
        await axios.post("http://localhost:8080/api", data);
        console.log("no file")
        e.target.reset();
      } catch (error) {
        setError(error);
      }
    }

    
  };
  return (
    <div className={createMomentStyles.formWrapper}>
      {error ? (
        <h3>{error}</h3>
      ) : (
        <div className={createMomentStyles.form}>
          <form
            className={createMomentStyles.formmain}
            id="formid"
            onSubmit={handleFormData}
            encType="multipart/form-data"
          >
            <div className={createMomentStyles.iconWrapper}>
              <EditIcon className={createMomentStyles.editicon} />
            </div>
            <label htmlFor="caption">Caption</label>
            <input
              type="text"
              id="caption"
              name="caption"
              placeholder="enter your caption"
              ref={caption}
              required
              autoFocus
            />
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              rows="5"
              placeholder="describe your moment here"
              ref={description}
            />
            <label htmlFor="tagged">Select tag</label>
            <select
              className={createMomentStyles.selectTag}
              ref={tagged}
              id="tagged"
              name="tagged"
            >
              <option>Family</option>
              <option>Music</option>
              <option>Classes</option>
              <option>Sports</option>
              <option>Work</option>
              <option>Nature</option>
            </select>
            <label
              className={createMomentStyles.uploadformgroup}
              htmlFor="uploadFile"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <AddCircleOutlineIcon /> upload image
                {notify?<p style={{color:"green", marginLeft:"2rem", fontSize:"0.8rem", fontStyle:"italic"}}>image uploaded</p>:""}
              </div>
            </label>
            <input
              type="file"
              className={createMomentStyles.upload}
              onChange={(e) => handleFiling(e)}
              id="uploadFile"
              name="uploadFile"
            />
            <button type="submit" className={createMomentStyles.submit}>
              Publish
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default CreateMoment;

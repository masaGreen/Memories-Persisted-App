import memoryStyles from "./memory.module.css";
import { Link, useParams } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import {useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Memory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [error, setError] = useState(null);
  const [ memory, setMemory] = useState("")

  useEffect(()=>{
    const fetchAmoment = async()=>{
      const res = await axios.get("http://localhost:8080/api/getmoment/"+id)
      setMemory(res.data)
    }
    fetchAmoment()
  },[id])

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/${memory.id}`);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className={memoryStyles.memoryWrapper}>
      {error && <h3>Something went wrong try again</h3>}
      {memory === "" ? (
        <h3>Laoding...</h3>
      ) : (
        <div className={memoryStyles.memoryCard}>
          <div className={memoryStyles.titletime}>
            <h4 className={memoryStyles.memoryCardTitle}>{memory.caption}</h4>
            <button title="delete"
              className={`${memoryStyles.titledelete} ${memoryStyles.iconbox}`}
              onClick={handleDelete}
            >
              <DeleteForeverIcon 
                className={`${memoryStyles.delete} ${memoryStyles.likeIcon}`}
              />
              
            </button>
            <Link to={`/memories/memoryedit/${memory.id}`}>
              <button className={memoryStyles.iconbox} title="edit">
                <EditIcon className={memoryStyles.edit} />
                
              </button>
            </Link>
          </div>
          <div className={memoryStyles.mainsection}>
            <div  className={memoryStyles.imgWrapper}>
              <img
                src={`http://localhost:8080/${memory.image}`}
                alt=""
                className={memoryStyles.memoryCardImg}
              />
            </div>
            <div
              style={{
                display: "block",
                width:"60%",
                marginLeft: "1rem",
                
              }}
            >
              <div className={memoryStyles.texwrapper}>
                <p className={memoryStyles.memoryCardDesc}>
                  {memory.description}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ul className={memoryStyles.tag}>
                  <li className={memoryStyles.tagitem}>#{memory.tag}</li>
                </ul>
                <div className={memoryStyles.cardactions}>
                  <p className={memoryStyles.memorytime}>{new Date(memory.createdAt).toDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Memory;

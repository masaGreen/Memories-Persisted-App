import memoryStyles from "./memories.module.css";
import { Grid } from "@mui/material";
import { Link , useSearchParams} from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/appContext";
import { useEffect } from "react";
import { useCallback } from "react";
import axios from "axios";

const Memories = () => {
  
  const [, setSearchParams] = useSearchParams()
  const { moments, dispatch, error, isFetching,tag, setTag } = useContext(Context);

 const handleTag = (values)=>{
  setTag(values) 
  setSearchParams({tag:values})
 }

   
  const fetchMomentss = useCallback(async () => {
    
    dispatch({type:"LOAD_MOMENTS"})
    try {
        
        const response = await axios.get(`http://localhost:8080/api?tag=${tag}`)
        dispatch({type:"LOADING_SUCCESS", payload:response.data})
        
    } catch (error) {

        dispatch({type:"LOADING_FAILURE", payload:error})
    }
    
  }, [dispatch,tag]);
 
  useEffect(() => {
    fetchMomentss();
   
  }, [fetchMomentss, ]);

  const imageDirectory = "http://localhost:8080/";
  // const imageDirectory = "http://localhost:5000/";
  return (
    <div className={memoryStyles.memoriesWrapper}>
      <div>
        <h2 className={memoryStyles.memoriestitle}>Life Forever Cast Here.</h2>
        <Grid container>
          {isFetching && <h2>Loading Moments</h2>}

          {error && <h2>error fetching memories, {error.message}</h2>}
          {moments.length > 0 ? (
            moments.map((memory) => {
              return (
                <Grid item xs={12} sm={12} md={6} key={memory.id} >
                  <div className={memoryStyles.memoryCard}>
                    <div className={memoryStyles.titletime}>
                      <h4 className={memoryStyles.memoryCardTitle}>
                        {memory.caption}
                      </h4>
                      {/* time and date */}
                      <p className={memoryStyles.memorytime}>{new Date(memory.createdAt).toDateString()}</p>
                    </div>
                    <Link to={`/memories/${memory.id}`}>
                      <img
                        src={`${imageDirectory}${memory.image}`}
                        alt=""
                        className={memoryStyles.memoryCardImg}
                      />
                    </Link>

                    <p className={memoryStyles.memoryCardDesc}>
                      {memory.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <ul className={memoryStyles.tag}>
                        
                        <li className={memoryStyles.tagitem} onClick={()=>handleTag(memory.tag)} name="tag">#{memory.tag}</li>
                      </ul>
                      
                    </div>
                  </div>
                </Grid>
              );
            })
          ) : (
            <h4>No Moments saved yet</h4>
          )}
        </Grid>
      </div>
    </div>
  );
};
export default Memories;

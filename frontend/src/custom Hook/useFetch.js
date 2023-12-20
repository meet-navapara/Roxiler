import  axios  from "axios";
import { useEffect, useState } from "react";

 function useFetch(url)
{
    let [state,setstate]=useState({})
    useEffect(()=>{
        fetchdata()
    },[])
    
   async function fetchdata(){ let {data}=await axios.get(url);
    setstate(data)
   
}
return {state};
}
export default useFetch;
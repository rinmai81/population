import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetch(url) {
  const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  
  useEffect(() =>{
    // setLoading(true);
    // axios.get(url).then((response) =>{
    //   setData(response.responseData);
    //   return response.json()
    // }).catch((err) =>{
    //   setError(err);
    // }).finally(() =>{
    //   setLoading(false);
    // })
    fetch(url).then((response) =>{
      return response.json()
    }).then((response) =>{
      setData(response.responseData);
    });
  },[url]);

  const refetch = ()=>{
    // setLoading(true);
    //   axios.get(url).then((response) =>{
    //     setData(response.responseData);
    //     return response.json()
    //   }).catch((err) =>{
    //     setError(err);
    //   }).finally(() =>{
    //     setLoading(false);
    //   })
      fetch(url).then((response) =>{
        return response.json()
      }).then((response) =>{
        setData(response.responseData);
      });
  }

  return { data, refetch }
}

export default useFetch;

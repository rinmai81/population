import { useEffect, useState } from 'react';
// "https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/106"
function useFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch(url)
      const data = await res.json()
      setData(data.responseData);
    }
    fetchPrices()
  }, [url]);

  const refetch = ()=>{
      fetch(url).then((response) =>{
        return response.json()
      }).then((response) =>{
        setData(response.responseData);
      });
  }

  return { data, refetch }
}

export default useFetch;

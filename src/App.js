import React, { useState } from 'react';
import logo from './logo.svg'; //引用圖片放這
import './App.css'; //版面css放這
import GroupBarChart from './components/GroupBarChart';
import useFetch from './useFetch';
import _ from 'lodash';

// 範例
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// api練習
function Getfetch() {
  const { data, refetch } = useFetch("https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/106");
  const [value, setValue] = useState();
  const [enddata, setEnddata] = useState();
  // if (loading) {
  //   <h1>LOADING...</h1>
  // }
  // if (error) {
  //   console.log(error);
  // }
  let taipeidata = [];
  _.toArray(data).map((e) => {
    if (e.site_id.indexOf('臺北市') > -1) {
      taipeidata.push(e);
    }
  });
  console.log(typeof(taipeidata[0]));

  const handleChange = (e) =>{
    // 取select值
    setValue(e.target.value);
    if ( value != undefined ){
      // 傳select值, 找json對到的資料
    const searchtext = value.split(" - ");
    let resultone = [];
    _.toArray(data).map((e) => {
      if (e.site_id.indexOf(searchtext[0]) > -1 && e.village.indexOf(searchtext[1]) > -1) {
        resultone.push(e);
      }
    });
    // console.log(resultone[0]);
    setEnddata(resultone[0]);
    }
  }

  const result = taipeidata.map((entry, index) => {
    return <option key={index} value={index}>{entry.site_id} - {entry.village}  </option>
  })

  return (
    <div>
      <select onChange={ handleChange }>{ result }</select>

      <SetChart chartdata={ enddata } />
    </div>
  )
}



function SetChart(props) {
  const { chartdata } = props;
  // console.log(chartdata);
  const [userData, setUserData] = useState({
    labels: ['共同生活戶', '獨立生活戶'],
    datasets: [
      [
        {
          label: '女',
          // data: data.chartdata.household_ordinary_f,
          backgroundColor: 'lightpink',
        },
        {
          label: '男',
          // data: data.chartdata.household_ordinary_m,
          backgroundColor: 'lightblue',
        },
      ],
    ],

  });
  return (
    <GroupBarChart chartData={userData} />
  );
}

function App() {
  

  return (
    <div className="App">
      <Getfetch />
    </div>
  );
}



export default App;

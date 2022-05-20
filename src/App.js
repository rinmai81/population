import React, { useEffect,useState } from 'react';
import logo from './taipeilogo.png'; //引用圖片放這
import './App.css'; //版面css放這
import GroupBarChart from './components/GroupBarChart';
import useFetch from './useFetch';
import _ from 'lodash';

// app > leftpage + rightpage
// rightpage > topselect + chartpage
// topselect > useFetch + datafilter

// 取api JSON
function GetFetch() {
  const { data, refetch } = useFetch("https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/106");

  return (
    <div>
      <DataFilter data={ data } />
    </div>
  );
}

//資料篩選 臺北市
class DataFilter extends React.Component {
  render() {
    const apidata = this.props.data;
    let taipeidata = [];
    _.toArray(apidata).map((e) => {
      if (e.site_id.indexOf('臺北市') > -1) {
        taipeidata.push(e);
      }
    });
    return(
      <TopSelect data = { taipeidata } />
    );
  }
}

// 上方select清單建立
function TopSelect(props) {
  const taipeidata = props.data;
  const [enddata, setEnddata] = useState(false);

  const handleChange = (e) =>{
    // 取select值
    if ( e.target.value != undefined ){
      // 傳select值, 找json對到的資料
    const searchtext = e.target.value.split(" - ");
    let resultone = [];
    _.toArray(taipeidata).map((e) => {
      if (e.site_id.indexOf(searchtext[0]) > -1 && e.village.indexOf(searchtext[1]) > -1) {
        resultone.push(e);
      }
    });
    // console.log(resultone[0]);
    setEnddata(resultone[0]);
    }
  }

  const result = taipeidata.map((entry, index) => {
    return <option key={index}>{entry.site_id} - {entry.village}  </option>
  })
  return (
    <div>
      <span>地區： </span>
      <select onChange={ handleChange }>
        <option>--請選擇--</option>
        { result }
        </select>
      <ChartPage data = { enddata } />
    </div>
  );
}

// 圖表內容
class ChartPage extends React.Component {
  render() {
    const chartdata = this.props.data;
    const chartdata1 = {
      labels: ['共同生活戶'],
      datasets: [
          {
            label: '女',
            data: chartdata? chartdata.household_ordinary_f : [0],
            backgroundColor: 'lightpink',
          },
          {
            label: '男',
            data: chartdata? chartdata.household_ordinary_m: [0],
            backgroundColor: 'lightblue',
          },
      ],
    };
    const chartdata2 = {
      labels: ['單獨生活戶'],
      datasets: [
          {
            label: '女',
            data: chartdata? chartdata.household_single_f : [0],
            backgroundColor: 'lightpink',
            grouped: true,
          },
          {
            label: '男',
            data: chartdata? chartdata.household_single_m: [0],
            backgroundColor: 'lightblue',
            grouped: true,
          },
      ],
    };
    if (chartdata != false){
      chartdata1.datasets[0].data = [Number(chartdata.household_ordinary_f)];
      chartdata1.datasets[1].data = [Number(chartdata.household_ordinary_m)];
      chartdata2.datasets[0].data = [Number(chartdata.household_single_f)];
      chartdata2.datasets[1].data = [Number(chartdata.household_single_m)];
    }
    
    return (
      <div className="d-flex flex-wrap just-center align-center">
        <div className="double-chart">
          <GroupBarChart chartData={ chartdata1 } />
        </div>
        <div className="double-chart">
          <GroupBarChart chartData={ chartdata2 } />
        </div>
      </div>
    );
  }
}

// 右方頁面組成
class RightPage extends React.Component {
  render() {

    return (
      <div className="right-bg">
        <GetFetch />
      </div>
    );
  }
}

// 左方頁面組成
class LeftPage extends React.Component {
  render() {

    return (
      <div className="left-page">
        <img src={logo} className="page-logo" alt="logo" />
        <div>106年人口戶數及性別</div>
      </div>
    );
  }
}


function App() {
  

  return (
    <div className="App d-flex">
        <LeftPage />
        <RightPage />
    </div>
  );
}



export default App;

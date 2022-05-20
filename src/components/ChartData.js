const chartdata1 = {
    labels: ['共同生活戶'],
    datasets: [
        {
          label: '女',
          data: chartdata? chartdata.household_ordinary_f : '',
          backgroundColor: 'lightpink',
        },
        {
          label: '男',
          data: chartdata? chartdata.household_ordinary_m: '',
          backgroundColor: 'lightblue',
        },
    ],
  };
  const chartdata2 = {
    labels: ['單獨生活戶'],
    datasets: [
        {
          label: '女',
          data: chartdata? chartdata.household_single_f : '',
          backgroundColor: 'lightpink',
        },
        {
          label: '男',
          data: chartdata? chartdata.household_single_m: '',
          backgroundColor: 'lightblue',
        },
    ],
  };

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
    setEnddata(resultone[0]);
    }
  }
  
  let taipeidata = [];
  _.toArray(data).map((e) => {
    if (e.site_id.indexOf('臺北市') > -1) {
      taipeidata.push(e);
    }
  });

  const result = taipeidata.map((entry, index) => {
    return <option key={index}>{entry.site_id} - {entry.village}  </option>
  })

// <select onChange={ handleChange }>{ result }</select>

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
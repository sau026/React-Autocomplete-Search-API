import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/sidebar-left';
import Header from '../../components/header';
import Autocomplete from '../../components/autocomplete';
import axios from 'axios';
import './index.scss';

const Dashboard = (props) => {

  const [searchedResult, setSearchedResult] = useState(null);

  const getAppHeaderJSX = () => {
    return (
      <>
        <Header headerTitle={'Settings > Dialogues'} />
      </>
    )
  }

  const getAppSidebarJSX = () => {
    return (
      <div className="side-panel">
        <Sidebar></Sidebar>
      </div>
    )
  }

  const searchTodoData = (e)=>{
    if(!e){
      return setSearchedResult('no data');
    }
      axios.get(`https://ntsb-server.herokuapp.com/api/accidents/countryList/${e}`, {
      })
      .then(function (response) {
        setSearchedResult(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <div className="dashboard__page-conatiner -site-text-size">
      {getAppSidebarJSX()}
      <div className="main-body">
        {getAppHeaderJSX()}
        <Autocomplete 
        searchValueProps={(e)=>searchTodoData(e)} 
        options={searchedResult}
        ></Autocomplete>
      </div>
    </div>
  );
}

export default Dashboard;




import { useState, useEffect } from 'react';
import './App.scss';
import Datatable from './Datatable/Datatable'
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Modal from 'react-modal'

//some fetch and promise not works in old brower so we use these functions
require("es6-promise").polyfill();
require("isomorphic-fetch");

function App() {

  const [data, setData] = useState([]); //To set the value of data from the fetch
  const [search, setSearch] = useState(''); //To set input sorting functionality
  const [check, setCheck] = useState(''); //To checkSort is the sorting function is by episode or year
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    fetch("https://star-wars-api.herokuapp.com/films")
    .then(response => response.json())
    .then((json) => setData(json));
  }, [])

    function sort_data(rows) {
      if(check === 'episode'){
        return rows.sort((a, b) => {
         return a.fields.episode_id.toString().localeCompare(b.fields.episode_id);})
      }else if(check === 'year') {
        return rows.sort((a, b) =>
        a.fields.release_date.split('/').reverse().join().localeCompare(b.fields.release_date.split('/').reverse().join()));
      } 

      return rows.filter((row) =>
        row.fields.title.toString().toLowerCase().indexOf(search.toLowerCase()) > -1)
    }


  return (
    <div className="App">

      <nav className="navbar">
  
      <ul className="navbar-nav">
        <button onClick = {() => setOpenDropdown(true)}>Sort <KeyboardArrowDownIcon /></button>
      <Modal
          isOpen={openDropdown}
          onRequestClose={() => setOpenDropdown(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 200,
              background: "transparent",
              height: 117,
              zIndex: "1000",
              top: "60px",
              left: 18
              
            },
          }}
        >
          <ul >
            <li>Sort By... <Close onClick={() => setOpenDropdown(false)}/></li>
            <li><button onClick={() => setCheck('episode')}>Episode</button></li>
            <li><button onClick= {() => setCheck('year')}>Year</button></li>
          </ul>
        </Modal>
      </ul>
      <div className="searchbar">
      <SearchIcon />       
      <input type="text" placeholder=" Type to search..." value={search} onChange={(e) => { setSearch(e.target.value); setCheck('')}} />
      </div>
</nav>
      <div>
        <Datatable data={sort_data(data)} />
      </div>
    </div>
  );
}

export default App;

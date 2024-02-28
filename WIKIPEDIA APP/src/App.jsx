import { useState, useEffect } from "react";
import './App.css'
import axios from 'axios';

const App =() => {
  const [ searchInput , setSearchInput]= useState('');
  const [searchResults , setSearchResults] = useState([])
const [ isLoading , setisLoading] = useState(false)

const fetchData = async () => {
try{
  const  url = ` https://apis.ccbp.in/wiki-search?search=${searchInput}`
  const response = await axios .get(url);
  const {search_results} = response.data;
  setSearchResults(search_results)
  setisLoading(false);
} catch(error){
  console.log("Error in fetching the data", error);
setisLoading(false)
}
};
useEffect(() => {
  fetchData()
} , [ ]);

const handleSearch = ()=> {
  setisLoading(true);
  fetchData();
}
return (
  <div className="main-container">
      <div className="wiki-search-header text-center">
        <img
          className="wiki-logo"
          src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/wiki-logo-img.png"
          alt="Wikipedia Logo"
        />
        <br />
        <input
          placeholder="Type a keyword and press Enter to search"
          type="search"
          className="search-input w-100"
          id="searchInput"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
      {isLoading && (
        <div className="d-flex justify-content-center" id="spinner">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <div  className="search-results" id="searchResults">
        {searchResults.map((result, index) => (
          <div key={index} className="result-item">
            <a href={result.link} target="_blank" rel="noopener noreferrer" className="result-title" > 
               {result.title}</a>
            <br/>
            <a  href={result.link} target="_blank" rel="noopener noreferrer" className="result-url">
               {result.link} </a>
            <br/>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
)
}
export default App;
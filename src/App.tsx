// EXTERNAL
import React, { useState, useEffect } from "react";
import axios from "axios";
// COMPONENTS
import SortingTable from "./components/SortingTable.tsx";
// STYLES
import "./style.css";
import "./App.css";
// TYPES
interface DataTypes {
  [key: string]: any;
}

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataTypes>([]);

  const getAPIData = async () => {
    const { data } = await axios.get(
      "https://randomuser.me/api/?page=3&results=5&seed=abc"
    );
    //set Data Fetch in correspondence to the table header keys
    const results = data.results.map((user, element) => (
      {
        id: element,
        name_first: user.name.first,
        name_last: user.name.last,
        age: user.dob.age,
        gender: user.gender,
        username: user.login.username
      }
    ))
    
    setData(results);
  };

  useEffect(() => {
    setIsLoading(true);
    getAPIData();
    setIsLoading(false);
  }, []);

// Sort Data function will take the argument of the header key 
//and sort via the table column
  function sortData({
  key,
  reverse,
}: {
  key: string;
  reverse: boolean;
}) 
{

  let sortedData = data.sort((a, b) => {
    return a[key] > b[key] ? 1 : -1;
  });
  //Reverse the order is sort order is in reverse
  if (reverse) {
    setData(sortedData.reverse()); ;
  }
  setData(sortedData);
}

  return (
    <div className="App">
      <h1>
        <span id="brand">Picnic</span> Tech Test
      </h1>
      <p>
        Please follow the instructions in the <code>README</code> file
      </p>
      <hr />
      <SortingTable data={data} sortData={sortData}/>
    </div>
  );
};

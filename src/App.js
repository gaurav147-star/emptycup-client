import { useEffect, useState } from "react";
import "./App.css";
import ItemCard from "./components/itemCard";
import Navbar from "./components/Navbar";
import axios from "axios"; // Import Axios

function App() {
  const [showShortlisted, setShowShortlisted] = useState(false);
  const [designers, setDesigners] = useState([]);
  const host = process.env.REACT_APP_BASE_URL;
  // console.log(host);

  useEffect(() => {
    // Fetch designers from the server using Axios
    const fetchDesigners = async () => {
      try {
        const response = await axios.get(`${host}/designers`); // Use axios.get

        const data = response.data; // Axios response data
        setDesigners(data);
      } catch (error) {
        console.error("Error fetching designers:", error);
      }
    };

    // Call the fetch function
    fetchDesigners();
  }, [host]); // Include 'host' in the dependency array to trigger useEffect when 'host' changes

  return (
    <div className="App">
      <Navbar
        showShortlisted={showShortlisted}
        setShowShortlisted={setShowShortlisted}
      />

      {showShortlisted
        ? designers
            .filter((designer) => designer.shortlisted === true)
            .map((item, key) => <ItemCard key={key} designer={item} />)
        : designers.map((item, key) => (
            <ItemCard key={key} designer={item} setDesigners={setDesigners} />
          ))}
    </div>
  );
}

export default App;

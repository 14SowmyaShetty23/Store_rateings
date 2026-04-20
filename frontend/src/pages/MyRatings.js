import { useEffect, useState } from "react";
import API from "../api";

function MyRatings() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    API.get("/ratings/user").then((res) => {
      setRatings(res.data);
    });
  }, []);

  const updateRating = (id, rating) => {
    API.put(`/ratings/${id}`, { rating }).then(() => {
      alert("Updated!");
    });
  };

  return (
    <div>
      <h2>My Ratings</h2>

      {ratings.map((r) => (
        <div key={r.id}>
          <h3>{r.name}</h3>
          <p>My Rating: {r.rating}</p>

          {[1,2,3,4,5].map((val) => (
            <button key={val} onClick={() => updateRating(r.id, val)}>
              {val}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyRatings;
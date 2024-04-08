import { useState, useEffect, useCallback } from "react";
import getCats from "../services/CatService";

let sequence = 0;

const VotePage = () => {
  const [cats, setCats] = useState([]);
  const [currentPair, setCurrentPair] = useState([]);

  const uniqueId = () => {
    sequence += 1;
    return `kv-${Date.now()}-${sequence}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  };

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const catData = await getCats();
        setCats(catData);
      } catch (error) {
        console.error("Erreur lors de la récupération des images:", error);
      }
    };

    fetchCats();
  }, []);

  const selectRandomCats = useCallback(() => {
    let firstIndex, secondIndex;

    firstIndex = Math.floor(Math.random() * cats.length);

    do {
      secondIndex = Math.floor(Math.random() * cats.length);
    } while (firstIndex === secondIndex);

    setCurrentPair([cats[firstIndex], cats[secondIndex]]);
  }, [cats]);

  useEffect(() => {
    if (cats.length) {
      selectRandomCats();
    }
  }, [cats, selectRandomCats]);

  const handleVote = (catId) => {
    console.log(`Vote pour le chat: ${catId}`);
    selectRandomCats();
  };

  return (
    <div>
      <h2>Qui est le plus mignon ?</h2>
      <div className="cats-pair">
        {currentPair.map((cat) => (
          <div
            key={uniqueId()}
            className="cat"
            onClick={() => handleVote(cat.id)}
          >
            <img
              src={cat.url}
              alt={`Chat ${cat.id}`}
              style={{ maxWidth: "300px", cursor: "pointer" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotePage;

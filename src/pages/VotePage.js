import { useState, useEffect, useCallback } from "react";
import { useCats } from "../contexts/CatsContext";
import getCats from "../services/CatService";

const VotePage = () => {
  const { cats, setCatsAndScores, updateScore } = useCats();
  const [currentPair, setCurrentPair] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const catData = await getCats();
        setCatsAndScores(catData);
      } catch (error) {
        console.error("Erreur lors de la récupération des images:", error);
      }
    };

    if (!cats.length) fetchCats();
  }, [cats, setCatsAndScores]);

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
    // console.log(`Vote pour le chat: ${catId}`);
    updateScore(catId);
    selectRandomCats();
  };

  return (
    <div>
      <h2>Qui est le plus mignon ?</h2>
      <div className="cats-pair">
        {currentPair.map((cat) => (
          <div key={cat.id} className="cat" onClick={() => handleVote(cat.id)}>
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

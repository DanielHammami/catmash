import { useState, useContext, createContext } from "react";

const CatsContext = createContext();

export const useCats = () => useContext(CatsContext);

export const CatsProvider = ({ children }) => {
  const [cats, setCats] = useState([]);
  const [scores, setScores] = useState({});

  const setCatsAndScores = (catData) => {
    setCats(catData);

    const initialScores = catData.reduce((acc, cat) => {
      acc[cat.id] = 0;
      return acc;
    }, {});

    setScores(initialScores);
  };

  const updateScore = (catId) => {
    setScores((prevScores) => ({
      ...prevScores,
      [catId]: prevScores[catId] + 1,
    }));
  };

  return (
    <CatsContext.Provider
      value={{ cats, scores, setCatsAndScores, updateScore }}
    >
      {children}
    </CatsContext.Provider>
  );
};

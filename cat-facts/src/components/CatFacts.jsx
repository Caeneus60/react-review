import { useEffect } from "react";
import { useState } from "react";
import { getCatFact } from "../services/facts";

const RANDOM_IMG_URL = "https://cataas.com/cat/says/";

function useCatImage({ fact }) {
  const [imgSource, setImgSource] = useState();

  useEffect(() => {
    if (!fact) return;

    const firstThreeWords = fact.split(" ", 3).join(" ");

    fetch(RANDOM_IMG_URL + firstThreeWords).then((res) =>
      setImgSource(res.url),
    );
  }, [fact]);

  return { imgSource };
}

function CatFacts() {
  const [fact, setFact] = useState();
  const { imgSource } = useCatImage(fact);

  async function handleClick() {
    const newFact = await getCatFact();
    setFact(newFact);
  }

  // fetch a random cat fact the first time this component mounts.
  useEffect(() => {
    getCatFact().then((newFact) => setFact(newFact));
  }, []);

  return (
    <>
      <section>
        {fact && <p>{fact}</p>}
        <img
          src={imgSource}
          alt={`A cat picture showing the first three words from ${fact}`}
        />
      </section>

      <div className="button-container">
        <button className="fact-button" onClick={handleClick}>
          Get New Fact
        </button>
      </div>
    </>
  );
}

export default CatFacts;

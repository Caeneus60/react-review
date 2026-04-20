import { useCatFact } from "../hooks/useCatFact";
import { useCatImage } from "../hooks/useCatImage";

function CatFacts() {
  const { fact, refreshFact } = useCatFact();
  const { imgSource } = useCatImage({ fact });

  console.log(imgSource);

  async function handleClick() {
    refreshFact();
  }

  return (
    <main>
      <h1>Kitten App</h1>
      {fact && <p>{fact}</p>}
      <img
        src={imgSource}
        alt={`A cat picture showing the first three words from ${fact}`}
      />
      <button className="fact-button" onClick={handleClick}>
        Get New Fact
      </button>
    </main>
  );
}

export default CatFacts;

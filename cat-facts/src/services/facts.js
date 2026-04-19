const RANDOM_FACTS_URL = "https://catfact.ninja/fact";

const getCatFact = async () => {
  const res = await fetch(RANDOM_FACTS_URL);
  const data = await res.json();
  return data.fact;
};

export { getCatFact };

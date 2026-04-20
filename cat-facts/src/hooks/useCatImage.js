import { useEffect, useState } from "react";

const RANDOM_IMG_URL = "https://cataas.com/cat/says/";

export function useCatImage({ fact }) {
  const [imgSource, setImgSource] = useState();

  useEffect(() => {
    if (!fact) return;

    const firstThreeWords = fact.split(" ", 3).join(" ");

    fetch(RANDOM_IMG_URL + firstThreeWords).then((res) => {
      setImgSource(res.url);
    });
  }, [fact]);

  return { imgSource };
}

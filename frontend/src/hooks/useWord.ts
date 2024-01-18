import { useState, useCallback, useEffect } from 'react';

import { generateWord } from '../utils';

export const useWord = (numberOfWords: number, text = "" as string) => {
  const [word, setWord] = useState(
    () => generateWord(numberOfWords) + ' '
  );
  const [totalWord, setTotalWord] = useState<string>(word);

  const appendWord = useCallback((word: string) => {
    setTotalWord((prev) => prev + word);
  }, []);

  const eraseWord = useCallback((word: string) => {
    setTotalWord(word);
  }, []);

  useEffect(() => {
    if (text !== "") {
      setWord(generateWord(numberOfWords, text) + ' ');
      setTotalWord(text);
      //eraseWord(text);
      //console.log("TOTAL WORD", totalWord);
      //console.log(" WORD", word);

    }
  }, [text]);

  const updateWord = useCallback(
    (erase = false) => {
      if (text === "") {
        setWord(() => {
          const genWord = generateWord(numberOfWords) + ' ';
          if (erase) eraseWord(genWord);
          else appendWord(genWord);
          return genWord;
        });
    }
    },
    [numberOfWords, appendWord, eraseWord, text]
  );

  return { word, totalWord, setTotalWord, updateWord, appendWord };
};

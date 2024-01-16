import { useCallback, useState } from 'react';

import { useCountdown } from './useCountdown';
import { useKeyDown } from './useKeyDown';
import { useLocalStorage } from './useLocalStorage';
import { useModal } from './useModal';
import { useWord } from './useWord';

import {
  calculateAccuracy,
  calculateErrorPercentage,
  calculateWPM,
  calculateTextDifficulty,
} from '../utils';

import type { Results } from '../types';
import type { HistoryType } from '../types';

export const useSystem = () => {
  // Constructing the JSON object

  function getAccuracyLetters ( lm: object ) {
    let letMap = Object.fromEntries(lm);
    for (let key in letMap) {
      letMap[key] = letMap[key][2];
    }

    return letMap;
  }


  async function sendRequest(accuracy: number, letterMap: object, wpm: number, difficulty: number) {
    const jsonObject = {
      "speed": wpm,
      "theme": "dune",
      "difficulty_word": difficulty,
      "accuracy_global": accuracy,
      "accuracy_letters": getAccuracyLetters(letterMap),
    };

    
    try {
      const response = await fetch('http://localhost:5000/run-fuzzy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonObject),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const data = await response.json();
      //console.log(data);

      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
    
  }

  

  const [results, setResults] = useState<Results>({
    difficulty: 0,
    accuracy: 0,
    letterMap: new Map<string, number[]>(),
    wpm: 0,
    cpm: 0,
    error: 0,
  });

  const [history, setHistory] = useState<HistoryType>({
    wordHistory: '',
    typedHistory: '',
  });

  const { setLocalStorageValue, getLocalStorageValue } = useLocalStorage();
  const [wordContainerFocused, setWordContainerFocused] = useState(false);
  const [time, setTime] = useState(() => getLocalStorageValue('time') || 15000);
  const { countdown, resetCountdown, startCountdown } = useCountdown(time);
  const { word, updateWord, totalWord } = useWord(2);
  const {
    charTyped,
    typingState,
    cursorPosition,
    totalCharacterTyped,
    resetCharTyped,
    resetCursorPointer,
    setTotalCharacterTyped,
    setTypingState,
  } = useKeyDown(wordContainerFocused);
  const { modalIsOpen, loginModal, openModal, closeModal } = useModal();

  const restartTest = useCallback(() => {
    resetCountdown();
    updateWord(true);
    resetCursorPointer();
    resetCharTyped();
    setTypingState('idle');
    setTotalCharacterTyped('');
  }, [
    resetCountdown,
    updateWord,
    resetCursorPointer,
    resetCharTyped,
    setTypingState,
    setTotalCharacterTyped,
  ]);

  const checkCharacter = useCallback(
    (index: number) => {
      if (charTyped[index] === word[index]) {
        return true;
      } else {
        return false;
      }
    },
    [charTyped, word]
  );

  if (word.length === charTyped.length) {
    updateWord();
    resetCharTyped();
    resetCursorPointer();
  }

  if (typingState === 'start') {
    startCountdown();
    setTypingState('typing');
  }

  if (countdown === 0) {
    const difficulty = calculateTextDifficulty(totalCharacterTyped.length, totalWord);
    const { accuracy, letterMap } = calculateAccuracy(totalWord, totalCharacterTyped);
    const { wpm, cpm } = calculateWPM(totalCharacterTyped, accuracy, time);
    const error = calculateErrorPercentage(accuracy);

    setResults({
      difficulty,
      accuracy,
      letterMap,
      wpm,
      cpm,
      error,
    });

    setHistory({
      wordHistory: totalWord,
      typedHistory: totalCharacterTyped,
    });

    openModal('result');
    sendRequest(accuracy, letterMap, wpm, difficulty).then((data) => {
      console.log(data);
    });
    
    restartTest();
    
  }

  return {
    charTyped,
    countdown,
    cursorPosition,
    modalIsOpen,
    loginModal,
    results,
    time,
    history,
    word,
    wordContainerFocused,
    setWordContainerFocused,
    setTime,
    resetCountdown,
    setLocalStorageValue,
    updateWord,
    restartTest,
    checkCharacter,
    closeModal,
    openModal,
  };
};

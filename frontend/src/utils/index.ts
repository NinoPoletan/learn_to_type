import { faker } from '@faker-js/faker';

import { AccuracyMetrics } from '../types';

export const isAllowedCode = (code: string): boolean => {
  return (
    code.startsWith('Key') ||
    code === 'Backspace' ||
    code === 'Space' ||
    code === 'Minus' ||
    code === 'Period' ||
    code === 'Comma' ||
    code === 'Semicolon' ||
    code === 'Quote' ||
    code === 'BracketLeft' ||
    code === 'BracketRight' ||
    code === 'Backslash' ||
    code === 'Slash' ||
    code === 'IntlBackslash' ||
    code === 'Equal' ||
    code === 'QustionMark' ||
    code.startsWith('Digit') ||
    code.startsWith('Numpad')
  );
};

export const isMobile = () => {
  const userAgent = navigator.userAgent;

  const mobileUserAgents = [
    'Android',
    'iPhone',
    'iPad',
    'iPod',
    'BlackBerry',
    'Windows Phone',
  ];

  for (let i = 0; i < mobileUserAgents.length; i++) {
    if (userAgent.indexOf(mobileUserAgents[i]) !== -1) {
      return true;
    }
  }
  return false;
};

export const generateWord = (n: number): string => {
  let phrases = "";
  for (let i = 0; i < n; i++) {
    if (i === n - 1) phrases += faker.hacker.phrase();
    else phrases += faker.hacker.phrase() + " ";
  }
  return phrases;
};

export const calculateTextDifficulty = (position: number, text: string) => {
  var punctuationOrNumbersRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~0-9]/;
  var capitalLettersRegex = /[A-Z]/;

  text = text.slice(0, position);
  let words = text.split(" ");

  if (words[words.length - 1] == "" || words[words.length - 1] == " ") {
    words.pop();
  }

  console.log(words);

  let simpleWords = 0;
  let mediumWords = 0;
  let hardWords = 0;

  words.forEach((word) => {
    if (punctuationOrNumbersRegex.test(word)) {
      hardWords++;      
    } else if (capitalLettersRegex.test(word)) {
      mediumWords++;
    } else  {
      simpleWords++;
    }
  });

  console.log("simpleWords: ", simpleWords);  //tezina je 1
  console.log("mediumWords: ", mediumWords);  // tezina je 3
  console.log("hardWords: ", hardWords);      // tezina je 6

  let difficulty = ((((simpleWords/words.length)*100) + 3*((mediumWords/words.length)*100) + 6*((hardWords/words.length)*100))/3);

  return difficulty;
};

export const calculateAccuracy = (expectedWord: string, typedWord: string) => {
  let correctChars = 0;
  let letterMap = new Map([
    ['A', [0, 0, 0]],
    ['B', [0, 0, 0]],
    ['C', [0, 0, 0]],
    ['D', [0, 0, 0]],
    ['E', [0, 0, 0]],
    ['F', [0, 0, 0]],
    ['G', [0, 0, 0]],
    ['H', [0, 0, 0]],
    ['I', [0, 0, 0]],
    ['J', [0, 0, 0]],
    ['K', [0, 0, 0]],
    ['L', [0, 0, 0]],
    ['M', [0, 0, 0]],
    ['N', [0, 0, 0]],
    ['O', [0, 0, 0]],
    ['P', [0, 0, 0]],
    ['Q', [0, 0, 0]],
    ['R', [0, 0, 0]],
    ['S', [0, 0, 0]],
    ['T', [0, 0, 0]],
    ['U', [0, 0, 0]],
    ['V', [0, 0, 0]],
    ['W', [0, 0, 0]],
    ['X', [0, 0, 0]],
    ['Y', [0, 0, 0]],
    ['Z', [0, 0, 0]],
    ['a', [0, 0, 0]],
    ['b', [0, 0, 0]],
    ['c', [0, 0, 0]],
    ['d', [0, 0, 0]],
    ['e', [0, 0, 0]],
    ['f', [0, 0, 0]],
    ['g', [0, 0, 0]],
    ['h', [0, 0, 0]],
    ['i', [0, 0, 0]],
    ['j', [0, 0, 0]],
    ['k', [0, 0, 0]],
    ['l', [0, 0, 0]],
    ['m', [0, 0, 0]],
    ['n', [0, 0, 0]],
    ['o', [0, 0, 0]],
    ['p', [0, 0, 0]],
    ['q', [0, 0, 0]],
    ['r', [0, 0, 0]],
    ['s', [0, 0, 0]],
    ['t', [0, 0, 0]],
    ['u', [0, 0, 0]],
    ['v', [0, 0, 0]],
    ['w', [0, 0, 0]],
    ['x', [0, 0, 0]],
    ['y', [0, 0, 0]],
    ['z', [0, 0, 0]],
    ['.', [0, 0, 0]],
    [',', [0, 0, 0]],
    [';', [0, 0, 0]],
    ['\'', [0, 0, 0]],
    ['[', [0, 0, 0]],
    [']', [0, 0, 0]],
    ['\\', [0, 0, 0]],
    ['/', [0, 0, 0]],
    ['=', [0, 0, 0]],
    ['?', [0, 0, 0]],
    ['-', [0, 0, 0]],
    [' ', [0, 0, 0]],
    ['!', [0, 0, 0]],
    ['@', [0, 0, 0]],
    ['#', [0, 0, 0]],
    ['$', [0, 0, 0]],
    ['%', [0, 0, 0]],
    ['^', [0, 0, 0]],
    ['&', [0, 0, 0]],
    ['*', [0, 0, 0]],
    ['(', [0, 0, 0]],
    [')', [0, 0, 0]],
    ['_', [0, 0, 0]],
    ['+', [0, 0, 0]],
    ['~', [0, 0, 0]],
    ['`', [0, 0, 0]],
    ['<', [0, 0, 0]],
    ['>', [0, 0, 0]],
    ['{', [0, 0, 0]],
    ['}', [0, 0, 0]],
    ['|', [0, 0, 0]],
    [':', [0, 0, 0]],
    ['"', [0, 0, 0]],
    ['1', [0, 0, 0]],
    ['2', [0, 0, 0]],
    ['3', [0, 0, 0]],
    ['4', [0, 0, 0]],
    ['5', [0, 0, 0]],
    ['6', [0, 0, 0]],
    ['7', [0, 0, 0]],
    ['8', [0, 0, 0]],
    ['9', [0, 0, 0]],
    ['0', [0, 0, 0]]
  ]);

  for (let i = 0; i < typedWord.length; i++) {
    if (typedWord[i] === expectedWord[i]) {
      correctChars++;
      let value = letterMap.get(expectedWord[i]);
      if (value) {
        value[0]++;
        value[1]++;
        value[2] = value[0] / value[1];
        letterMap.set(expectedWord[i], value);
      }
    } else {
      let value = letterMap.get(expectedWord[i]);
      if (value) {
        value[1]++;
        value[2] = value[0] / value[1];
        letterMap.set(expectedWord[i], value);
      }
    }
  }

  //console//.log("letterMap: ", letterMap);

  const accuracyMetrics: AccuracyMetrics = {
    correctChars,
    incorrectChars: typedWord.length - correctChars,
    accuracy: (correctChars / typedWord.length) * 100,
    letterMap: letterMap,
  };

  //console.log("accuracy_global: ", accuracyMetrics.accuracy);

  return accuracyMetrics;
};

export const calculateWPM = (
  typedWord: string,
  accuracy: number,
  time: number
) => {
  const minutes = time / 60000;               //60000 je 60 sekundi * 1000 milisekundi
  const wordsTyped = typedWord.length / 5;  //5 je prosjecna duljina rijeci
  const grossWPM = wordsTyped / minutes;      //gross je bruto (bruto je bez oduzimanja pogresaka)
  const netWPM = Math.round(grossWPM * (accuracy / 100));  //net je neto (neto je sa oduzimanjem pogresaka)

  //console.log("grossWPM: ", grossWPM);
  //console.log("netWPM: ", grossWPM);
  const results = {
    wpm: netWPM,
    cpm: typedWord.length / minutes,
  };
  return results;
};

export const calculateErrorPercentage = (accuracy: number) => {
  return 100 - accuracy;
};

export const theme = {
  blueDolphin: {
    name: 'Blue Dolphin',
    background: {
      primary: '#003950',
      secondary: '#014961',
    },
    text: {
      primary: '#6DEAFF',
      secondary: '#FFCEFB',
      title: '#6DEAFF',
    },
  },
  aurora: {
    name: 'Aurora',
    background: {
      primary: '#011926',
      secondary: '#000C13',
    },
    text: {
      primary: '#235A68',
      secondary: '#00E980',
      title: '#00E980',
    },
  },
  paper: {
    name: 'Paper',
    background: {
      primary: '#EEEEEE',
      secondary: '#DDDDDD',
    },
    text: {
      primary: '#B4B4B4',
      secondary: '#444444',
      title: '#444444',
    },
  },
  cyberspace: {
    name: 'Cyberspace',
    background: {
      primary: '#181C18',
      secondary: '#131613',
    },
    text: {
      primary: '#9578D3',
      secondary: '#04AF6A',
      title: '#9578D3',
    },
  },
  cheesecake: {
    name: 'Cheesecake',
    background: {
      primary: '#FDF0D5',
      secondary: '#F3E2BF',
    },
    text: {
      primary: '#E14C94',
      secondary: '#3A3335',
      title: '#E14C94',
    },
  },
  bouquet: {
    name: 'Bouquet',
    background: {
      primary: '#173F35',
      secondary: '#1F4E43',
    },
    text: {
      primary: '#408E7B',
      secondary: '#DBE0D2',
      title: '#DBE0D2',
    },
  },
};

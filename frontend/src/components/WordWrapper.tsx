import { MdCenterFocusStrong } from 'react-icons/md';
import { useState, useEffect } from 'react';

type WordWrapperProps = {
  children: React.ReactNode;
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

const getCookieValue = (name: string): string | null => {
  const nameString = name + "=";
  const value = document.cookie.split('; ').find(row => row.startsWith(nameString));
  
  return value ? value.split('=')[1] : null;
};

const decodeCookieValue = (name: string): any | null => {
  const base64 = getCookieValue(name);

  if (base64) {
    const decodedValue = atob(base64);

    try {
      return JSON.parse(decodedValue);
    } catch (e) {
      console.error("Error parsing cookie value:", e);
      return null;
    }
  }

  return null;
};

const WordWrapper = ({ children, focused, setFocused }: WordWrapperProps) => {
  const [userCookieData, setUserCookieData] = useState<any | null>(null);

  useEffect(() => {
    const userData = decodeCookieValue('user');
    setUserCookieData(userData);
  }, []);

  return (
    <>
      <div
        className={`${
          focused ? 'opacity-0' : 'opacity-100'
        } flex items-center justify-center gap-3 transition-all duration-500 `}
      >
        <MdCenterFocusStrong className='text-center text-2xl' />
        <span className={`text-center font-mono text-lg `}>
          {userCookieData ? "Focus to start typing" : "Login first"}
        </span>
      </div>
      <div
        className={`relative mt-5 focus:border-0 focus:border-none focus:outline-none ${
          focused ? 'blur-none' : 'cursor-pointer blur-md'
        } `}
        tabIndex={0}
        autoFocus={true}
        onFocus={() => {if (userCookieData) setFocused(true) }}
        onBlur={() => setFocused(false)}
      >
        {children}
      </div>
    </>
  );
};

export default WordWrapper;

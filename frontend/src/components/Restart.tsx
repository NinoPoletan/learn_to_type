import styled from 'styled-components';
import { MdRestartAlt } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useThemeContext } from '../hooks/useTheme';

import Tooltip from './Tooltip';

type RestartProps = {
  restart: () => void;
};

const StyledButton = styled.button`
  &:hover {
    color: ${({ theme }) => theme.text.title};
    background-color: ${({ theme }) => theme.background.secondary};
  }
`;

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

const Restart = ({ restart }: RestartProps) => {
  const { systemTheme } = useThemeContext();
  const [userCookieData, setUserCookieData] = useState<any | null>(null);

  useEffect(() => {
    const userData = decodeCookieValue('user');
    setUserCookieData(userData);
  }, []);

  return (
    <div className='mt-10'>
      <Tooltip tooltipId='Restart' delayHide={200}>
        <div className='flex items-center justify-center'>
          <StyledButton
            theme={systemTheme}
            onClick={() => {
              if (userCookieData) restart()
            }}
            className={`rotate-0 rounded-full p-3 transition delay-200 ease-out hover:rotate-180 `}
            data-tooltip-id='Restart'
            data-tooltip-content='Restart Test'
            data-tooltip-place='bottom'
          >
            <MdRestartAlt className='text-2xl lg:text-3xl ' />
          </StyledButton>
        </div>
      </Tooltip>
    </div>
  );
};

export default Restart;

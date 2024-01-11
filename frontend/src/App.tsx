import { useDetectDevice } from './hooks/useDetectDevice';
import { useSystem } from './hooks/useSystem';
import { useThemeContext } from './hooks/useTheme';

import LoginPage from './components/Login';
import Countdown from './components/Countdown';
import Header from './components/Header';
import ModalComponent from './components/Modal';
import ModalContent from './components/ModalContent';
import Restart from './components/Restart';
import TimeCategory from './components/TimeCategory';
import UserTyped from './components/UserTyped';
import WordContainer from './components/WordContainer';
import WordWrapper from './components/WordWrapper';
import MobileNotSupported from './components/MobileNotSupported';

function App() {
  const { systemTheme } = useThemeContext();
  const {
    charTyped,
    countdown,
    word,
    wordContainerFocused,
    modalIsOpen,
    loginModal,
    history,
    time,
    results,
    resetCountdown,
    setLocalStorageValue,
    setWordContainerFocused,
    restartTest,
    checkCharacter,
    closeModal,
    openModal,
    setTime,
  } = useSystem();

  const isMobile = useDetectDevice();

  console.log("Accuracy: " + results.accuracy)
  console.log("WPM: " + results.wpm)
  console.log("CPM: " + results.cpm)
  console.log(results.letterMap)
  console.log(results.error)
  console.log(results.difficulty)

  


  return (
    <div
      className='h-screen w-full overflow-y-auto'
      style={{
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary,
      }}
    >
      <main
        className=' mx-auto flex h-full max-w-5xl flex-col gap-4 px-4 xl:px-0'
        style={{}}
      >
        {isMobile ? (
          <MobileNotSupported />
        ) : (
          <>
            <Header
              restart={restartTest}
              openLoginModal={openModal}
              closeLoginModal={closeModal}
            />
            <TimeCategory
              time={time}
              setLocalStorage={setLocalStorageValue}
              setTime={setTime}
              restart={restartTest}
            />
            <Countdown countdown={countdown} reset={resetCountdown} />     
            <WordWrapper
              focused={wordContainerFocused}
              setFocused={setWordContainerFocused}
            >
              <WordContainer word={word} />
              <UserTyped
                word={word}
                check={checkCharacter}
                charTyped={charTyped}
              />
            </WordWrapper>
            <Restart restart={restartTest} />
            
            <ModalComponent
              type='result'
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
            >
              <ModalContent
                totalTime={time}
                results={results}
                history={history}
              />
            </ModalComponent>
            
            <ModalComponent
              type='login'
              isOpen={loginModal}
              onRequestClose={closeModal}
            >
              <LoginPage />
            </ModalComponent>
          </>
        )}
      </main>
    </div>
  );
}

export default App;

import { useScreenShot } from '../hooks/useScreenShot';
import { useThemeContext } from '../hooks/useTheme';

import ResultCard from './ResultCard';

import type { Results } from '../types';
import type { HistoryType } from '../types';

type ModalContentProps = {
  totalTime: number;
  history: HistoryType;
  results: Results;
};


const ModalContent = ({ totalTime, history, results }: ModalContentProps) => {
  const { ref } = useScreenShot();
  const { systemTheme } = useThemeContext();

  function accRes(letterMap: Map<string, number[]>) {
    const res = [];
    for (const [key, value] of letterMap) {
      res.push(
        <div className='flex items-center gap-2' key={key}>
          <div className='flex items-center gap-2'>
            <span style={{ color: systemTheme.text.secondary }}>{key}</span>
            <span>{value[0]}/{value[1]}</span>
          </div>
          <div
            className='rounded-md'
            style={{
              backgroundColor: systemTheme.background.secondary,
            }}
          >
            <span
              className='p-5 text-center'
              style={{ color: systemTheme.text.secondary }}
            >
              {value[2].toFixed(2)}
            </span>
          </div>
        </div>
      );
    }
    return res;
  }



  return (
    <div
      className='mx-auto flex h-full w-[95%] flex-col gap-10 pb-10 pt-8 font-mono'
      style={{
        color: systemTheme.text.primary,
      }}
    >
      <div
        ref={ref}
        className='flex-[3] px-5 py-7'
        style={{
          backgroundColor: systemTheme.background.primary,
        }}
      >
        <div className=' grid grid-flow-col grid-rows-6 justify-center gap-4 sm:grid-rows-4 sm:justify-normal lg:grid-rows-2 lg:justify-normal lg:gap-10 '>
          <ResultCard
            title='wpm/cpm'
            tooltipId='wpm'
            tooltipContent='words per minute / characters per minute'
            tooltipPlace='top'
            results={`${results.wpm} / ${results.cpm}`}
          />
          <ResultCard
            title='acc.'
            tooltipId='accuracy'
            tooltipContent='accuracy percentage'
            tooltipPlace='bottom'
            results={`${Math.round(results.accuracy)}%`}
          />
          <ResultCard
            title='character'
            tooltipId='character'
            tooltipContent='correct/incorrect'
            tooltipPlace='top'
            results={`${Math.round(
              history.typedHistory.length * (results.accuracy / 100)
            )} / ${Math.round(
              history.typedHistory.length * (results.error / 100)
            )}`}
          />
          <ResultCard
            title='err.'
            tooltipId='error'
            tooltipContent='error percentage'
            tooltipPlace='bottom'
            results={`${Math.round(results.error)}%`}
          />
          <ResultCard
            title='time'
            tooltipId='time'
            tooltipContent='time taken to complete the test'
            tooltipPlace='top'
            results={`${totalTime / 1000}s`}
          />
          <ResultCard
            title='total'
            tooltipId='total'
            tooltipContent='total character typed'
            tooltipPlace='bottom'
            results={`${history.typedHistory.length}`}
          />

        </div>
        <div className='' style={{width: '286px', paddingTop: '30px'}}>
          <ResultCard
              title='dificulty'
              tooltipId='dificulty'
              tooltipContent='dificulty of the test'
              tooltipPlace='bottom'
              results={`${results.difficulty.toFixed(2)}`}
            />
        </div>

      </div>

      <div className='flex-[3] px-5'>
        {/* Need a grid with 4 col and x rows */}
        <div className='grid grid-cols-4 gap-[16px] w-full justify-center'>
            
            {accRes(results.letterMap)}
        
        </div>
      </div>
    </div>
  );
};

export default ModalContent;

import ReactGA from 'react-ga'
import {
  InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
  AdjustmentsIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import GraphemeSplitter from 'grapheme-splitter'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import {
  GAME_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  ABOUT_GAME_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  INVALID_HAND_MESSAGE,
  HARD_MODE_MESSAGE,
  EASY_MODE_MESSAGE,
  STUCK_EASY_MESSAGE,
  BROKEN_MESSAGE,
  MISS_CORRECT_TILE_MESSAGE,
  MISS_PRESENT_TILE_MESSAGE,
  CORRECT_WORD_MESSAGE,
} from './constants/strings'
import {
  convertUnicodeToChinese,
  isWordInWordList,
  isInvalidHand,
  isWinningWord,
  solution,
  isTsumo,
  wind,
  index,
} from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'
import { getGuessStatuses } from './lib/statuses'
import { HAND_SIZE, GUESS_MAX } from './constants/settings'

import './App.css'

const ALERT_TIME_MS = 2000
const graphemeSplitter = new GraphemeSplitter()

const windMap: { [id: number]: string } = {
  1: '東',
  2: '南',
  3: '西',
  4: '北',
}

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isInvalidHandAlertOpen, setIsInvalidHandAlertOpen] = useState(false)
  const [isStuckEasyAlertOpen, setIsStuckEasyAlertOpen] = useState(false)
  const [isBrokenAlertOpen, setIsBrokenAlertOpen] = useState(false)
  const [isCorrectTileAlertOpen, setIsCorrectTileAlertOpen] = useState({
    isOpen: false,
    word: [0, ''],
  })
  const [isPresentTileAlertOpen, setIsPresentTileAlertOpen] = useState({
    isOpen: false,
    word: '',
  })
  const [isHardModeAlertOpen, setIsHardModeAlertOpen] = useState(false)
  const [isEasyModeAlertOpen, setIsEasyModeAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('level') === 'hard' ? true : false
  )
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [successAlert, setSuccessAlert] = useState('')
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === GUESS_MAX && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    ReactGA.initialize('UA-221024530-1', {
      testMode: process.env.NODE_ENV === 'test',
    })
    ReactGA.pageview('/')
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  useEffect(() => {
    if (isHardMode) {
      document.documentElement.classList.add('hard')
    } else {
      document.documentElement.classList.remove('hard')
    }
  }, [isHardMode])

  const handleHardMode = (isHard: boolean) => {
    if (isGameWon || isGameLost) {
      setIsBrokenAlertOpen(true)
      return setTimeout(() => {
        setIsBrokenAlertOpen(false)
      }, ALERT_TIME_MS)
    } else if (guesses.length !== 0 && !isHardMode) {
      setIsStuckEasyAlertOpen(true)
      return setTimeout(() => {
        setIsStuckEasyAlertOpen(false)
      }, ALERT_TIME_MS)
    } else {
      setIsHardMode(isHard)
      localStorage.setItem('level', isHard ? 'hard' : 'easy')
      if (isHard) {
        setIsEasyModeAlertOpen(false)
        setIsHardModeAlertOpen(true)
        return setTimeout(() => {
          setIsHardModeAlertOpen(false)
        }, ALERT_TIME_MS)
      } else {
        setIsHardModeAlertOpen(false)
        setIsEasyModeAlertOpen(true)
        return setTimeout(() => {
          setIsEasyModeAlertOpen(false)
        }, ALERT_TIME_MS)
      }
    }
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (!isGameWon && !isGameLost && guesses.length === 0) {
      setIsInfoModalOpen(true)
    }
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost, guesses])

  const onChar = (value: string) => {
    if (
      graphemeSplitter.splitGraphemes(currentGuess).length < HAND_SIZE &&
      guesses.length < GUESS_MAX &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      graphemeSplitter.splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }

    if (!(graphemeSplitter.splitGraphemes(currentGuess).length === HAND_SIZE)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (!isInvalidHand(currentGuess)) {
      setIsInvalidHandAlertOpen(true)
      return setTimeout(() => {
        setIsInvalidHandAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    if (isHardMode && guesses.length !== 0) {
      const previousStatuses = getGuessStatuses(guesses[guesses.length - 1])
      const currentStatuses = getGuessStatuses(currentGuess)
      const currentTiles: { [id: string]: string } = {
        tile0: 'available',
        tile1: 'available',
        tile2: 'available',
        tile3: 'available',
        tile4: 'available',
        tile5: 'available',
        tile6: 'available',
        tile7: 'available',
        tile8: 'available',
        tile9: 'available',
        tile10: 'available',
        tile11: 'available',
        tile12: 'available',
        tile13: 'available',
      }
      for (let i = 0; i < 14; i++) {
        if (previousStatuses[i] === 'correct') {
          if (currentStatuses[i] !== 'correct') {
            const updatedValue = {
              isOpen: true,
              word: [
                i + 1,
                convertUnicodeToChinese(
                  graphemeSplitter.splitGraphemes(guesses[guesses.length - 1])[
                    i
                  ]
                ),
              ],
            }
            setIsCorrectTileAlertOpen({
              ...isCorrectTileAlertOpen,
              ...updatedValue,
            })
            const originalValue = {
              isOpen: false,
              word: [
                i + 1,
                convertUnicodeToChinese(
                  graphemeSplitter.splitGraphemes(guesses[guesses.length - 1])[
                    i
                  ]
                ),
              ],
            }
            return setTimeout(() => {
              setIsCorrectTileAlertOpen({
                ...isCorrectTileAlertOpen,
                ...originalValue,
              })
            }, ALERT_TIME_MS)
          } else if (currentStatuses[i] === 'correct') {
            const tileNumber = 'tile' + i.toString()
            currentTiles[tileNumber] = 'used'
          }
        }
      }

      for (let i = 0; i < 14; i++) {
        if (previousStatuses[i] === 'present') {
          for (let i2 = 0; i2 < 14; i2++) {
            const tileNumber = 'tile' + i2.toString()
            if (
              graphemeSplitter.splitGraphemes(guesses[guesses.length - 1])[
                i
              ] === graphemeSplitter.splitGraphemes(currentGuess)[i2] &&
              currentTiles[tileNumber] === 'available'
            ) {
              currentTiles[tileNumber] = 'used'
              break
            }
            if (i2 === 13) {
              const updatedValue = {
                isOpen: true,
                word: convertUnicodeToChinese(
                  graphemeSplitter.splitGraphemes(guesses[guesses.length - 1])[
                    i
                  ]
                ),
              }
              setIsPresentTileAlertOpen({
                ...isPresentTileAlertOpen,
                ...updatedValue,
              })
              const originalValue = {
                isOpen: false,
                word: convertUnicodeToChinese(
                  graphemeSplitter.splitGraphemes(guesses[guesses.length - 1])[
                    i
                  ]
                ),
              }
              return setTimeout(() => {
                setIsPresentTileAlertOpen({
                  ...isPresentTileAlertOpen,
                  ...originalValue,
                })
              }, ALERT_TIME_MS)
            }
          }
        }
      }
    }

    const winningWord = isWinningWord(currentGuess)

    if (
      graphemeSplitter.splitGraphemes(currentGuess).length === HAND_SIZE &&
      guesses.length < GUESS_MAX &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (guesses.length === 1) {
        ReactGA.event({
          category: 'Game',
          action: 'Started',
          label: index.toString(),
        })
      }

      if (winningWord) {
        ReactGA.event({
          category: 'Game',
          action: 'Won',
          value: guesses.length + 1,
          label: index.toString(),
        })
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === GUESS_MAX - 1) {
        ReactGA.event({
          category: 'Game',
          action: 'Lost',
          label: index.toString(),
        })
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  return (
    <div className="pb-4 overflow-y-auto">
      <div className="flex items-center py-2 px-5">
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 ml-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
        <h1 className="text-2xl text-center grow font-bold dark:text-white">
          {GAME_TITLE}
        </h1>
        <SunIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => handleDarkMode(!isDarkMode)}
        />
        <AdjustmentsIcon
          className={`h-6 w-6 cursor-pointer ${
            isHardMode
              ? 'text-red-700 dark:text-red-500'
              : 'text-green-700 dark:text-green-500'
          }`}
          onClick={() => handleHardMode(!isHardMode)}
        />
      </div>
      <hr></hr>
      <div className="flex w-full mx-auto items-center mt-2 mb-3.5">
        <h2 className="text-lg w-full text-center font-bold dark:text-white">
          {windMap[Math.floor(wind / 10)]}圈 {windMap[wind % 10]}位 |{' '}
          {isTsumo ? '自摸' : '出銃'} | 三番起糊
        </h2>
      </div>
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        isHardMode={isHardMode}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-small rounded dark:text-white bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-700 select-none"
        onClick={() => setIsAboutModalOpen(true)}
      >
        {ABOUT_GAME_MESSAGE}
      </button>

      <Alert message={HARD_MODE_MESSAGE} isOpen={isHardModeAlertOpen} />
      <Alert
        message={EASY_MODE_MESSAGE}
        isOpen={isEasyModeAlertOpen}
        variant="easy"
      />
      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={INVALID_HAND_MESSAGE} isOpen={isInvalidHandAlertOpen} />
      <Alert
        message={STUCK_EASY_MESSAGE}
        isOpen={isStuckEasyAlertOpen}
        variant="easy"
      />
      <Alert message={BROKEN_MESSAGE} isOpen={isBrokenAlertOpen} />
      <Alert
        message={MISS_CORRECT_TILE_MESSAGE(isCorrectTileAlertOpen.word)}
        isOpen={isCorrectTileAlertOpen.isOpen}
      />
      <Alert
        message={MISS_PRESENT_TILE_MESSAGE(isPresentTileAlertOpen.word)}
        isOpen={isPresentTileAlertOpen.isOpen}
      />
      <Alert message={CORRECT_WORD_MESSAGE(solution)} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App

import GraphemeSplitter from 'grapheme-splitter'
import Riichi from 'riichi'
import { HANDS } from '../constants/hands'

const graphemeSplitter = new GraphemeSplitter()

const UnicodetoChineseMap: { [id: string]: string } = {
  '🀇': '一萬',
  '🀈': '二萬',
  '🀉': '三萬',
  '🀊': '四萬',
  '🀋': '五萬',
  '🀌': '六萬',
  '🀍': '七萬',
  '🀎': '八萬',
  '🀏': '九萬',
  '🀙': '一筒',
  '🀚': '二筒',
  '🀛': '三筒',
  '🀜': '四筒',
  '🀝': '五筒',
  '🀞': '六筒',
  '🀟': '七筒',
  '🀠': '八筒',
  '🀡': '九筒',
  '🀐': '一索',
  '🀑': '二索',
  '🀒': '三索',
  '🀓': '四索',
  '🀔': '五索',
  '🀕': '六索',
  '🀖': '七索',
  '🀗': '八索',
  '🀘': '九索',
  '🀀': '東',
  '🀁': '南',
  '🀂': '西',
  '🀃': '北',
  '🀄': '紅中',
  '🀅': '發財',
  '🀆': '白板',
}

const tileToAsciiMap: { [id: string]: string } = {
  '🀇': '1m',
  '🀈': '2m',
  '🀉': '3m',
  '🀊': '4m',
  '🀋': '5m',
  '🀌': '6m',
  '🀍': '7m',
  '🀎': '8m',
  '🀏': '9m',
  '🀙': '1p',
  '🀚': '2p',
  '🀛': '3p',
  '🀜': '4p',
  '🀝': '5p',
  '🀞': '6p',
  '🀟': '7p',
  '🀠': '8p',
  '🀡': '9p',
  '🀐': '1s',
  '🀑': '2s',
  '🀒': '3s',
  '🀓': '4s',
  '🀔': '5s',
  '🀕': '6s',
  '🀖': '7s',
  '🀗': '8s',
  '🀘': '9s',
  '🀀': '1z',
  '🀁': '2z',
  '🀂': '3z',
  '🀃': '4z',
  '🀄': '5z',
  '🀅': '6z',
  '🀆': '7z',
}

const tileToUnicodeMap: { [id: string]: string } = {
  '1m': '🀇',
  '2m': '🀈',
  '3m': '🀉',
  '4m': '🀊',
  '5m': '🀋',
  '6m': '🀌',
  '7m': '🀍',
  '8m': '🀎',
  '9m': '🀏',
  '1p': '🀙',
  '2p': '🀚',
  '3p': '🀛',
  '4p': '🀜',
  '5p': '🀝',
  '6p': '🀞',
  '7p': '🀟',
  '8p': '🀠',
  '9p': '🀡',
  '1s': '🀐',
  '2s': '🀑',
  '3s': '🀒',
  '4s': '🀓',
  '5s': '🀔',
  '6s': '🀕',
  '7s': '🀖',
  '8s': '🀗',
  '9s': '🀘',
  '1z': '🀀',
  '2z': '🀁',
  '3z': '🀂',
  '4z': '🀃',
  '5z': '🀄',
  '6z': '🀅',
  '7z': '🀆',
}

export const convertUnicodeToChinese = (tile: string) => {
  return UnicodetoChineseMap[tile]
}

export const convertHandToAscii = (hand: string) => {
  var tiles = graphemeSplitter.splitGraphemes(hand)
  var lastTile = tiles.pop()
  if (lastTile !== undefined) {
    return (
      tiles.map((tile: string) => tileToAsciiMap[tile]).join('') +
      `${isTsumo ? '' : '+'}${tileToAsciiMap[lastTile]}+${wind}`
    )
  }
  return ''
}

export const convertHandToUnicode = (hand: string) => {
  const tiles = hand.slice(0, 26).match(/.{1,2}/g)
  const lastTile: string =
    hand[26] !== '+' ? hand.slice(26, 28) : hand.slice(27, 29)
  if (tiles !== null) {
    return (
      tiles.map((tile: string) => tileToUnicodeMap[tile]).join('') +
      tileToUnicodeMap[lastTile]
    )
  }
  return ''
}

export const isInvalidHand = (word: string) => {
  const tiles = graphemeSplitter.splitGraphemes(word)
  const counts: { [id: string]: number } = {}

  for (const tile of tiles) {
    counts[tile] = counts[tile] ? counts[tile] + 1 : 1
  }

  for (const tile in counts) {
    if (Object.prototype.hasOwnProperty.call(counts, tile)) {
      if (counts[tile] > 4) {
        return false
      }
    }
  }
  return true
}

export const isWordInWordList = (word: string) => {
  const riichiCalc = new Riichi(convertHandToAscii(word)).calc()
  return riichiCalc.isAgari
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => {
  // February 17, 2022 Game Epoch
  const epochMs = new Date('February 17, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs
  const hand = HANDS[index % HANDS.length]

  return {
    solution: convertHandToUnicode(hand),
    wind: parseInt(hand.slice(-2)),
    isTsumo: hand[26] !== '+',
    solutionIndex: index,
    tomorrow: nextday,
    index: index,
  }
}

export const { solution, wind, isTsumo, solutionIndex, tomorrow, index } =
  getWordOfDay()

import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="關於呢個遊戲" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        呢個遊戲係一個由{' '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold"
        >
          Wordle
        </a>{' '}
        ，{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >
          React Wordle
        </a>{' '}
        同{' '}
        <a
          href="https://mahjong-handle.update.sh/"
          className="underline font-bold"
        >
          Mahjong Handle
        </a>{' '}
        衍生出嚟，估香港麻雀糊牌嘅遊戲 -{' '}
        <a
          href="https://github.com/lowtryan/hk-mahjong-wudle"
          className="underline font-bold"
        >
          GitHub 原始碼
        </a>
        <br />
        <br />
        Uses{' '}
        <a
          href="https://github.com/twitter/twemoji"
          className="underline font-bold"
        >
          twitter/twemoji
        </a>{' '}
        as favicon, licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="underline font-bold"
        >
          CC-BY 4.0
        </a>
        .
        <br />
        Uses{' '}
        <a
          href="https://github.com/twitter/twemoji"
          className="underline font-bold"
        >
          SyaoranHinata/I.Mahjong
        </a>{' '}
        as the tiles, licensed under{' '}
        <a href="https://mplusfonts.github.io/" className="underline font-bold">
          M+ Fonts License
        </a>
        .
      </p>
    </BaseModal>
  )
}

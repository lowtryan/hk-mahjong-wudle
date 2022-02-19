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
        同{' '}
        <a
          href="https://mahjong-handle.update.sh/"
          className="underline font-bold"
        >
          Mahjong Handle
        </a>{' '}
        衍生出嚟，估香港麻雀糊牌嘅遊戲
        -{' '}
        <a
          href="https://github.com/lowtryan/hk-mahjong-wudle"
          className="underline font-bold"
        >
          GitHub 原始碼
        </a>
        <br />
        <br />
        Favicon by{' '}
        <a
          href="https://github.com/twitter/twemoji"
          className="underline font-bold"
        >
          Twemoji
        </a>{' '}
        licensed under the CC-BY 4.0
      </p>
    </BaseModal>
  )
}

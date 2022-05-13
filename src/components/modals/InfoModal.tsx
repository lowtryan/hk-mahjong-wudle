import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { solutionIndex } from '../../lib/words'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="點樣玩" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        用6次機會，估中一副香港麻雀3番或以上嘅牌
        <br />
        喺每次交完答案之後，啲方格會根據你嘅答案轉顏色，作為你之後嘅提示
      </p>

      <p className="text-sm text-green-700 dark:text-green-500">
        你嘅答案一定要用以下順序排列：
        <br />
        筒子 ➔ 索子 ➔ 萬子
        <br />東 ➔ 南 ➔ 西 ➔ 北 ➔ 紅中 ➔ 發財 ➔ 白板
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🀞" />
        <Cell value="🀞" />
        <Cell value="🀞" />
        <Cell value="🀗" />
        <Cell value="🀗" />
        <Cell value="🀗" status="correct" />
        <Cell value="🀘" />
        <Cell value="🀘" />
        <Cell value="🀇" />
        <Cell value="🀇" />
        <Cell value="🀇" />
        <Cell value="🀅" />
        <Cell value="🀅" />
        <Cell value="🀅" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        答案入面有一隻八索，而且位置啱咗
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🀞" status="present" />
        <Cell value="🀞" status="present" />
        <Cell value="🀞" />
        <Cell value="🀗" />
        <Cell value="🀗" />
        <Cell value="🀗" />
        <Cell value="🀘" />
        <Cell value="🀘" />
        <Cell value="🀇" />
        <Cell value="🀇" />
        <Cell value="🀇" />
        <Cell value="🀅" />
        <Cell value="🀅" />
        <Cell value="🀅" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        答案入面得兩隻六筒，但位置唔啱
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🀞" />
        <Cell value="🀞" />
        <Cell value="🀞" />
        <Cell value="🀗" />
        <Cell value="🀗" />
        <Cell value="🀗" />
        <Cell value="🀘" />
        <Cell value="🀘" />
        <Cell value="🀇" />
        <Cell value="🀇" />
        <Cell value="🀇" />
        <Cell value="🀅" status="absent" />
        <Cell value="🀅" status="absent" />
        <Cell value="🀅" status="absent" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        答案入面冇發財呢張牌
      </p>
      <p className="text-sm text-red-700 dark:text-red-500 mt-4">
        困難模式：
        <br />
        玩家一定要用返已經出現過嘅提示
        <br />
        (提示：如果覺得困難模式太難，
        <br />
        可以中途轉返做容易模式㗎！)
      </p>
      <div className="flex justify-end">
        <p className="text-sm text-gray-500 dark:text-gray-300 mr-1">
          第{solutionIndex}題
        </p>
      </div>
    </BaseModal>
  )
}

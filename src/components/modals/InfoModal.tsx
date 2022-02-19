import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

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
        你嘅答案一定要係3番或以上，而且要由 筒子 ➔ 索子 ➔ 萬子 ➔ 番子 順序排列
        <br />
        番子嘅排列： 東風 ➔ 南風 ➔ 西風 ➔ 北風 ➔ 紅中 ➔ 發財 ➔ 白板
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
        答案入面有八索呢張牌，而且位置啱咗
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🀞" />
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
        答案入面有六筒呢張牌，但位置唔啱
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
    </BaseModal>
  )
}

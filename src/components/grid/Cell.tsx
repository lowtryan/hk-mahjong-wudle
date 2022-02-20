import { CharStatus } from '../../lib/statuses'
import { RenderTile } from '../render/Render'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
}

export const Cell = ({ value, status }: Props) => {
  const classes = classnames(
    'md:w-12 sm:w-9 w-7 md:h-16 sm:h-12 h-9 border-solid md:border-2 border flex items-center justify-center sm:mx-0.5 md:text-4xl sm:text-2xl text-xl rounded dark:text-white',
    {
      'border-black dark:border-slate-100': value && !status,
      'bg-slate-400 dark:bg-slate-800 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'bg-blue-500 dark:bg-blue-600 text-white border-blue-500 dark:border-blue-600': status === 'correct',
      'bg-yellow-500 dark:bg-yellow-600 text-white border-yellow-500 dark:border-yellow-600':
        status === 'present',
      'cell-animation': !!value,
    }
  )

  return (
    <div className={classes}>
      <RenderTile tile={value} />
    </div>
  )
}

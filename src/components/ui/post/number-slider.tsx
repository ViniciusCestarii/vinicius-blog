import { cn } from '@/lib/style/utils'
import NumberFlow from '@number-flow/react'

interface NumberSliderProps {
  value: number | undefined
}

function NumberSlider({ value }: NumberSliderProps) {
  return (
    <NumberFlow
      className={cn('invisible', typeof value === 'number' && 'visible')}
      value={value ?? 0}
    />
  )
}

export default NumberSlider

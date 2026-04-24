import { useEffect, useRef } from 'react'

// 10 rows × 12 columns from Figma design (node 187:2133)
const COLOR_ROWS: string[][] = [
  ['#fefffe','#ebebeb','#d6d6d6','#c2c2c2','#adadad','#999999','#858585','#707070','#5c5c5c','#474747','#333333','#000000'],
  ['#00374a','#011d57','#11053b','#2e063d','#3c071b','#5c0701','#5a1c00','#583300','#563d00','#666100','#4f5504','#263e0f'],
  ['#004d65','#012f7b','#1a0a52','#450d59','#551029','#831100','#7b2900','#7a4a00','#785800','#8d8602','#6f760a','#38571a'],
  ['#016e8f','#0042a9','#2c0977','#61187c','#791a3d','#b51a00','#ad3e00','#a96800','#a67b01','#c4bc00','#9ba50e','#4e7a27'],
  ['#008cb4','#0056d6','#371a94','#7a219e','#99244f','#e22400','#da5100','#d38301','#d19d01','#f5ec00','#c3d117','#669d34'],
  ['#00a1d8','#0061fd','#4d22b2','#982abc','#b92d5d','#ff4015','#ff6a00','#ffab01','#fcc700','#fefb41','#d9ec37','#76bb40'],
  ['#01c7fc','#3a87fd','#5e30eb','#be38f3','#e63b7a','#fe6250','#fe8648','#feb43f','#fecb3e','#fff76b','#e4ef65','#96d35f'],
  ['#52d6fc','#74a7ff','#864ffd','#d357fe','#ee719e','#ff8c82','#fea57d','#fec777','#fed977','#fff994','#eaf28f','#b1dd8b'],
  ['#93e3fc','#a7c6ff','#b18cfe','#e292fe','#f4a4c0','#ffb5af','#ffc5ab','#fed9a8','#fde4a8','#fffbb9','#f1f7b7','#cde8b5'],
  ['#cbf0ff','#d2e2fe','#d8c9fe','#efcafe','#f9d3e0','#ffdad8','#ffe2d6','#feecd4','#fef1d5','#fdfbdd','#f6fadb','#deeed4'],
]

interface Props {
  color: string
  onChange: (color: string) => void
  onClose: () => void
}

export default function ColorPicker({ color, onChange, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [onClose])

  return (
    <div
      ref={containerRef}
      className="fixed right-6 z-50 rounded-[16px] p-[10px] overflow-hidden w-[300px]"
      style={{
        top: '68px',
        background: '#fafafa',
        border: '1px solid #ebebeb',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex flex-col rounded-[8px] overflow-hidden">
        {COLOR_ROWS.map((row, ri) => (
          <div key={ri} className="flex">
            {row.map((c) => {
              const selected = c.toLowerCase() === color.toLowerCase()
              return (
                <button
                  key={c}
                  onClick={() => { onChange(c); onClose() }}
                  aria-label={c}
                  className="flex-1 h-[30px] min-w-0 relative cursor-pointer border-0 p-0 transition-opacity duration-75 hover:opacity-80 active:opacity-60"
                  style={{ background: c }}
                >
                  {selected && (
                    <span
                      className="absolute inset-0 m-[3px] rounded-[2px] pointer-events-none"
                      style={{ boxShadow: '0 0 0 2px white, 0 0 0 3px rgba(0,0,0,0.15)' }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

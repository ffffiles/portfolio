import { useRef, useState, useCallback } from 'react'
import PencilCanvas from './components/PencilCanvas'
import HeroSection from './components/HeroSection'
import CaseStudyPanel from './components/CaseStudyPanel'
import { caseStudies } from './data/caseStudies'

export default function App() {
  const clearRef = useRef<(() => void) | null>(null)
  const undoRef = useRef<(() => void) | null>(null)
  const redoRef = useRef<(() => void) | null>(null)
  const [color, setColor] = useState('#171717')
  const [strokeCount, setStrokeCount] = useState(0)
  const [redoCount, setRedoCount] = useState(0)
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null)

  const handleCountChange = useCallback((strokes: number, redos: number) => {
    setStrokeCount(strokes)
    setRedoCount(redos)
  }, [])

  function handleClear() { clearRef.current?.() }
  function handleUndo() { undoRef.current?.() }
  function handleRedo() { redoRef.current?.() }

  return (
    <div className="w-full h-full overflow-hidden bg-light relative">
      <PencilCanvas
        onClearRef={clearRef}
        onUndoRef={undoRef}
        onRedoRef={redoRef}
        onCountChange={handleCountChange}
        color={color}
        disabled={selectedStudy !== null}
      />

      <HeroSection
        studies={caseStudies}
        color={color}
        onColorChange={setColor}
        strokeCount={strokeCount}
        redoCount={redoCount}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        onSelectStudy={setSelectedStudy}
      />

      {selectedStudy && (
        <CaseStudyPanel onClose={() => setSelectedStudy(null)} />
      )}
    </div>
  )
}

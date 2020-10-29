import React, {useCallback, useState} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import Container from './Container'

const ImageView = ({src}) => {
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
    hideSourceOnDrag,
  ])
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div>
          <Container hideSourceOnDrag={hideSourceOnDrag} src={src} />
          <p>
            <label htmlFor="hideSourceOnDrag">
              <input
                id="hideSourceOnDrag"
                type="checkbox"
                checked={hideSourceOnDrag}
                onChange={toggle}
              />
              <small>Hide the source item while dragging</small>
            </label>
          </p>
        </div>
        {src}
      </DndProvider>
    </div>
  )
}

export default ImageView;
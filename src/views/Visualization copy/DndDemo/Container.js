import React, { useState } from 'react'
import {useDrag, useDrop} from 'react-dnd'
import update from 'immutability-helper'

const styles = {
  width: '95%',
  height: '90vh',
  position: 'relative',
}

const style = {
  position: 'absolute',
  width: '100%',
  backgroundColor: 'white',
  cursor: 'move',
}

const Box = ({ id, left, top, hideSourceOnDrag, children }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: 'box' },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }
  return (
    <div ref={drag} style={{ ...style, left, top }}>
      {children}
    </div>
  )
}

const Container = ({ hideSourceOnDrag, src }) => {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 80, title: 'Drag me around' },
    b: { top: 80, left: 180, title: 'Drag me around2' },
  })
  const [, drop] = useDrop({
    accept: 'box',
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      moveBox(item.id, left, top)
      return undefined
    },
  })
  const moveBox = (id, left, top) => {
    setBoxes(
      update(boxes, {
        [id]: {
          $merge: { left, top },
        },
      }),
    )
  }
  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map(key => {
        const { left, top, title } = boxes[key]
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            {title}
            <img src={src} alt="图片" style={{width:'150%',height:'150%',overflow:'hidden'}} />
          </Box>
        )
      })}
    </div>
  )
}

export default Container
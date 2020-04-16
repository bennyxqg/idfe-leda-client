import React, {useState, useEffect, useRef} from "react";
import diff from 'diff'

const DiffDemo = (props) => {
  console.log('--diff--', diff)
  return (
    <div>DiffDemo</div>
  )
}

export default DiffDemo
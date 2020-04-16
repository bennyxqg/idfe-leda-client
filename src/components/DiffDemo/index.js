import React, {useState, useEffect, useRef} from "react";
const diff = require('@/libs/diff.min.js')

const DiffDemo = (props) => {
  console.log('--diff--', diff)

  useEffect(() => {
    // const aaa = diff.diffChars('aaaa123', 'aaab323')
    // console.log('--rrr--', aaa)
    // aaa.forEach(function(part){
    //   // green for additions, red for deletions
    //   // grey for common parts
    //   color = part.added ? 'green' :
    //     part.removed ? 'red' : 'grey';
    //   span = document.createElement('span');
    //   span.style.color = color;
    //   span.appendChild(document
    //     .createTextNode(part.value));
    //   fragment.appendChild(span);
    // });
	}, []);

  return (
    <div>DiffDemo</div>
  )
}

export default DiffDemo
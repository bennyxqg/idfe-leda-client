import React, {useState, useEffect, useRef} from "react";
const diff = require('@/libs/diff.min.js')

const DiffDemo = (props) => {
  console.log('--diff--', diff)

  useEffect(() => {
    const aaa = diff.diffChars('## 内容过滤API↵↵本文档提供了文本、图片过滤的API接口，开发者需要 [联系我们](https://www.showdoc.cc/mssdk?page_id=2615409307929897) 获取相关的参数才能使用该API。↵↵该文档所提供的API接口，客户端和服务端都可以使用。↵↵## 文本过滤↵↵- 请求URL：http://goonie.uu.cc/v2/saas/anti_fraud/text↵- 请求方式：POST↵- 请求参数：', 
    '## 内容过滤API↵↵本文档提供了文本、图片过滤的API接口，开发者需要 [联系我们](https://www.showdoc.cc/mssdk?page_id=2615409307929897) 获取相关的参数才能456546用该API。↵↵该文档所提供的API接口，客户端和34235654nie.uu.cc/v2/saas/anti_fraud/text↵- 请求方式：POST↵- 请求参数：')
    console.log('--rrr--', aaa)
    const fragment = document.createDocumentFragment();
    let color = '',
    span = null;
    aaa.forEach(function(part){
      // green for additions, red for deletions
      // grey for common parts
      let color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
      span = document.createElement('span');
      span.style.color = color;
      span.appendChild(document
        .createTextNode(part.value));
      fragment.appendChild(span);
    });
    setTimeout(() => {
      document.getElementById('test-demo').appendChild(fragment);
    }, 1000)
	}, []);

  return (
    <div>DiffDemo

      <div id='test-demo'></div>
    </div>
  )
}

export default DiffDemo
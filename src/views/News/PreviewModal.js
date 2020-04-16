import React, {useState, useEffect, useRef} from "react";
import { Modal, Table, Button, Form, Input, message } from 'antd';
import './preview.scss'

const PreviewModal = (props) => {
  const [modalVisible, setModalVisible] = useState(true)

  const iframeRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      console.log('-----iframeRef------2--', iframeRef.current)
      iframeRef.current.contentWindow.document.body.innerHTML = props.previewContent;
    }, 100)
    console.log('-----iframeRef--------', iframeRef.current)
    
    // iframeRef.current.contentWindow.document.body.innerHTML = '23432423sddfds';
  }, [iframeRef]);

  const handleOk = (value) => {
    props.modalChange(false);
  }

  const handleCancel = (value) => {
    props.modalChange(false);
  }

  // browseIframe.contentWindow.document.body.innerHTML = this.previewContent;
  // dangerouslySetInnerHTML={{__html:props.previewContent}}
  return <Modal
    title='预览'
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='800px'
  >
    <div className='preview-content'>
      <iframe ref={iframeRef}>
      </iframe>
    </div>
  </Modal>

}

// .iframe {
//   width: 100%;
//   border: none;
//   height: 700px;
//   &::-webkit-scrollbar {
//       width: 5px;
//       height: 5px;
//   }
//   &::-webkit-scrollbar-thumb {
//       border-radius: 2.5px;
//       background-color: #a4c9f5;
//   }
//   &::-webkit-scrollbar-track {
//       border-radius: 2.5px;
//       background-color: #e6e6e6;
//   }
// }

export default PreviewModal
import React, {useState, useEffect, useRef} from "react";
import { Upload, message, Button, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadImgUrl } from '@/http/hcommon'



const Index = (props) => {
  const [url, setUrl] = useState(props.value)

  const uploadProps = {
    name: "img",
    action: uploadImgUrl,
    data:{
      token: localStorage.token || '',
      site_id: localStorage.currentSiteId
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log('-----info.file.response-----', info.file.response)
        if(info.file.response) {
          const {error_code, data} = info.file.response
          if(error_code === 0 && data && data.url) {
            setUrl(data.url)
            message.success(`上传成功`);
            if(props.onChange) {
              props.onChange(data.url);
            }
          }
        }
      } else if (info.file.status === 'error') {
        message.error(`上传失败`);
      }
    },
  };



  return (
    <div style={{display: 'flex'}} className={props.className}>
      <div><Input 
        value={url}
        style={{width: '200px'}}
        placeholder={props.placeholder}
      /></div>
      <div className='mar-l-8'>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>{props.btnLabel}</Button>
        </Upload>
      </div>
    </div>
    
  )
}

export default Index
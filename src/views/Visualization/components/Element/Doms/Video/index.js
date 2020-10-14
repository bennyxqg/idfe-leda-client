import React, {useState, useEffect, useRef, useContext} from "react";
import errorImg from '@/assets/images/error-img.jpg'


const Index = (props) => {
  const [data, setData] = useState(null)

  useEffect(() => {
		setData(props.data.data)
  }, [props]);

  const handleErrorImg = (e) => {
    e.target.src = errorImg
  }

  return (
    <>
      {
        data && 
          <div style={{
            position: 'relative',
            display: 'inline-block',
            // transform: 'translate(-50%,-50%)'
          }}>
            <video style={{
                width: data.style.width?data.style.width + 'px': 'auto',
                height: data.style.height?data.style.height + 'px': 'auto',
              }} 
              controls
              src={data.srcUrl}
              >
            </video>
          </div>
      }
    </>
  )
}

export default Index
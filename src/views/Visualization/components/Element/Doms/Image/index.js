import React, {useState, useEffect, useRef, useContext} from "react";
import errorImg from '@/assets/images/error-img.jpg'


const Index = (props) => {
  const [data, setData] = useState(null)

  useEffect(() => {
		setData(props.data.data)
  }, [props]);

  const handleErrorImg = (e) => {
    console.log('-----e-----', e.target.src = errorImg)
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
            <img 
              style={{
                width: data.style.width?data.style.width + 'px': 'auto',
                height: data.style.height?data.style.height + 'px': 'auto',
              }}
              src={data.imgUrl} alt='' onError={handleErrorImg}/>
          </div>
      }
    </>
  )
}

export default Index
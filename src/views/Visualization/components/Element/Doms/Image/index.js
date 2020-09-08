import React, {useState, useEffect, useRef, useContext} from "react";

const Index = (props) => {
  const [data, setData] = useState(null)

  useEffect(() => {
		setData(props.data.data)
  }, [props]);

  return (
    <>
      {
        data && 
          <div style={{
            position: 'relative',
            display: 'inline-block',
            // transform: 'translate(-50%,-50%)'
          }}
            // onClick={() => {triggerBtnEvent()}}
          >
            <img 
              src={data.imgUrl} alt='' />
          </div>
      }
    </>
  )
}

export default Index
import React, {useState, useEffect} from "react";


const Index = (props) => {
	const [videoBg, setVideoBg] = useState('')

	useEffect(() => {
    if(props.bg.bgType == 3 && props.bg.bgVideo) {
      setVideoBg(props.bg.bgVideo)
    }
	}, [props]);


	return videoBg?(
		<div
      style={{
        textAlign: 'center',
        overflow: "hidden",
        position: 'relative',
        height: '100%'
      }}
      >
      <video 
        style={{
          position: 'absolute',
          left: '50%',
          // marginLeft: '-50%'
          transform: 'translate(-50%)'
        }}
        autoPlay loop muted src={videoBg}>
      </video>
    </div>
	):null
}

export default Index
import React, {useState, useEffect, useRef, useContext} from "react";
import ImgNewsStyle from './modal/ImgNews/ImgNews_Style/index'
import ImgNewsData from './modal/ImgNews/ImgNews_Data/index'
import WhiteSectionData from './modal/WhiteSection/WhiteSection_Data'
import VisContext from "../VisContext";
import update from 'immutability-helper';

const Index = (props) => {
  const { chooseSection, setChooseSection } = useContext(VisContext)

	useEffect(() => {
    console.log('------chooseSection---123---', chooseSection)
  }, []);

  // 更新数据
  const onFinish = (data) => {
    setChooseSection(update(chooseSection, {$merge: {
      data
    }}))
    props.modalChange(false)
  }
  
  const showModalComp = () => {
    if(!props.section) {
      return null
    }
    const sectionType = props.section.type
    const type = props.type
    console.log('------sectionType------', sectionType, type)
    if(sectionType === 'WhiteSection') {
      if(type === 'data') {
        return <WhiteSectionData 
        modalChange={props.modalChange}
        onFinish={onFinish}
        data={props.section}/>;
      }
      if(type === 'style') {
        return <ImgNewsStyle 
        modalChange={props.modalChange}
        onFinish={onFinish}
        data={props.section}/>;
      }
    } else if(sectionType === 'ImgNews') {
      if(type === 'data') {
        return <ImgNewsData
        modalChange={props.modalChange}
        onFinish={onFinish}
        data={props.section}/>;
      }
      if(type === 'style') {
        return <ImgNewsStyle 
        modalChange={props.modalChange}
        onFinish={onFinish}
        data={props.section}/>;
      }
    }
    return null
	}

	return (
		<>
      
      <div>
        {
          showModalComp()
        }
      </div>
    </>
	)
}

export default Index
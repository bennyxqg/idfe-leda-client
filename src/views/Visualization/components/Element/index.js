import React, {useState, useEffect, useRef, useContext} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import DragableElement from './DragableElement'
import VisContext from "@/views/Visualization/VisContext";

const Index = () => {
  const { elementList, setElementList } = useContext(VisContext)

	return (
    <div>
      <div className='free-content-wrap'>
        {
          elementList.map((e, index) => {
            return (
              <DragableElement 
                data={e}
                index={index}
                key={index} />
            )
          })
        }
      </div>
    </div>
	)
}

export default Index
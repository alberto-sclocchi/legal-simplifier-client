import React from 'react'
import SimplifiedTextContainer from './SimplifiedTextContainer'
import { FaCircleStop, FaMicrophone } from 'react-icons/fa6'

export default function DocumentHelperDashboard() {
  return (
    <div className='document-helper-dashboard'>
        <SimplifiedTextContainer />
        <form>
            <input type='text' />
            {/* <FaCircleStop />
            <FaMicrophone /> */}
            <button className='document-helper-btn'>submit</button>
        </form>
    </div>
  )
}

import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css'

const Loader = () => {
  return (
    <div className={css.loader}>
     <ThreeCircles
  height="100"
  width="100"
  color=""
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor="blue"
  innerCircleColor="yellow"
  middleCircleColor="blue"
/>
    </div>
  )
}

export default Loader;
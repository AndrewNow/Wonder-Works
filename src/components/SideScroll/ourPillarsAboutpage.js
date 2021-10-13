import React from 'react'
import DesktopComponent from './About/DesktopComponent'
import MobileTabletComponent from './About/MobileTabletComponent'


const OurPillarsAboutPage = () => {
  // !!!
  // This component renders two separate components, depending on the user's browser size
  // At desktop size, this component is the "hover" pillars component (2x2 grid).
  // At the size M breakpoint 769px, the component becomes a side-scroll carousel.
  return (
    <>
      <DesktopComponent />
      <MobileTabletComponent />
    </>
  )
}

export default OurPillarsAboutPage
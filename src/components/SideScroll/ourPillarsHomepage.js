import React from 'react'
import DesktopComponent from './Homepage/DesktopComponent'
import MobileTabletComponent from './Homepage/MobileTabletComponent'


const OurPillarsHomepage = () => {
    // !!!
  // This component renders two separate components, depending on the user's browser size
  // At desktop size, this component is the "hover" pillars component (2x2 grid).
  // At the XL breakpoint, the component becomes a side-scroll carousel.

  return (
    <>
      <DesktopComponent />
      <MobileTabletComponent />
    </>
  )
}

export default OurPillarsHomepage

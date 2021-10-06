import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import breakpoints from "../components/breakpoints"

export const BlueGear = () => {
  return (
    <BlueGearWrapper
      animate={{
        rotate: 360,
        transition: {
          duration: 60,
          repeat: Infinity,
          repeatType: "repeat",
          ease: "linear",
        },
      }}
    >
      <svg
        width="518"
        height="518"
        viewBox="0 0 518 518"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M517.867 258.712C517.867 242.917 498.811 230.09 459.642 219.556C459.548 219.092 459.46 218.627 459.366 218.171C491.526 193.456 504.225 174.313 498.171 159.708C492.117 145.103 469.583 140.56 429.378 145.809C429.123 145.419 428.861 145.036 428.599 144.645C448.859 109.506 453.264 86.9515 442.085 75.7715C430.906 64.5915 408.364 68.9988 373.211 89.2588C372.828 89.0028 372.439 88.7464 372.055 88.4844C377.322 48.2604 372.762 25.7394 358.155 19.6924C343.571 13.6264 324.408 26.3312 299.694 58.4922C299.237 58.3982 298.772 58.3058 298.314 58.2188C287.787 19.0498 274.96 -0.00878906 259.153 -0.00878906C243.346 -0.00878906 230.518 19.0499 219.998 58.2119C219.534 58.3059 219.069 58.3923 218.612 58.4863C193.892 26.3193 174.735 13.6207 160.152 19.6807C145.569 25.7407 140.994 48.2486 146.261 88.4736C145.871 88.7356 145.481 88.9919 145.091 89.2539C109.938 68.9859 87.3908 64.5936 76.2168 75.7666C65.0428 86.9396 69.4438 109.5 89.6978 144.646C89.4348 145.03 89.1798 145.415 88.9238 145.804C48.6988 140.524 26.1849 145.097 20.1309 159.703C14.0769 174.309 26.7765 193.45 58.9365 218.165C58.8425 218.621 58.7546 219.087 58.6606 219.551C19.4916 230.085 0.435547 242.911 0.435547 258.706C0.435547 274.501 19.4986 287.341 58.6606 297.875C58.7546 298.339 58.8425 298.804 58.9365 299.261C26.7835 323.975 14.0839 343.112 20.1309 357.722C26.1789 372.312 48.6985 376.878 88.9165 371.611C89.1725 372.002 89.4344 372.386 89.6904 372.769C69.4434 407.909 65.0374 430.463 76.2104 441.642C87.3835 452.821 109.923 448.428 145.083 428.155C145.473 428.418 145.858 428.675 146.248 428.936C140.988 469.161 145.547 491.681 160.147 497.728C174.73 503.782 193.888 491.083 218.601 458.928C219.059 459.022 219.523 459.115 219.987 459.201C230.514 498.363 243.341 517.422 259.148 517.422C274.955 517.422 287.784 498.363 298.305 459.201C298.769 459.114 299.225 459.021 299.689 458.928C324.416 491.094 343.573 503.786 358.15 497.728C372.75 491.681 377.315 469.161 372.051 428.936L373.214 428.155C408.34 448.416 430.895 452.836 442.081 441.642C453.267 430.448 448.861 407.913 428.601 372.775C428.856 372.391 429.119 372.002 429.381 371.611C469.599 376.879 492.12 372.312 498.167 357.722C504.221 343.105 491.521 323.961 459.361 299.261C459.456 298.797 459.543 298.339 459.637 297.874C498.804 287.346 517.867 274.513 517.867 258.712ZM447.595 307.625C479.384 331.404 487.853 346.64 485.445 352.451C483.037 358.262 466.268 363.039 426.964 357.375L422.544 356.743L420.157 360.517C418.449 363.221 416.673 365.873 414.83 368.475L412.229 372.134L414.523 375.987C434.797 410.138 436.796 427.452 432.343 431.905C427.89 436.358 410.589 434.361 376.432 414.08L372.583 411.793L368.932 414.376C366.308 416.233 363.646 418.017 360.947 419.726L357.187 422.113L357.819 426.525C363.476 465.842 358.694 482.599 352.882 485.007C347.09 487.388 331.861 478.951 308.056 447.161L305.392 443.61L301.054 444.565C297.939 445.251 294.805 445.891 291.623 446.422L287.197 447.16L286.086 451.514C276.265 489.996 265.443 503.651 259.154 503.651C252.865 503.651 242.042 490.004 232.221 451.527L231.121 447.195L226.715 446.441C223.526 445.89 220.372 445.251 217.237 444.565L212.905 443.61L210.241 447.161C186.441 478.961 171.214 487.388 165.429 485.007C159.617 482.599 154.835 465.842 160.492 426.525L161.124 422.113L157.364 419.726C154.66 418.017 151.998 416.233 149.378 414.376L145.727 411.793L141.878 414.08C107.734 434.348 90.4005 436.352 85.9604 431.905C81.5204 427.458 83.5128 410.145 103.78 375.987L106.054 372.141L103.477 368.494C101.641 365.894 99.8647 363.235 98.1494 360.517L95.7617 356.743L91.3428 357.375C52.0428 363.039 35.2698 358.257 32.8618 352.451C30.4538 346.645 38.9287 331.417 70.7188 307.626L74.2837 304.955L73.3086 300.604C72.6086 297.476 71.9851 294.327 71.4385 291.159L70.6846 286.76L66.3535 285.659C27.8705 275.824 14.2158 265.002 14.2158 258.714C14.2158 252.426 27.8705 241.613 66.3535 231.779L70.6846 230.68L71.4385 226.279C71.9835 223.111 72.6086 219.957 73.3086 216.843L74.2905 212.489L70.7188 209.812C38.9188 186.021 30.4538 170.791 32.8618 164.986C35.2698 159.181 52.0058 154.392 91.3428 160.056L95.7544 160.688L98.1426 156.921C99.8586 154.21 101.639 151.547 103.483 148.931L106.054 145.284L103.78 141.45C83.5128 107.285 81.5144 89.9656 85.9614 85.5186C90.4084 81.0716 107.728 83.0766 141.878 103.351L145.714 105.623L149.358 103.062C151.982 101.211 154.649 99.4257 157.358 97.707L161.133 95.3193L160.5 90.8994C154.843 51.5834 159.619 34.8269 165.424 32.4189C171.216 30.0439 186.445 38.4744 210.25 70.2764L212.927 73.8486L217.279 72.8662C220.387 72.1662 223.526 71.5481 226.696 71.0107L231.116 70.2578L232.216 65.917C242.037 27.435 252.859 13.7793 259.148 13.7793C265.437 13.7793 276.261 27.434 286.082 65.917L287.182 70.249L291.587 71.002C294.769 71.547 297.905 72.1741 301.019 72.8721L305.371 73.8545L308.048 70.2832C331.854 38.4732 347.103 30.0387 352.874 32.4277C358.686 34.8347 363.468 51.5914 357.811 90.9014L357.179 95.3076L360.932 97.6943C363.642 99.4163 366.313 101.206 368.944 103.062L372.59 105.625L376.424 103.354C410.568 83.0725 427.889 81.0615 432.342 85.5205C436.795 89.9795 434.79 107.288 414.51 141.445L412.229 145.3L414.819 148.952C416.669 151.563 418.449 154.22 420.16 156.924L422.548 160.691L426.96 160.059C466.26 154.402 483.027 159.17 485.441 164.989C487.855 170.808 479.38 186.023 447.583 209.815L444.012 212.492L444.995 216.846C445.695 219.96 446.32 223.114 446.864 226.283L447.618 230.684L451.95 231.783C490.432 241.617 504.086 252.434 504.086 258.718C504.086 265.002 490.434 275.828 451.95 285.663L447.618 286.764L446.864 291.163C446.32 294.331 445.697 297.479 444.995 300.607L444.019 304.959L447.595 307.625Z"
          fill="#1764AF"
        />
      </svg>
    </BlueGearWrapper>
  )
}

const BlueGearWrapper = styled(motion.div)`
  align-self: flex-end;
  aspect-ratio: 1/1;
  width: 515px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;

  position: absolute;
  top: 0;
  right: 0;

  svg {
    aspect-ratio: 1/1;
    width: 100%;
    height: auto;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    width: 400px;
    top: 20%;
    right: 20%;
  }
  @media (max-width: ${breakpoints.xl}px) {
    width: 300px;
    right: 25%;
  }
  @media (max-width: ${breakpoints.l}px) {
    width: 280px;
    top: 15%;
    right: 15%;
  }
  @media (max-width: ${breakpoints.m}px) {
    width: 220px;
    right: 22.5%;
    top: 10%;
  }
  @media (max-width: ${breakpoints.s}px) {
    width: 170px;
    top: -10%;
    right: 15%;
  }
  @media (max-width: 470px) {
    width: 125px;
    top: 10%;
    right: 5%;
  }

  @media (max-width: ${breakpoints.xs}px) {
    width: 110px;
    right: 5%;
    top: 30%;
  }
`

export const PurpleStrokeStar = () => {
  return (
    <svg
      width="364"
      height="365"
      viewBox="0 0 364 365"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M304.658 306.948L232.071 275.797C230.966 275.323 229.775 275.086 228.573 275.102C227.371 275.117 226.185 275.385 225.093 275.887C224.001 276.389 223.026 277.115 222.232 278.018C221.438 278.92 220.842 279.979 220.483 281.126L196.891 356.509C196.362 358.202 195.321 359.69 193.912 360.768C192.502 361.846 190.794 362.461 189.021 362.529C187.248 362.597 185.498 362.115 184.01 361.148C182.523 360.181 181.371 358.778 180.713 357.13L151.413 283.777C150.967 282.66 150.292 281.65 149.431 280.811C148.57 279.972 147.543 279.323 146.415 278.906C145.288 278.489 144.086 278.313 142.886 278.39C141.687 278.466 140.516 278.794 139.451 279.351L69.4663 315.972C67.8945 316.795 66.1067 317.111 64.3481 316.877C62.5895 316.643 60.9458 315.87 59.644 314.665C58.3423 313.459 57.446 311.88 57.0776 310.145C56.7093 308.409 56.8875 306.602 57.5874 304.972L88.7368 232.385C89.2107 231.28 89.4476 230.089 89.4321 228.887C89.4166 227.685 89.1492 226.5 88.6469 225.408C88.1447 224.316 87.4185 223.341 86.5161 222.547C85.6137 221.753 84.5548 221.157 83.4077 220.798L8.02488 197.205C6.33203 196.675 4.84463 195.634 3.76706 194.225C2.68949 192.816 2.07436 191.108 2.00632 189.335C1.93828 187.562 2.4208 185.812 3.38718 184.325C4.35356 182.837 5.75655 181.685 7.40378 181.027L80.7583 151.727C81.8746 151.281 82.885 150.606 83.7241 149.745C84.5632 148.884 85.2122 147.857 85.6294 146.729C86.0465 145.602 86.2226 144.4 86.146 143.2C86.0693 142.001 85.7413 140.83 85.1841 139.765L48.563 69.7788C47.7404 68.207 47.4244 66.4195 47.6587 64.6611C47.8929 62.9027 48.6662 61.26 49.8716 59.9585C51.0769 58.6569 52.6558 57.7599 54.3911 57.3916C56.1264 57.0232 57.9328 57.2012 59.563 57.9009L132.15 89.0508C133.254 89.525 134.447 89.7624 135.649 89.747C136.851 89.7317 138.036 89.4642 139.128 88.9619C140.221 88.4596 141.195 87.7336 141.989 86.831C142.783 85.9284 143.378 84.8694 143.737 83.7221L167.33 8.33885C167.859 6.64566 168.901 5.15839 170.31 4.08055C171.719 3.0027 173.428 2.38736 175.201 2.31931C176.973 2.25127 178.724 2.73352 180.211 3.70017C181.699 4.66683 182.851 6.07017 183.509 7.71775L212.809 81.0718C213.255 82.188 213.931 83.1986 214.791 84.0376C215.652 84.8765 216.68 85.5253 217.807 85.9424C218.934 86.3594 220.137 86.5352 221.336 86.4585C222.536 86.3817 223.706 86.0543 224.771 85.497L294.757 48.876C296.329 48.0537 298.116 47.7383 299.874 47.9726C301.633 48.207 303.276 48.9798 304.578 50.185C305.879 51.3903 306.775 52.9689 307.144 54.7041C307.513 56.4392 307.335 58.2457 306.636 59.876L275.485 132.463C275.011 133.568 274.774 134.759 274.79 135.961C274.805 137.163 275.071 138.349 275.574 139.441C276.076 140.534 276.802 141.508 277.705 142.302C278.607 143.096 279.667 143.692 280.814 144.051L356.197 167.643C357.89 168.173 359.377 169.214 360.455 170.623C361.532 172.032 362.147 173.74 362.215 175.513C362.283 177.285 361.801 179.036 360.834 180.523C359.868 182.011 358.465 183.163 356.818 183.821L283.464 213.121C282.348 213.567 281.337 214.242 280.499 215.103C279.66 215.964 279.01 216.991 278.593 218.119C278.176 219.246 278 220.448 278.077 221.648C278.153 222.848 278.48 224.018 279.038 225.083L315.659 295.069C316.481 296.641 316.797 298.429 316.563 300.187C316.329 301.946 315.555 303.588 314.35 304.89C313.145 306.192 311.566 307.089 309.831 307.457C308.095 307.825 306.288 307.648 304.658 306.948V306.948Z"
        stroke="#B16EAC"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
    </svg>
  )
}

export const PinkBackground = () => {
  return (
    <>
      <Desktop
        width="1254"
        height="967"
        viewBox="0 0 1254 967"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.09619 0.989906L0.128906 1.2028C57.7559 -6.1722 101.849 26.2141 147.778 52.2301C221.603 94.0501 297.81 109.745 383.26 92.5661C458.285 77.4831 536.332 65.551 606.14 115.654C639.906 139.89 665.826 172.246 690.812 204.283C746.461 275.633 822.505 307.656 906.717 329.247C968.676 345.134 1029.5 366.347 1061.96 429.306C1077.78 459.994 1091.47 492.843 1092.86 526.772C1097.7 644.987 1144.23 745.531 1214.25 838.083C1242.54 875.483 1256.03 919.183 1253.53 966.866C873.754 967.129 0.904297 966.866 0.904297 966.866"
          fill="#EB2C90"
        />
      </Desktop>
    </>
  )
}
export const PinkBgMobileTablet = () => {
  return (
    <>
      <Tablet
        width="1280"
        height="409"
        viewBox="0 0 1280 409"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1280 408.669H0L0.0803334 1.70554C103.23 -10.7192 182.371 47.2586 264.791 93.891C398.028 169.269 535.556 197.553 689.76 166.584C825.155 139.405 965.998 117.898 1091.98 208.201C1152.92 251.885 1199.7 310.205 1244.79 367.946C1255.84 382.102 1267.59 395.693 1280 408.669V408.669Z"
          fill="#EB2C90"
        />
      </Tablet>
      <Mobile
        width="769"
        height="280"
        viewBox="0 0 769 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M768.061 258.007V279.532H0.060791V0C46.5709 6.92224 86.0156 34.345 126.73 57.385C210.554 104.776 297.062 122.553 394.075 103.097C479.252 85.9957 567.869 72.4789 647.126 129.25C685.465 156.713 714.895 193.392 743.259 229.683C750.987 239.583 759.268 249.04 768.061 258.007Z"
          fill="#EB2C90"
        />
      </Mobile>
    </>
  )
}

const Desktop = styled.svg`
  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`
const Tablet = styled.svg`
  display: none;
  @media (max-width: ${breakpoints.xl}px) {
    display: block;
  }
  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`
const Mobile = styled.svg`
  display: none;
  @media (max-width: ${breakpoints.m}px) {
    display: block;
  }
`

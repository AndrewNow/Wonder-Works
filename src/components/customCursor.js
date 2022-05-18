import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useGlobalStateContext } from "../context/globalContext"
import breakpoints from "./breakpoints"

const CustomCursor = () => {
  const { cursorType } = useGlobalStateContext()

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })

  // capture page's x and y relative to window
  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event
    setMousePosition({ x, y })
  }

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("mousemove", onMouseMove)
      return () => {
        document.removeEventListener("mousemove", onMouseMove)
      }
    }
  }, [])

  return (
    <Cursor
      className={`${!!cursorType ? "hovered" : ""} ${cursorType}`}
      style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
    />
  )
}

export default CustomCursor

const Cursor = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  aspect-ratio: 1/1;
  width: 20px;
  height: auto;
  color: var(--color-black);
  border: 1px solid var(--color-black);
  border-radius: 100%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  pointer-events: none;
  transition: all 0.2s ease-in-out !important;
  transition-property: width, height !important;
  will-change: width, height, transform  !important;

  &.hovered {
    cursor: none !important;
    background: #f0f0f095 !important;
    backdrop-filter: blur(3px);
    -moz-backdrop-filter: blur(3px);
    border: none;
    width: 150px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    :after {
      content: url("data:image/svg+xml,%3Csvg width='121' height='121' viewBox='0 0 121 121' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath opacity='0.85' d='M43.7888 41.6034C43.7867 40.9465 43.915 40.2955 44.1665 39.6878C44.4181 39.08 44.7878 38.5274 45.2547 38.0613C45.7215 37.5953 46.2764 37.2251 46.8875 36.9717C47.4986 36.7184 48.1541 36.5869 48.8164 36.5848C49.641 36.6172 50.4492 36.824 51.1866 37.1915L86.452 57.6721C87.204 58.142 87.8376 58.7764 88.3043 59.5267C88.771 60.277 89.0583 61.1233 89.1444 62.0008V62.5049C89.0582 63.3823 88.7708 64.2286 88.3042 64.9789C87.8375 65.7291 87.2039 66.3636 86.452 66.8336L51.1872 87.3135C50.4498 87.6815 49.6413 87.8884 48.8164 87.9202C48.1541 87.918 47.4986 87.7865 46.8875 87.533C46.2764 87.2796 45.7217 86.9093 45.2549 86.4432C44.7881 85.9771 44.4184 85.4244 44.167 84.8166C43.9155 84.2088 43.7872 83.5579 43.7894 82.9009L43.7888 41.6034Z' fill='%23F4F5FA'/%3E%3Cpath d='M3.03463 41.3434L11.3046 41.9406L4.32078 37.5526L4.88644 35.8819L14.3321 41.9636L13.7896 43.5673L5.74123 43.0423L12.4664 47.4743L11.9292 49.061L0.697205 48.2572L1.27412 46.5511L9.513 47.2315L2.56622 42.7431L3.03463 41.3434Z' fill='white'/%3E%3Cpath d='M8.97576 29.129L20.4677 31.2111L19.4879 32.805L16.3274 32.1935L14.1541 35.7277L16.1495 38.2344L15.1782 39.8132L8.05084 30.633L8.97576 29.129ZM13.0949 34.4062L14.6483 31.8798L10.4313 31.0609L13.0949 34.4062Z' fill='white'/%3E%3Cpath d='M11.9443 24.6018L17.9735 17.8515L19.1974 18.9264L16.7939 21.6168L23.7333 27.7194L22.5087 29.0909L15.5686 22.9915L13.165 25.6819L11.9443 24.6018Z' fill='white'/%3E%3Cpath d='M23.2332 13.3073C24.0242 12.6056 25.0536 12.2267 26.1146 12.2466C27.1756 12.2666 28.1898 12.684 28.9534 13.415L27.525 14.5213C27.0528 14.1633 26.471 13.977 25.8769 13.9936C25.2828 14.0102 24.7124 14.2287 24.2613 14.6125C22.7489 15.7838 22.8528 17.8049 24.2613 19.5996C25.6613 21.3773 27.6097 21.9915 29.136 20.8097C29.6227 20.4669 29.9752 19.9679 30.1336 19.397C30.292 18.8261 30.2467 18.2185 30.0053 17.677L31.4337 16.5713C31.9663 17.4839 32.1314 18.5624 31.8958 19.5907C31.6602 20.6189 31.0414 21.5208 30.1634 22.1155C27.9511 23.8288 24.8574 23.3623 22.7912 20.7375C20.7251 18.1127 21.0208 15.0207 23.2332 13.3073Z' fill='white'/%3E%3Cpath d='M38.0636 4.92432L42.843 14.6499L41.1817 15.453L39.0884 11.1917L34.1536 13.5776L36.2469 17.8383L34.5863 18.6389L29.8069 8.9127L31.4682 8.10951L33.4371 12.1176L38.3726 9.7323L36.403 5.72423L38.0636 4.92432Z' fill='white'/%3E%3Cpath d='M50.151 12.7292L48.3514 13.1433L45.8843 2.606L47.6839 2.19128L50.151 12.7292Z' fill='white'/%3E%3Cpath d='M60.8451 11.4555L59.4286 11.5717L53.2142 4.17695L53.8685 12.0277L52.0981 12.1727L51.199 1.38941L52.9343 1.24701L58.7994 8.29919L58.1755 0.818513L59.946 0.673492L60.8451 11.4555Z' fill='white'/%3E%3Cpath d='M75.0483 2.52267L75.2679 10.7396L78.9781 3.4151L80.7102 3.80882L75.5445 13.7319L73.8825 13.3552L73.6113 5.36139L69.8309 12.4372L68.1862 12.0638L67.8812 0.900543L69.647 1.30083L69.7793 9.49808L73.5934 2.19523L75.0483 2.52267Z' fill='white'/%3E%3Cpath d='M82.8287 16.9663C80.1876 15.6644 79.3884 12.6354 80.832 9.74807C82.2875 6.84439 85.1985 5.66323 87.8403 6.96447C90.482 8.26572 91.3077 11.2895 89.8529 14.1932C88.4066 17.0778 85.4698 18.2669 82.8287 16.9663ZM87.1052 8.42845C85.3851 7.58195 83.5326 8.51638 82.5025 10.5683C81.4724 12.6203 81.8455 14.6519 83.5611 15.4984C85.2766 16.3449 87.1522 15.4183 88.1797 13.367C89.2071 11.3157 88.8234 9.27561 87.1052 8.42845Z' fill='white'/%3E%3Cpath d='M95.3044 25.1898L94.1942 24.3111L94.7851 14.7083L89.835 20.8621L88.4456 19.7637L95.2482 11.3105L96.6084 12.3873L95.9997 21.5032L100.717 15.6381L102.106 16.7366L95.3044 25.1898Z' fill='white'/%3E%3Cpath d='M105.009 19.5944L107.352 22.4049C109.403 24.8623 109.082 27.7975 106.522 29.8967C103.962 31.9959 100.995 31.7544 98.9472 29.2969L96.6045 26.4864L105.009 19.5944ZM100.174 28.1985C101.635 29.9499 103.549 29.9551 105.345 28.4846C107.152 27.0029 107.507 25.1379 106.047 23.3833L104.927 22.0394L99.0544 26.8546L100.174 28.1985Z' fill='white'/%3E%3Cpath d='M115.93 35.4449L114.501 36.2251L111.938 31.6114L109.418 32.9894L111.74 37.1713L110.325 37.9443L108.002 33.763L105.264 35.2592L107.827 39.8729L106.38 40.6604L102.94 34.4737L112.491 29.2536L115.93 35.4449Z' fill='white'/%3E%3Cpath d='M111.761 42.3776L107.568 43.7714L106.982 42.0345L117.32 38.5979L118.658 42.5561C119.375 44.677 118.759 46.4047 116.74 47.0767C115.005 47.6528 113.673 46.9809 112.873 45.4447L109.617 49.834L108.951 47.8654L112.179 43.6152L111.761 42.3776ZM113.226 41.8907L113.965 44.0785C114.354 45.2308 115.198 45.6757 116.157 45.3561C117.117 45.0366 117.52 44.1789 117.131 43.026L116.392 40.8382L113.226 41.8907Z' fill='white'/%3E%3Cpath d='M112.073 51.1477C112.124 51.3836 112.103 51.6292 112.013 51.8533C111.923 52.0773 111.767 52.2696 111.566 52.4058C111.366 52.5419 111.129 52.6158 110.885 52.6179C110.642 52.62 110.404 52.5504 110.201 52.4177C109.997 52.2851 109.839 52.0956 109.744 51.8732C109.65 51.6508 109.625 51.4056 109.671 51.1688C109.718 50.932 109.835 50.7144 110.006 50.5435C110.178 50.3727 110.397 50.2564 110.636 50.2094C110.792 50.1753 110.954 50.1727 111.112 50.2017C111.27 50.2306 111.42 50.2906 111.554 50.378C111.688 50.4655 111.803 50.5786 111.892 50.7108C111.981 50.843 112.043 50.9916 112.073 51.1477V51.1477ZM120.282 48.4521L120.697 50.5257L113.275 51.5395L113.033 50.3295L120.282 48.4521Z' fill='white'/%3E%3Cpath d='M12.772 89.7422L9.35289 91.9254L8.35321 90.3853L17.5203 84.532L19.7982 88.042C21.0188 89.9226 20.831 91.7823 18.9348 92.9917C17.0684 94.1833 15.2709 93.5928 14.0502 91.7121L12.772 89.7422ZM18.4353 88.8701L17.1783 86.9304L14.1177 88.8845L15.3747 90.8243C15.4964 91.0396 15.6612 91.2279 15.859 91.3777C16.0568 91.5275 16.2834 91.6355 16.5248 91.6951C16.7663 91.7548 17.0175 91.7648 17.2631 91.7245C17.5086 91.6842 17.7432 91.5945 17.9524 91.4609C18.1616 91.3273 18.3411 91.1526 18.4797 90.9476C18.6183 90.7427 18.7132 90.5117 18.7584 90.269C18.8036 90.0263 18.7983 89.777 18.7428 89.5364C18.6872 89.2958 18.5826 89.0691 18.4353 88.8701V88.8701Z' fill='white'/%3E%3Cpath d='M19.1069 97.7321L15.8942 100.746L14.6252 99.4172L22.5472 91.9838L25.4397 95.0167C26.9892 96.6421 27.1645 98.4657 25.6164 99.9185C24.2872 101.165 22.794 101.112 21.4165 100.05L20.3249 105.39L18.8846 103.881L20.0093 98.6783L19.1069 97.7321ZM20.2316 96.6789L21.8307 98.3555C22.6729 99.2381 23.6263 99.2892 24.3613 98.5989C25.0964 97.9086 25.0983 96.9624 24.2561 96.0798L22.657 94.4032L20.2316 96.6789Z' fill='white'/%3E%3Cpath d='M34.7781 102.693L33.8109 103.999L29.531 100.882L27.8281 103.182L31.7077 106.004L30.7517 107.296L26.8721 104.474L25.0229 106.973L29.3028 110.09L28.3256 111.411L22.5849 107.231L29.0375 98.5129L34.7781 102.693Z' fill='white'/%3E%3Cpath d='M33.4549 110.866C33.374 111.394 33.4779 111.934 33.7493 112.396C34.0208 112.857 34.4434 113.213 34.9468 113.403C36.094 113.963 37.1096 113.793 37.5575 112.892C37.8949 112.212 37.6931 111.623 36.7914 110.887L35.3312 109.682C34.1344 108.704 33.4126 107.447 34.19 105.883C35.0064 104.24 36.9733 103.669 38.9488 104.637C41.066 105.673 41.7759 107.355 41.3253 109.138L39.6713 108.328C39.7317 107.846 39.6269 107.358 39.3738 106.942C39.1208 106.526 38.7341 106.207 38.276 106.035C37.2247 105.521 36.2409 105.707 35.8406 106.513C35.5185 107.161 35.7282 107.775 36.5022 108.408L38.0107 109.637C39.367 110.732 39.9293 112.107 39.2082 113.562C38.3051 115.379 36.2819 115.784 34.2588 114.795C32.188 113.781 31.2247 112.014 31.7692 110.042L33.4549 110.866Z' fill='white'/%3E%3Cpath d='M42.6069 114.824C42.6214 115.358 42.8196 115.871 43.1686 116.277C43.5177 116.684 43.9965 116.96 44.5255 117.059C45.7541 117.41 46.724 117.064 47.0039 116.098C47.2156 115.371 46.9119 114.825 45.893 114.261L44.239 113.331C42.8861 112.577 41.9519 111.467 42.4382 109.787C42.9496 108.027 44.7842 107.12 46.9006 107.725C49.1713 108.374 50.1683 109.905 50.0426 111.739L48.2675 111.232C48.2412 110.747 48.0511 110.285 47.728 109.92C47.4048 109.555 46.9673 109.308 46.4858 109.22C45.3611 108.898 44.423 109.254 44.1702 110.118C43.9717 110.812 44.2853 111.379 45.1626 111.867L46.8662 112.812C48.3972 113.653 49.1971 114.908 48.7452 116.466C48.1795 118.413 46.2602 119.167 44.0915 118.547C41.8725 117.914 40.6095 116.343 40.7948 114.305L42.6069 114.824Z' fill='white'/%3E%3Cpath d='M55.0481 109.745L64.1398 109.935L64.1054 111.555L60.4825 111.479L60.288 120.673L58.4415 120.635L58.636 111.441L55.0137 111.365L55.0481 109.745Z' fill='white'/%3E%3Cpath d='M70.8835 119.979C67.9778 120.475 65.5246 118.499 64.9728 115.32C64.4171 112.125 66.0638 109.466 68.9695 108.969C71.8753 108.472 74.3424 110.428 74.8981 113.623C75.4499 116.802 73.7893 119.482 70.8835 119.979ZM69.2474 110.586C67.3572 110.909 66.4158 112.751 66.8081 115.007C67.2004 117.263 68.7095 118.687 70.5997 118.364C72.4899 118.04 73.4492 116.198 73.0575 113.939C72.6659 111.68 71.1409 110.262 69.2474 110.586Z' fill='white'/%3E%3Cpath d='M83.141 111.977L84.9022 115.614L83.2369 116.408L78.5138 106.656L82.3087 104.849C84.3418 103.879 86.1784 104.294 87.1556 106.311C88.1169 108.296 87.3038 109.993 85.27 110.962L83.141 111.977ZM82.969 106.293L80.8711 107.292L82.4483 110.547L84.5456 109.548C84.7762 109.455 84.9851 109.316 85.1595 109.139C85.3339 108.963 85.4701 108.754 85.5597 108.523C85.6493 108.293 85.6904 108.047 85.6805 107.8C85.6706 107.553 85.6099 107.311 85.5021 107.089C85.3944 106.866 85.2418 106.668 85.0538 106.506C84.8658 106.344 84.6464 106.222 84.4091 106.147C84.1718 106.073 83.9216 106.047 83.674 106.072C83.4263 106.097 83.1864 106.172 82.969 106.292V106.293Z' fill='white'/%3E%3Cpath d='M86.6123 102.583L88.1088 101.509L93.5339 108.948L97.7808 105.902L98.7487 107.231L93.0047 111.35L86.6123 102.583Z' fill='white'/%3E%3Cpath d='M96.8254 93.9872L107.635 98.3837L106.343 99.742L103.379 98.4952L100.516 101.507L101.945 104.369L100.665 105.715L95.6068 95.2694L96.8254 93.9872ZM99.755 99.9953L101.802 97.8423L97.8449 96.1756L99.755 99.9953Z' fill='white'/%3E%3Cpath d='M103.239 85.3673L104.306 83.7438L107.634 90.586L111.279 92.9431L110.28 94.4635L106.634 92.1058L98.9901 91.8315L100.086 90.1641L105.76 90.4043L103.239 85.3673Z' fill='white'/%3E%3C/svg%3E%0A");
      /* content: "Play"; */
      font-family: "balgin-medium";
      font-size: 20px;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }
`
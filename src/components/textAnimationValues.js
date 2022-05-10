export const line = {
  visible: {
    transition: {
      duration: 2,
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
}

export const word = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 100,
      damping: 11,
    },
  },
  hidden: {
    y: 100,
    opacity: 0,
  },
}

export const textFadeIn = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
  },
}

export const textChild = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
  hidden: {
    opacity: 0,
    y: 80,
  },
}

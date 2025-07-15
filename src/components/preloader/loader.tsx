"use client";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { opacity, slideUp } from "./anim";
import { usePreloader } from ".";
import Image from "next/image";

const steps = [
  "10%",
  "20%",
  "30%",
  "40%",
  "50%",
  "60%",
  "70%",
  "80%",
  "90%",
  "100%",
];

export default function Index() {
  const { isLoading, loadingPercent } = usePreloader();
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index == steps.length - 1) return;
    setTimeout(
      () => {
        setIndex(index + 1);
      },
      index == 0 ? 1000 : 150
    );
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  const logoAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0, 0.2, 1] }
    },
    exit: { 
      scale: 0.9, 
      opacity: 0,
      transition: { duration: 0.4, ease: [0.6, 0, 0.2, 1] }
    }
  };

  const progressAnimation = {
    initial: { width: 0 },
    animate: { 
      width: `${loadingPercent}%`,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      {dimension.width > 0 && (
        <>
          <div className={styles.content}>
            <motion.div 
              className={styles.logoContainer}
              variants={logoAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={120}
                height={120}
                className={styles.logo}
                priority
              />
            </motion.div>
            
            <motion.div 
              className={styles.loadingContainer}
              variants={opacity} 
              initial="initial" 
              animate="enter"
            >
              <div className={styles.percentageText}>
                {(loadingPercent - (loadingPercent % 5)).toFixed(0)}%
              </div>
              
              <div className={styles.progressBar}>
                <motion.div 
                  className={styles.progressFill}
                  variants={progressAnimation}
                  initial="initial"
                  animate="animate"
                />
              </div>
              
              <div className={styles.loadingText}>
                Loading your experience...
              </div>
            </motion.div>
          </div>
          
          <svg>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}
"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "../components/index";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { awards, cardImages, type Award } from "../assets/data";

const Header = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [showNav, setShowNav] = useState<boolean>(true);
  const [isTransparent, setIsTransparent] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<string>("GROW");

  const headerContainer = useRef<HTMLDivElement>(null);

  const words = ["GROW", "INNOVATE", "SUCCEED", "EVOLVE", "THRIVE"];

  // Animacja zmiany słowa co 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => {
        const currentIndex = words.indexOf(prev);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Ustawienia navbara w zaleznosci od scrolla
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY; // Obecny scroll

      // Schowaj navbar jeżeli scrollujesz w dół i scroll px > wysokość navbar
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNav(false);
      } else {
        // W innym przypadku pokaż navbar
        setShowNav(true);
      }

      const headerHeight = window.innerHeight * 3; // Wysokosc header
      setIsTransparent(currentScrollY < headerHeight); // Ustaw bg-black navbarowi poza header
      setLastScrollY(currentScrollY); // Aktualizacja obecnego scrolla
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const { scrollYProgress } = useScroll({
    target: headerContainer,
    offset: ["start start", "end start"],
  });

  const moveX = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const reverseMoveX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const moveY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const reverseMoveY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  // Animacja lewej sekcji
  const awardsContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const awardItem = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <header ref={headerContainer}>
      <Container className={desktop ? "h-[300vh]" : "h-[200vh]"}>
        {/* Navbar */}
        <nav
          className={`fixed top-0 left-0 z-100 flex h-20 w-full items-center justify-between px-4 transition-all duration-300 lg:px-8 ${showNav ? "translate-y-0" : "-translate-y-full"} ${isTransparent ? "bg-transparent" : "bg-black"}`}
        >
          {/* Logo */}
          <h1 className="text-lg leading-4 font-medium">SHAREYOU</h1>
          {/* Widget */}
          <button className="flex cursor-pointer items-center gap-x-2 rounded-full bg-white p-1 pr-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-3 border-blue-700">
              <img
                src="/profile.jpg"
                alt="user image profile"
                width={40}
                height={40}
                className="absolute size-full object-cover object-center"
              />
            </div>
            <p className="text-sm font-semibold text-black">Let's Talk</p>
          </button>
        </nav>
        {/* Content */}
        <section className="h-full lg:flex lg:flex-row lg:gap-x-10 xl:pl-10">
          {/* Lewa strona - tekst */}
          <div className="sticky top-0 flex-1 flex-col justify-center space-y-4 px-4 pt-30 pb-10 sm:space-y-6 lg:flex lg:h-screen lg:space-y-10 lg:text-base">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
              className="max-w-lg text-5xl font-medium xl:text-7xl"
            >
              DESIGN FOR COMPANIES READY TO{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block text-blue-700"
                >
                  {currentWord}
                </motion.span>
              </AnimatePresence>
            </motion.h2>
            {/* Awards - desktop */}
            <div className="hidden space-y-4 sm:space-y-6 lg:block">
              <motion.h3
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.3 },
                }}
                className="font-semibold lg:text-lg"
              >
                Awards & Recognition
              </motion.h3>
              <motion.div
                variants={awardsContainer}
                initial="hidden"
                animate="show"
                className="flex gap-x-6 text-sm font-medium sm:gap-x-12"
              >
                {awards.map((a: Award, i: number) => (
                  <motion.div variants={awardItem} key={i}>
                    <p className="mb-2 text-base lg:text-lg">{a.value}</p>
                    <p>{a.label}</p>
                    <p className="opacity-60">{a.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            {/* Linki */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 1.2 },
              }}
            >
              <span className="font-semibold underline">View Projects</span>{" "}
              <span className="opacity-60">or</span>{" "}
              <span className="font-semibold underline">Explore Services</span>
            </motion.p>
          </div>
          {/* Prawa strona - zdjecia i mobilne awards */}
          <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-black lg:h-full lg:flex-1">
            <div className="flex-2 space-y-2 gap-x-2 overflow-hidden lg:flex lg:h-full lg:flex-1 lg:flex-row lg:gap-x-4">
              <motion.div
                initial={
                  desktop ? { opacity: 0, y: 200 } : { opacity: 0, x: 200 }
                }
                animate={
                  desktop
                    ? { opacity: 1, y: 0, transition: { duration: 1 } }
                    : { opacity: 1, x: 0, transition: { duration: 1 } }
                }
                style={desktop ? { y: moveY } : { x: moveX }}
                className="flex h-1/2 w-full gap-x-2 will-change-scroll lg:h-full lg:flex-col lg:gap-y-4"
              >
                {cardImages.slice(0, 6).map((img, i) => (
                  <div
                    key={i}
                    className="relative flex h-full min-w-60 items-center justify-center bg-white/10 lg:w-full lg:flex-1"
                  >
                    <img
                      src={img}
                      alt=""
                      aria-hidden="true"
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                ))}
              </motion.div>
              <motion.div
                initial={
                  desktop ? { opacity: 0, y: -200 } : { opacity: 0, x: -200 }
                }
                animate={
                  desktop
                    ? { opacity: 1, y: 0, transition: { duration: 1 } }
                    : { opacity: 1, x: 0, transition: { duration: 1 } }
                }
                style={desktop ? { y: reverseMoveY } : { x: reverseMoveX }}
                className="flex h-1/2 w-full flex-row-reverse gap-x-2 lg:h-full lg:flex-col-reverse lg:gap-y-4"
              >
                {cardImages.slice(4, 10).map((img, i) => (
                  <div
                    key={i}
                    className="relative flex h-full min-w-60 items-center justify-center bg-white/10 will-change-scroll lg:w-full lg:flex-1"
                  >
                    <img
                      src={img}
                      alt={`Card ${i + 1}`}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            {/* Mobilne awards */}
            <div className="flex flex-1 flex-col justify-center overflow-hidden lg:hidden">
              <div className="space-y-4 text-center sm:space-y-6">
                <h3 className="px-4 text-base font-semibold sm:text-lg">
                  Awards & Recognition
                </h3>
                <div className="relative flex w-full overflow-hidden py-4">
                  <motion.div
                    className="flex gap-x-12 px-6"
                    animate={{
                      x: ["0%", "-50%"],
                    }}
                    transition={{
                      ease: "linear",
                      duration: 15,
                      repeat: Infinity,
                    }}
                  >
                    {Array(3)
                      .fill(awards)
                      .flatMap((list) => list)
                      .map((a: Award, i: number) => (
                        <div
                          key={i}
                          className="flex shrink-0 gap-x-12 text-base"
                        >
                          <div className="min-w-45 shrink-0 font-medium">
                            <p className="mb-2 text-base lg:text-lg">
                              {a.value}
                            </p>
                            <p>{a.label}</p>
                            <p className="opacity-60">{a.description}</p>
                          </div>
                        </div>
                      ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </header>
  );
};

export default Header;

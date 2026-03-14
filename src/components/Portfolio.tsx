import { work, type Work } from "../assets/data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Portfolio = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const selectedWorkRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const scrollPosition = useRef<number>(0);

  const handleScroll = (direction: "left" | "right") => {
    if (!selectedWorkRef.current) return;
    const amount = selectedWorkRef.current.clientWidth;
    selectedWorkRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleScroll("left");
      if (e.key === "ArrowRight") handleScroll("right");
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  // Efekt do blokowania scrolla strony
  useEffect(() => {
    if (showDialog) {
      // Zapisz aktualną pozycję scrolla
      scrollPosition.current = window.scrollY;

      // Zablokuj scroll strony
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = "100%";

      // Ukryj navbar
      document.body.classList.add("modal-open");
    } else {
      // Przywróć scroll strony
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      // Przywróć pozycję scrolla
      window.scrollTo(0, scrollPosition.current);

      // Pokaż navbar
      document.body.classList.remove("modal-open");
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.classList.remove("modal-open");
    };
  }, [showDialog]);

  return (
    <>
      <section className="bg-black py-16 lg:px-6">
        <motion.div
          initial={{ borderRadius: 56 }}
          whileInView={{ borderRadius: 0 }}
          viewport={{ once: false, amount: desktop ? 0.5 : 0.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="space-y-8 bg-slate-200 p-4 pt-14 pb-8 text-black md:space-y-10 lg:p-6 lg:pt-20"
        >
          {/* TITLE + NAVIGATION */}
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-medium md:text-6xl">Selected work</h2>
            <div className="hidden flex-row gap-x-4 lg:flex">
              <ArrowLeft
                size={40}
                className="cursor-pointer"
                onClick={() => handleScroll("left")}
              />
              <ArrowRight
                size={40}
                className="cursor-pointer"
                onClick={() => handleScroll("right")}
              />
            </div>
          </div>

          {/* CARDS */}
          <section
            ref={selectedWorkRef}
            className="flex flex-col gap-x-6 gap-y-12 md:flex-row md:overflow-x-scroll lg:overflow-x-hidden"
          >
            {work.map((w: Work, i: number) => (
              <div
                onClick={() => {
                  setShowDialog(true);
                }}
                key={i}
                className="cursor-pointer space-y-4 transition-colors hover:text-blue-800 sm:space-y-6"
              >
                <div className="relative h-100 w-full overflow-hidden rounded-4xl bg-blue-800 duration-300 sm:rounded-none md:h-125 md:min-w-100 md:hover:rounded-4xl">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="absolute size-full object-cover object-center"
                  />
                  <div className="absolute right-4 bottom-6 grid h-12 w-12 place-items-center rounded-full bg-black">
                    <ArrowRight className="text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-600 uppercase">
                    {w.bio}
                  </p>
                  <h3 className="mb-4 max-w-sm text-xl font-medium md:text-2xl">
                    {w.title}
                  </h3>
                  <ul className="flex items-center gap-x-4 lg:gap-x-8">
                    {w.extra_info.map((e, i: number) => (
                      <li key={i} className="space-y-1">
                        <p className="text-2xl font-semibold text-blue-700 md:text-3xl">
                          {e.title}
                        </p>
                        <p className="max-w-50 text-sm font-light">
                          {e.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>
        </motion.div>
      </section>

      {showDialog && (
        <div className="fixed inset-0 z-50 bg-black/80">
          <div className="relative flex h-full w-full items-start justify-center overflow-y-auto">
            <article
              className="w-full max-w-7xl space-y-8 bg-black p-4 lg:space-y-12 lg:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <section className="flex w-full flex-col gap-6 lg:flex-row lg:gap-8">
                <div className="relative aspect-square max-w-md lg:h-full lg:max-w-none lg:flex-1">
                  <img
                    src="/cards/eccomerce.webp"
                    alt="3kiwi eccomerce platform"
                    className="absolute size-full object-cover object-center"
                  />
                </div>
                <div className="flex max-w-md flex-1 flex-col gap-4 lg:max-w-none lg:justify-between lg:pt-4">
                  <h2 className="text-3xl font-medium lg:text-4xl xl:text-5xl">
                    Unleashing the power of an updated e-commerce platform
                  </h2>
                  <div className="flex items-center lg:gap-x-6">
                    <div>
                      <p className="text-2xl font-medium text-blue-600 lg:text-3xl">
                        2
                      </p>
                      <p className="max-w-40 opacity-60">
                        weeks for new UI design concept
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-blue-600 lg:text-3xl">
                        15
                      </p>
                      <p className="max-w-40 opacity-60">
                        master designs for IdoSell Team
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              {/* Content */}
              <section>
                <ul className="space-y-4 leading-6 lg:space-y-6 lg:leading-8">
                  <div className="space-y-1 lg:space-y-2">
                    <li className="mb-2 font-semibold opacity-60">Client</li>
                    <li>3kiwi Baby</li>
                  </div>
                  <div className="space-y-1 lg:space-y-2">
                    <li className="mb-2 font-semibold opacity-60">Role</li>
                    <li>Design audit</li>
                    <li>UX research</li>
                    <li>UI design & direction</li>
                    <li>Collaboration with the IdeoSell team</li>
                  </div>
                  <div className="space-y-1 lg:space-y-2">
                    <li className="mb-2 font-semibold opacity-60">Industry</li>
                    <li>E-commerce</li>
                  </div>
                  <div>
                    <li className="mb-2 font-semibold opacity-60">Challange</li>
                    <li>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Blanditiis veniam libero quidem facilis enim nisi.
                      Doloribus eveniet facilis impedit, magnam sequi reiciendis
                      fugiat temporibus dicta non deleniti tenetur voluptates
                      nesciunt sit voluptatem iure recusandae rem beatae
                      consequuntur. Architecto, pariatur ducimus officiis labore
                      cumque eius ratione error totam magni dolorem quia
                      similique mollitia consequatur veritatis molestias quos?
                      Nemo ea consequatur facere, animi mollitia voluptatum
                      beatae doloribus repudiandae reiciendis ad officia saepe
                      natus, maiores minus aliquam laudantium unde totam laborum
                      nulla reprehenderit nam! Iure doloremque nihil ad non
                      labore cupiditate corporis tempore, animi odit quia atque,
                      repudiandae mollitia sit saepe molestiae quibusdam!
                    </li>
                  </div>
                  <div>
                    <li className="mb-2 font-semibold opacity-60">Process</li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reprehenderit eligendi voluptate aspernatur quae! Sint,
                      obcaecati! Maxime error, sapiente obcaecati quos, debitis
                      excepturi earum esse ipsa nemo pariatur hic dicta ad quae
                      nesciunt omnis cupiditate saepe exercitationem recusandae
                      necessitatibus, beatae nam enim! Voluptatum vel
                      consectetur quasi similique commodi. Dolorem dignissimos
                      illum inventore suscipit illo corporis enim beatae,
                      consequatur, ratione aspernatur nobis?
                    </li>
                  </div>
                  <div>
                    <li className="mb-2 font-semibold opacity-60">Outcome</li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quos magni eius amet harum doloremque provident impedit
                      laboriosam, repellendus molestias consequuntur dolorum
                      dolore vel dolorem incidunt a nam itaque sint. Atque
                      aspernatur illum, voluptatem labore aut eius asperiores,
                      debitis in minima earum omnis sequi laborum incidunt
                      doloremque, nihil est nulla tempora sint! Quibusdam neque
                      tempora exercitationem molestias rerum, laborum saepe
                      error eligendi sapiente quas unde hic placeat numquam
                      quaerat iste consequuntur odio animi eius. Harum tempora
                      sequi nulla, est earum culpa!
                    </li>
                  </div>
                </ul>
              </section>
              {/* Zdjęcia */}
              <section className="flex flex-col gap-4 sm:flex-row">
                <div className="relative aspect-video flex-1 bg-white/10">
                  <img
                    src="/cards/eccomerce2.webp"
                    alt=""
                    className="absolute size-full object-cover object-center"
                  />
                </div>
                <div className="relative aspect-video flex-1 bg-white/10">
                  <img
                    src="/cards/eccomerce3.webp"
                    alt=""
                    className="absolute size-full object-cover object-center"
                  />
                </div>
              </section>
              {/* Button */}
              <div className="sticky bottom-6 -mt-4 flex justify-end">
                <button
                  onClick={() => setShowDialog(false)}
                  className="cursor-pointer rounded-full bg-white px-8 py-3 font-semibold text-black"
                >
                  Close ✕
                </button>
              </div>
            </article>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;

import { list } from "../assets/data";

const Introduction = () => {
  return (
    <section
      className="relative flex w-full flex-col lg:min-h-screen lg:flex-row lg:p-6"
      aria-label="Introduction – tailored design solutions"
    >
      <div className="flex min-h-full flex-1 flex-col justify-end space-y-4 px-4 py-12 md:space-y-6">
        <h2 className="max-w-md text-4xl font-medium md:text-5xl lg:text-7xl">
          From idea to reality in <span className="text-blue-600">4 weeks</span>
        </h2>
        <p className="text-base/6 font-medium md:text-lg/8 lg:text-xl">
          Get a tailored design solution in weeks, not months. <br />
          <span className="opacity-60">
            Make your clients see the true value of your offer.
          </span>
        </p>
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-between gap-y-16 bg-blue-600 p-4 lg:p-6">
        <ul className="flex flex-wrap gap-2">
          {list.map((item, i) => (
            <li
              key={i}
              className="w-fit bg-black px-4 py-2 text-lg font-medium text-blue-600 md:text-2xl lg:px-8 lg:py-4 lg:text-3xl"
            >
              {item}
            </li>
          ))}
        </ul>
        <a
          href="/"
          className="w-fit rounded-full bg-white p-4 font-semibold text-black lg:px-8 lg:text-base"
          aria-label="Book a 30-minute introductory call"
        >
          Book a 30-min intro call
        </a>
      </div>
    </section>
  );
};

export default Introduction;

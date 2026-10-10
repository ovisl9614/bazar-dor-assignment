
const Banner = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-5 sm:px-6 lg:px-8">

      <div className="flex flex-col items-center justify-between gap-6 overflow-hidden rounded-xl border border-green-100 bg-gradient-to-r from-green-50 via-white to-green-50 px-5 py-6 sm:flex-row sm:px-8 sm:py-8 lg:px-10">

        {/* Left Side Heading and Button */}
        <div className="w-full text-center sm:w-3/5 sm:text-left">

          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            প্রতিদিনের বাজার, এক নজরে
          </span>

          <h1 className="mt-3 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            চাল, ডাল, তেল, মাছ, মাংস ও নিত্যপ্রয়োজনীয়
            পণ্যের আজকের দাম জানুন সহজেই।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-5 inline-flex items-center justify-center rounded-md bg-green-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            সব পণ্যের দাম দেখুন
          </a>

        </div>

        {/* Right Side Hero Image */}
        <div className="flex w-full items-center justify-center sm:w-2/5">
          <img
            src="/bazar-hero.png"
            alt="তাজা ফল ও সবজির ঝুড়ি"
            className="h-36 w-auto max-w-full object-contain sm:h-44 lg:h-52"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;

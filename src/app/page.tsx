
import Link from "next/link";
import Marquee from "@/components/Marquee";
import Banner from "@/components/Banner";



type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};


const formatPrice = (price: number) =>
  new Intl.NumberFormat("bn-BD").format(price);

const formatPercent = (pct: number) =>
  new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.abs(pct));

const unitLabels: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  l: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  piece_unit: "প্রতি পিস",
};



function getUnitLabel(unit: string) {
  return (
    unitLabels[unit?.toLowerCase()] ??
    `প্রতি ${unit || "পিস"}`
  );
}

function ProductCard({ product }: { product: Product }) {
  const badgeStyles = {
    up: "bg-green-100 text-green-700",
down: "bg-red-100 text-red-700",
    flat: "bg-gray-100 text-gray-600",
  };



  const badgeText = {
    up: `▲ ${formatPercent(product.change.pct)}%`,
    down: `▼ ${formatPercent(product.change.pct)}%`,
   flat: "—০.০%",
  };

  return (

    <Link
      href={`/products/${product.slug}`}
      aria-label={`${product.nameBn} বিস্তারিত দেখুন`}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:p-4"
    >


      {/* Product emoji / illustration */}
      <div className="flex aspect-[5/3] items-center justify-center rounded-xl bg-green-50 text-5xl transition group-hover:bg-green-100 sm:text-6xl">
   {product.image || product.categoryIcon || "🛒"}
      </div>

      {/* Product name */}
      <h3 className="mt-3 line-clamp-2 min-h-10 text-sm font-bold leading-5 text-gray-800 sm:text-base">
        {product.nameBn}

</h3>

      {/* Unit */}
      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
        {getUnitLabel(product.unit)}
   </p>

      {/* Today's price */}
      <div className="mt-auto pt-3">
        <p className="text-xs text-gray-500">
          আজকের দাম
        </p>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
          <p className="text-base font-extrabold
           text-gray-900 sm:text-lg">
            {formatPrice(product.today)} 
            টাকা
          </p>

          <span
            className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold sm:text-xs ${
              badgeStyles[product.change.dir]
            }`}
          >
            {badgeText[product.change.dir]}
          </span>
        </div>
      </div>
    </Link>
  );
}

function ProductSection({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle: string;
  products: Product[];
}) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-extrabold
         text-gray-900 sm:text-2xl">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {subtitle}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : 
      (
        <p className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500">
          এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}

export default async function Home() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Products API থেকে ডেটা আনা যায়নি।");
  }

  const json = await res.json();

  const products: Product[] = Array.isArray(json)
    ? json
    : Array.isArray(json.data)
      ? json.data
      : [];

  // Highest price increases first
  const increased = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Biggest price decreases first
  const decreased = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-gray-50">
      <Marquee />
      <Banner />

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* Section A */}
        <ProductSection
          title="আজ দাম বেড়েছে ▲"
          subtitle="যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে"
          products={increased}
        />

        {/* Section B */}
        <ProductSection
          title="আজ দাম কমেছে ▼"
          subtitle="যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে"
          products={decreased}
        />

        {/* Section C */}
        <section id="সব-পণ্য">
          <ProductSection
            title="সব পণ্য"
            subtitle="নিত্যপ্রয়োজনীয় সব পণ্যের আজকের বাজারদর এক জায়গায়"
            products={products}
          />
        </section>

      </div>
    </main>
  );
}

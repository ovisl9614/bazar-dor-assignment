
import Link from "next/link";

export type Product = {
  id: string | number;
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

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const price = new Intl.NumberFormat("bn-BD").format(
    product.today
  );

  const change = new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(Math.abs(product.change.pct));

  const badge =
    product.change.dir === "up"
      ? `▲ ${change}%`
      : product.change.dir === "down"
        ? `▼ ${change}%`
        : "— ০.০%";

  const badgeColor =
    product.change.dir === "up"
      ? "bg-green-100 text-green-700"
      : product.change.dir === "down"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-600";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-4"
    >
      <div className="flex aspect-5/3 items-center justify-center rounded-xl bg-green-50 text-5xl">
        {product.image || product.categoryIcon || "🛒"}
      </div>

      <h3 className="mt-3 font-bold text-gray-800">
        {product.nameBn}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        প্রতি {product.unit}
      </p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
        <span className="font-extrabold text-gray-900">
          {price} টাকা
        </span>

        <span
          className={`rounded-full px-2 py-1 text-xs font-bold ${badgeColor}`}
        >
          {badge}
        </span>
      </div>
    </Link>
  );
}

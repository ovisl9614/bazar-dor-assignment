
import ProductCard from "@/components/ProductCard";

type Product = {
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

type CategoryPageProps = {
  params: Promise<{
    categoryid: string;
  }>;
};

const API_URL = "https://api.api-store.workers.dev/api/bazardor";

export default async function CategoryProducts({
  params,
}: CategoryPageProps) {
  const { categoryid } = await params;

  const res = await fetch(
    `${API_URL}/categories/${categoryid}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }

  const data = await res.json();


  const categoryProducts: Product[] = Array.isArray(data.data)
    ? data.data
    : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-5 border-b-2 border-red-700 pb-3 text-2xl font-bold">
        {data.title ?? categoryid}
      </h1>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-gray-500">
          Error
        </p>
      )}
    </main>
  );
}

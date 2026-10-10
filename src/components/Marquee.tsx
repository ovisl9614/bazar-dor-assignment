
interface Product {
  id?: string | number;
  emoji?: string;
  icon?: string;
  nameBn?: string;
  name?: string;
  title?: string;
  price?: number | string;
  changePercent?: number | string;
  change?: number | string;
}

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

const bn = (value: number) => value.toLocaleString("bn-BD");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isProduct(value: unknown): value is Product {
  return isRecord(value);
}

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.error(
        "Products API error:",
        response.status,
        response.statusText
      );
      return [];
    }

    const json: unknown = await response.json();

    let data: unknown[] = [];

    if (Array.isArray(json)) {
      data = json;
    } else if (isRecord(json)) {
      if (Array.isArray(json.data)) {
        data = json.data;
      } else if (Array.isArray(json.products)) {
        data = json.products;
      }
    }

    return data.filter(isProduct).slice(0, 10);
  } catch (error) {
    console.error("Could not load marquee products:", error);
    return [];
  }
}

const Marquee = async () => {
  const products = await getProducts();

  if (products.length === 0) {
    return null;
  }

  // Duplicate the list to create a continuous ticker.
  const tickerItems = [...products, ...products];

  return (
    <section
      aria-label="আজকের বাজারদর"
      className="w-full overflow-hidden border-b border-green-100 bg-green-50"
    >
      <div className="marquee-track flex w-max items-center py-3">
        {tickerItems.map((product, index) => {
          const name =
            product.nameBn ??
            product.name ??
            product.title ??
            "পণ্য";

          const parsedPrice = Number(product.price ?? 0);
          const price = Number.isFinite(parsedPrice) ? parsedPrice : 0;

          const parsedChange = Number(
            product.changePercent ?? product.change ?? 0
          );
          const change = Number.isFinite(parsedChange)
            ? parsedChange
            : 0;

          const color =
            change > 0
              ? "text-green-600"
              : change < 0
                ? "text-red-600"
                : "text-gray-500";

          const arrow =
            change > 0 ? "▲" : change < 0 ? "▼" : "—";

          return (
            <span
              key={`${product.id ?? name}-${index}`}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap px-5 text-xs text-gray-700 sm:px-7 sm:text-sm"
            >
              <span aria-hidden="true">
                {product.emoji ?? product.icon ?? "🛒"}
              </span>

              <span className="font-medium">{name}</span>

              <span>{bn(price)} টাকা</span>

              <span className={color}>
                {arrow} {bn(Math.abs(change))}%
              </span>
            </span>
          );
        })}
      </div>
    </section>
  );
};

export default Marquee;

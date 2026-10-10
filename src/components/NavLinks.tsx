
import Link from "next/link";

type NavCategory = {
  id: string | number;
  slug?: string;
  nameBn: string;
  icon?: string;
};

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/categories";

async function getCategories(): Promise<NavCategory[]> {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.error("Categories API error:", response.status);
      return [];
    }

    const json: unknown = await response.json();

    // API array bhi return kar sakti hai ya { data: [...] }
    let items: unknown[] = [];

    if (Array.isArray(json)) {
      items = json;
    } else if (
      typeof json === "object" &&
      json !== null &&
      "data" in json &&
      Array.isArray(json.data)
    ) {
      items = json.data;
    }

    return items.filter(
      (item): item is NavCategory =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        (typeof item.id === "string" ||
          typeof item.id === "number") &&
        "nameBn" in item &&
        typeof item.nameBn === "string"
    );
  } catch (error) {
    console.error("Failed to load categories:", error);
    return [];
  }
}

export default async function NavLinks() {
  const categories = await getCategories();

  return (
    <nav
      aria-label="Product categories"
      className="w-full px-3 py-3 sm:px-5 sm:py-4 lg:px-8"
    >
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-4">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/category/${category.id}`}
              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-green-500 hover:bg-green-50 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 sm:px-4 sm:text-base"
            >
              <span aria-hidden="true">
                {category.icon ?? "🛒"}
              </span>
              <span>{category.nameBn}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

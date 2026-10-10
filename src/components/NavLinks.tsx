
import Link from 'next/link';



interface NavCategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}




const API_URL =
  'https://api.abcz.workers.dev/api/bazardor/categories';



async function getCategories(): Promise<NavCategory[]> {
  try {
    const response = await fetch(API_URL, {
     
      
      next: { revalidate: 300 },
    });

    // API error check
    if (!response.ok) {
      console.error(
        'Categories API Error:',
        response.status,
        response.statusText
      );

      return [];
    }

    
    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      console.error('Invalid categories API response');
      return [];
    }

    return data.filter(
      (item): item is NavCategory =>
        typeof item?.id === 'string' &&
        typeof item?.slug === 'string' &&
        typeof item?.nameBn === 'string' &&
        typeof item?.icon === 'string'
    );
  } catch (error) {
    // Network ya JSON parsing error
    console.error('Failed to load categories:', error);

    return [];
  }
}



const NavLinks = async () => {
  const categories = await getCategories();

  if (categories.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Product categories"
      className="
        w-full
        px-3 py-3
        sm:px-5 sm:py-4
        lg:px-8
      "
    >
      {/* Responsive category container */}
      <ul
        className="
          mx-auto
          flex max-w-7xl
          flex-wrap
          items-center
          justify-center
          gap-2
          sm:gap-3
          lg:gap-4
        "
      >
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/category/${category.slug}`}
              className="
                inline-flex
                min-h-10
                items-center
                justify-center
                gap-1.5
                rounded-full
                border border-gray-200
                bg-white
                px-3 py-2
                text-sm font-medium
                text-gray-700
                shadow-sm
                transition-colors duration-200

                hover:border-green-500
                hover:bg-green-50
                hover:text-green-700

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-green-500
                focus-visible:ring-offset-2

                sm:px-4 sm:text-base
              "
            >
              <span aria-hidden="true">
                {category.icon}
              </span>

              <span>{category.nameBn}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;


import { connection } from "next/server";
import Image from "next/image";
import NavLinks from "./NavLinks";

const Header = async () => {
  // Wait for the incoming request before reading the current date.
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full border-b border-gray-200 bg-white px-3 py-3 sm:px-6 sm:py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-md object-contain"
          />

          <div className="min-w-0">
            <h2 className="font-bold text-gray-900">বাজার দর</h2>
            <p className="text-xs text-gray-600 sm:text-sm">
              {date}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="rounded-md border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
          >
            সাইন ইন
          </button>

          <button
            type="button"
            className="rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
          >
            সাইন আপ
          </button>
        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;

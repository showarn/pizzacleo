"use client";

import { PhoneIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-4 mt-auto mb-20 md:mb-0">
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 max-w-full mx-auto gap-4 sm:gap-0">
        {/* Text längst till vänster */}
        <div className="text-sm text-left">
          &copy; 2025 Cleopatra Pizzeria. Alla rättigheter förbehållna.
        </div>

        {/* Telefonnummer längst till höger */}
        <div className="text-sm flex gap-8">
          <p className="flex items-center gap-2">
            <PhoneIcon className="w-5 h-5 text-white" />
            <a href="tel:060100423" className="underline hover:text-red-600">
              060-10 04 23
            </a>
          </p>
          <p className="flex items-center gap-2">
            <DevicePhoneMobileIcon className="w-5 h-5 text-white" />
            <a href="tel:0728477519" className="underline hover:text-red-600">
              072 847 75 19
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

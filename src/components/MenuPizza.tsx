import React from "react";
import menuItems, { MenuItem } from "./data/menuData";

const MenuPizza: React.FC = () => {
  // Här skapar vi groups
  const groups: Record<string, MenuItem[]> = menuItems.reduce<Record<string, MenuItem[]>>(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    },
    {} as Record<string, MenuItem[]>
  );

  return (
    <div className="bg-[#171717] min-h-screen py-12 px-4 sm:px-6">
      <section id="meny" className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-[#f8f8f8] tracking-tight">
            Vår Pizza &amp; Meny
          </h2>
          {/* Gröna linjen - nu bred som menykorten */}
          <div className="w-full max-w-6xl h-1.5 bg-[#4ade80] mx-auto rounded mb-1"></div>
          {/* Vita linjen - bred som menykort */}
          <div className="w-full max-w-6xl h-1 bg-white mx-auto rounded mb-1"></div>
          {/* Röda linjen - bred som menykort */}
          <div className="w-full max-w-6xl h-1 bg-red-600 mx-auto rounded"></div>

          <p className="mt-4 text-[#d1d5db] max-w-2xl mx-auto text-lg">
            Handgjorda pizzor, kebab, sallader och grillrätter med färska ingredienser
          </p>
        </div>

        {/* Menysektioner */}
        <div className="space-y-10">
          {(Object.entries(groups) as [string, MenuItem[]][]).map(([groupName, groupItems]) => {
            const hasUniformPrice = groupItems.every(
              (item) => item.price === groupItems[0].price
            );
            const groupPrice = hasUniformPrice ? groupItems[0].price : null;

            // Gör om gruppnamnet till id-friendly format, ersätt & med "och"
            const id = groupName.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "och");

            return (
              <div
                id={`meny-${id}`}
                key={groupName}
                className="bg-[#262626] p-6 sm:p-8 rounded-xl shadow-lg border border-[#333333] hover:border-[#4ade80]/30 transition-colors duration-300"
              >
                {/* Grupprubrik */}
                <div className="flex items-center mb-6">
                  <h3 className="text-2xl font-bold font-serif text-[#f3f4f6] flex-grow">
                    {groupName}
                  </h3>
                  {hasUniformPrice && (
                    <span className="bg-[#333333] text-[#4ade80] px-3 py-1 rounded-full text-sm font-medium border border-[#4ade80]/30">
                      {groupPrice} kr
                    </span>
                  )}
                </div>

                {/* Rätter */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {groupItems.map(({ name, ingredients, price }, idx) => (
                    <div
                      key={idx}
                      className="bg-[#333333] hover:bg-[#3a3a3a] p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-[#404040] hover:border-[#4ade80]/30 group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold text-[#f9f9f9] font-serif group-hover:text-white transition-colors">
                            {name}
                          </h4>
                          <p className="text-[#d1d5db] text-sm mt-2 italic">
                            {ingredients}
                          </p>
                        </div>
                        {!hasUniformPrice && (
                          <span className="text-[#4ade80] font-medium whitespace-nowrap ml-3 group-hover:text-[#86efac] transition-colors">
                            {price} kr
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MenuPizza;

"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { priceSchema, PriceFormValues } from "@/lib/priceSchema";
import Toast from "@/components/Toast";
import { AlertCircle } from "lucide-react";

type MenuItem = {
  id: number;
  name: string;
  price: number;
};

export default function PriceEditor() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [originalPrices, setOriginalPrices] = useState<{ [id: number]: number }>({});

  const methods = useForm<PriceFormValues>({
    resolver: zodResolver(priceSchema),
    defaultValues: { prices: [] },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    register,
    watch,
    trigger,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  const watchedPrices = watch("prices");

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data: MenuItem[]) => {
        setMenuItems(data);
        const prices = data.map((item) => ({
          id: item.id,
          price: item.price.toString(),
        }));
        const priceMap: { [id: number]: number } = {};
        data.forEach((item) => (priceMap[item.id] = item.price));
        setOriginalPrices(priceMap);
        reset({ prices });
      })
      .catch(() => setToastMessage("Kunde inte hämta menyn"))
      .finally(() => setLoading(false));
  }, [reset]);

  const handleSave = async (id: number, newPrice: string, index: number) => {
    const parsedPrice = Number(newPrice);
    if (isNaN(parsedPrice)) return;

    setSavingId(id);
    try {
      const res = await fetch("/api/menu/update-prices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ id, price: parsedPrice }]),
      });

      if (!res.ok) throw new Error();
      setToastMessage("Pris uppdaterat!");

      setOriginalPrices((prev) => ({ ...prev, [id]: parsedPrice }));

      setValue(`prices.${index}.price`, parsedPrice.toString(), {
        shouldDirty: false,
      });
      trigger(`prices.${index}.price`);
    } catch {
      setToastMessage("Något gick fel vid sparandet");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-300">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-2" />
        Laddar priser...
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-4xl bg-gray-800 rounded-lg p-6 shadow-lg overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Ändra priser på menyalternativ</h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-600 p-2">Namn</th>
              <th className="border-b border-gray-600 p-2">Pris (kr)</th>
              <th className="border-b border-gray-600 p-2 w-32"></th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item, index) => {
              const error = errors?.prices?.[index]?.price;
              const currentPrice = watchedPrices?.[index]?.price || "";
              const original = originalPrices[item.id]?.toString() || "";
              const hasChanged = currentPrice !== original;

              return (
                <tr key={item.id} className="border-b border-gray-700">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">
                    <div className="relative w-24">
                      <input
                        type="text"
                        inputMode="decimal"
                        {...register(`prices.${index}.price`)}
                        defaultValue={item.price.toString()}
                        className={`w-full rounded bg-gray-700 text-white p-1 pr-6 transition ${
                          error ? "border border-red-500" : "border border-transparent"
                        }`}
                      />
                      <input type="hidden" value={item.id} {...register(`prices.${index}.id`)} />

                      {error && (
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 group z-50">
                          <AlertCircle className="w-5 h-5 text-red-500 cursor-pointer" />
                          <div className="absolute bottom-full mb-1 right-0 hidden group-hover:block bg-red-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                            {error.message}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-2 w-32">
                    <div className="h-10 flex items-center justify-start">
                      {hasChanged && (
                        <button
                          type="button"
                          onClick={() => handleSave(item.id, currentPrice, index)}
                          className={`px-4 py-2 rounded text-sm font-semibold transition ${
                            error || currentPrice.trim() === ""
                              ? "bg-gray-500 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                          disabled={
                            savingId === item.id ||
                            !!error ||
                            currentPrice.trim() === ""
                          }
                        >
                          {savingId === item.id ? "Sparar..." : "Spara"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </form>
    </FormProvider>
  );
}

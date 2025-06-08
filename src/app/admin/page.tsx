"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "@/components/Toast"; // importera din toast

type UserData = {
  id: number;
  email: string;
  role: string;
};

type MenuItem = {
  id: number;
  name: string;
  price: number;
};

const schema = z.object({
  prices: z.array(
    z.object({
      id: z.number(),
      price: z
        .string()
        .nonempty("Pris krävs")
        .refine(
          (val) => {
            const num = Number(val);
            return !isNaN(num) && num >= 0;
          },
          { message: "Pris måste vara ett icke-negativt tal" }
        ),
    })
  ),
});

type FormValues = z.infer<typeof schema>;

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [toggleSaving, setToggleSaving] = useState(false);
  const [priceSaving, setPriceSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { control, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { prices: [] },
  });
  const { errors, isValid } = formState;

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Hämta inloggad användare (admin)
  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (!res.ok) throw new Error("Ej inloggad");
        return res.json();
      })
      .then((data) => {
        if (data.role !== "admin") {
          router.push("/login");
        } else {
          setUser(data);
        }
      })
      .catch(() => {
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  // Hämta inställningar och meny
  useEffect(() => {
    if (!user) return;

    fetch("/api/settings/show-nutrition")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.showNutrition === "boolean") {
          setShowTooltip(data.showNutrition);
        }
      })
      .catch(() => setToastMessage("Kunde inte läsa inställningen från servern"));

    fetch("/api/menu")
      .then((res) => res.json())
      .then((data: MenuItem[]) => {
        setMenuItems(data);
        reset({
          prices: data.map((item) => ({
            id: item.id,
            price: item.price.toString(),
          })),
        });
      })
      .catch(() => setToastMessage("Kunde inte hämta menyn"));
  }, [user, reset]);

  const handleToggleChange = () => {
    const newValue = !showTooltip;
    setShowTooltip(newValue);
    setToggleSaving(true);

    fetch("/api/settings/show-nutrition", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ showNutrition: newValue }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Något gick fel");
        return res.json();
      })
      .then(() => setToggleSaving(false))
      .catch(() => {
        setToastMessage("Kunde inte spara inställningen");
        setShowTooltip(!newValue);
        setToggleSaving(false);
      });
  };

  const onSubmit = async (data: FormValues) => {
    setPriceSaving(true);

    try {
      const res = await fetch("/api/menu/update-prices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          data.prices.map((item) => ({ id: item.id, price: Number(item.price) }))
        ),
      });

      if (!res.ok) throw new Error("Kunde inte spara priser");

      setToastMessage("Priser sparade!");
    } catch {
      setToastMessage("Något gick fel vid sparandet");
    } finally {
      setPriceSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start text-white p-8">
        <h1 className="text-3xl font-bold mb-12">Admin Dashboard</h1>
        <p className="mb-8">Välkommen, {user?.email}!</p>

        {/* Toggle av/på */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg w-80 relative mb-12">
          <label
            htmlFor="tooltip-toggle"
            className="flex items-center cursor-pointer select-none"
          >
            <span className="mr-4 text-lg font-semibold">Tooltip av/på</span>

            <div className="relative group">
              <input
                type="checkbox"
                id="tooltip-toggle"
                className="sr-only"
                checked={showTooltip}
                disabled={toggleSaving}
                onChange={handleToggleChange}
              />
              <div
                className={`w-12 h-6 rounded-full transition-colors ${
                  showTooltip ? "bg-green-600" : "bg-gray-600"
                } ${toggleSaving ? "opacity-50 cursor-not-allowed" : ""}`}
              ></div>
              <div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform ${
                  showTooltip ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>

              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 text-sm rounded bg-gray-700 text-white py-2 px-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                När tooltip är på så visas extra info när du hovrar över näringsvärden som kalorier, protein etc.
              </div>
            </div>
          </label>
        </div>

        {/* Prisändring meny */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-4xl bg-gray-800 rounded-lg p-6 shadow-lg overflow-auto"
        >
          <h2 className="text-xl font-semibold mb-4">Ändra priser på menyalternativ</h2>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b border-gray-600 p-2">Namn</th>
                <th className="border-b border-gray-600 p-2">Pris (kr)</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item, index) => {
                const error = errors.prices?.[index]?.price;
                return (
                  <tr key={item.id} className="border-b border-gray-700">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">
                      <Controller
                        control={control}
                        name={`prices.${index}.price`}
                        defaultValue={item.price.toString()}
                        render={({ field }) => (
                          <input
                            type="number"
                            min={0}
                            step={1}
                            {...field}
                            className={`w-24 rounded bg-gray-700 text-white p-1 ${
                              error ? "border border-red-500" : ""
                            }`}
                          />
                        )}
                      />
                      <input
                        type="hidden"
                        value={item.id}
                        {...control.register(`prices.${index}.id`)}
                      />
                      {error && (
                        <p className="text-red-500 text-xs mt-1">
                          {error.message?.toString()}
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            type="submit"
            disabled={priceSaving || !isValid}
            className={`mt-6 px-6 py-2 rounded font-semibold ${
              priceSaving || !isValid
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {priceSaving ? "Sparar..." : "Spara priser"}
          </button>
        </form>
      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </>
  );
}

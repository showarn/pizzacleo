"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import PriceEditor from "@/components/admin/PriceEditor";

type UserData = {
  id: number;
  email: string;
  role: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [toggleSaving, setToggleSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPriceEditor, setShowPriceEditor] = useState(false);

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
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

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
  }, [user]);

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
        if (!res.ok) throw new Error();
      })
      .catch(() => {
        setToastMessage("Kunde inte spara inställningen");
        setShowTooltip(!newValue);
      })
      .finally(() => setToggleSaving(false));
  };

  if (loading) return <div className="text-center mt-20 text-white">Laddar adminpanel...</div>;

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <p className="mb-10 text-center">Välkommen, {user?.email}!</p>

        {/* INSTÄLLNINGAR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-start max-w-4xl mx-auto mb-12">
          {/* Tooltip-inställning */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg h-48 w-full flex flex-col justify-between">
            <label
              htmlFor="tooltip-toggle"
              className="flex justify-between items-center cursor-pointer"
            >
              <span className="text-lg font-semibold">Visa näringsinfo</span>
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
                  className={`w-14 h-7 rounded-full transition-colors duration-300 ${
                    showTooltip ? "bg-green-500" : "bg-gray-500"
                  } ${toggleSaving ? "opacity-50 cursor-not-allowed" : ""}`}
                ></div>
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                    showTooltip ? "translate-x-7" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </label>
            <p className="mt-4 text-sm text-gray-300">
              Styr om användare ser näringsinformation som kalorier, protein m.m.
            </p>
          </div>

          {/* Prisredigerare */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg h-48 w-full flex flex-col justify-between">
            <label
              htmlFor="price-editor-toggle"
              className="flex justify-between items-center cursor-pointer"
            >
              <span className="text-lg font-semibold">Prisredigering</span>
              <div className="relative group">
                <input
                  type="checkbox"
                  id="price-editor-toggle"
                  className="sr-only"
                  checked={showPriceEditor}
                  onChange={() => setShowPriceEditor((prev) => !prev)}
                />
                <div
                  className={`w-14 h-7 rounded-full transition-colors duration-300 ${
                    showPriceEditor ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></div>
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                    showPriceEditor ? "translate-x-7" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </label>
            <p className="mt-4 text-sm text-gray-300">
              Slå på för att visa och redigera aktuella priser i menyn.
            </p>
          </div>
        </div>

        {/* Prisredigerare */}
        {showPriceEditor && (
          <div className="max-w-4xl mx-auto">
            <PriceEditor />
          </div>
        )}
      </div>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </>
  );
}

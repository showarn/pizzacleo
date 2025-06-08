"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json.error || "Något gick fel med inloggningen");
        return;
      }

      alert("Inloggning lyckades!");
      router.push("/admin"); // Redirect till admin-sidan

    } catch (error) {
      alert("Något gick fel, försök igen senare.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-md shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Logga in</h1>

        <label className="block mb-2 font-semibold" htmlFor="email">
          E-post
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "E-post krävs" })}
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.email && (
          <p className="text-red-500 mt-1">{errors.email.message}</p>
        )}

        <label className="block mt-4 mb-2 font-semibold" htmlFor="password">
          Lösenord
        </label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Lösenord krävs" })}
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.password && (
          <p className="text-red-500 mt-1">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Loggar in..." : "Logga in"}
        </button>
      </form>
    </div>
  );
}

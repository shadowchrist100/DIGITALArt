import {
  Wrench,
  PlugZap,
  Hammer,
  Paintbrush,
  HardHat,
  KeyRound,
} from "lucide-react";

import { GiSewingNeedle, GiComb, GiScissors } from "react-icons/gi";

export default function CategoriesGrid() {
  const categories = [
    {
      name: "Plomberie",
      color: "from-blue-500 to-blue-600",
      icon: <Wrench className="w-10 h-10 text-white" />,
    },
    {
      name: "Électricité",
      color: "from-yellow-500 to-yellow-600",
      icon: <PlugZap className="w-10 h-10 text-white" />,
    },
    {
      name: "Menuiserie",
      color: "from-orange-500 to-orange-600",
      icon: <Hammer className="w-10 h-10 text-white" />,
    },
    {
      name: "Peinture",
      color: "from-pink-500 to-pink-600",
      icon: <Paintbrush className="w-10 h-10 text-white" />,
    },
    {
      name: "Maçonnerie",
      color: "from-red-500 to-red-600",
      icon: <HardHat className="w-10 h-10 text-white" />,
    },
    {
      name: "Couture",
      color: "from-purple-500 to-purple-600",
      icon: <GiSewingNeedle className="w-10 h-10 text-white" />,
    },
    {
      name: "Coiffure",
      color: "from-green-500 to-green-600",
      icon: (
        <div className="flex items-center gap-2">
          <GiScissors className="text-white w-7 h-7" />
          <GiComb className="text-white w-7 h-7" />
        </div>
      ),
    },
    {
      name: "Mécanique",
      color: "from-gray-500 to-gray-600",
      icon: <KeyRound className="w-10 h-10 text-white" />,
    },
  ];

  return (
    <section
      className="relative py-20"
      style={{
        background:
          "linear-gradient(135deg, var(--gray) 0%, var(--light) 50%, var(--gray) 100%)",
      }}
    >
      <div className="w-full max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold rounded-full"
            style={{
              backgroundColor: "rgba(74, 111, 165, 0.1)",
              color: "var(--primary)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--accent)" }}
            />
            Spécialités
          </div>

          <h2
            className="mb-6 text-4xl font-black leading-tight md:text-5xl"
            style={{ color: "var(--dark)" }}
          >
            Explorez nos catégories
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                background:
                  "linear-gradient(90deg, var(--primary), var(--primary-light))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              d&apos;artisanat
            </span>
          </h2>

          <p
            className="max-w-2xl mx-auto mb-10 text-lg md:text-xl"
            style={{ color: "var(--dark)", opacity: 0.7 }}
          >
            Tous les métiers de l&apos;artisanat à votre service avec des
            professionnels vérifiés
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 bg-white shadow-lg cursor-pointer rounded-xl hover:shadow-2xl hover:-translate-y-2 group"
                style={{ border: "1px solid var(--gray-dark)" }}
              >
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.icon}
                </div>
                <h3
                  className="text-lg font-bold text-center"
                  style={{ color: "var(--dark)" }}
                >
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

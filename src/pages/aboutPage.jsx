export default function AboutUsPage() {
  const team = [
    { name: "Layla Hassan", role: "Founder & CEO" },
    { name: "Sara Ahmed", role: "Head of Products" },
    { name: "Nour Ali", role: "Creative Director" },
  ];

  return (
    <div className="w-full min-h-full px-4 py-12 font-sans">

      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-pink-400 text-sm font-semibold tracking-widest uppercase mb-2">
          Our story
        </p>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
          We are a passionate team dedicated to bringing you the finest cosmetics
          made from clean, natural ingredients. Beauty without compromise.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-pink-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            To make premium beauty accessible for everyone. We believe every person
            deserves to feel confident and radiant every single day.
          </p>
        </div>
        <div className="bg-rose-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            A world where beauty is kind — to your skin, to the environment,
            and to every living being. Cruelty-free and sustainable, always.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-10 mb-16">
        {[
          { value: "5,000+", label: "Happy Customers" },
          { value: "120+", label: "Products" },
          { value: "4.9", label: "Avg. Rating" },
          { value: "3+", label: "Years in Business" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold text-pink-500 mb-1">{s.value}</p>
            <p className="text-gray-500 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="max-w-3xl mx-auto text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Meet the Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-pink-200 flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-pink-500">
                  {member.name.charAt(0)}
                </span>
              </div>
              <p className="font-semibold text-gray-800">{member.name}</p>
              <p className="text-gray-400 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
export default function AboutUsPage() {
  const team = [
    { name: "Layla Hassan", role: "Founder & CEO" },
    { name: "Sara Ahmed", role: "Head of Products" },
    { name: "Nour Ali", role: "Creative Director" },
  ];

  return (
    <div className="w-full min-h-screen px-4 py-12 bg-primary font-sans">

      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-accent text-sm uppercase">Our story</p>
        <h1 className="text-3xl font-bold text-secondary mb-4">About Us</h1>
        <p className="text-secondary/60 max-w-xl mx-auto">
          We bring premium cosmetics with clean ingredients. Beauty without compromise.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-xl font-bold text-secondary mb-3">Our Mission</h2>
          <p className="text-secondary/60 text-sm">
            Make beauty accessible and empowering for everyone.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-xl font-bold text-secondary mb-3">Our Vision</h2>
          <p className="text-secondary/60 text-sm">
            A world where beauty is kind and sustainable.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-10 mb-16">
        {[
          { value: "5,000+", label: "Customers" },
          { value: "120+", label: "Products" },
          { value: "4.9", label: "Rating" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold text-accent">{s.value}</p>
            <p className="text-secondary/60 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-secondary mb-8">Team</h2>

        <div className="flex flex-wrap justify-center gap-8">
          {team.map((m) => (
            <div key={m.name} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-accent">
                  {m.name[0]}
                </span>
              </div>
              <p className="text-secondary font-semibold">{m.name}</p>
              <p className="text-secondary/50 text-sm">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
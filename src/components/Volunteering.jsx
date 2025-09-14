import { Calendar, Award, Users } from "lucide-react";
import TiltCard from "./ui/TiltCard.jsx";
import Magnetic from "./ui/Magnetic.jsx";

const Volunteering = () => {
  const items = [
    {
      title: "Microsoft Beta Student Ambassador",
      organization: "Microsoft",
      period: "Oct'24 - Present",
      domain: "Science and Technology",
      highlights: [
        "Progressed from Alpha to Beta in the Microsoft Student Ambassador Program, showcasing increased technical expertise and active contributions to the student tech community.",
        "Conducted various seminars and workshops related to technology and profile building.",
        "Spread awareness about Microsoft technologies and evangelized them within the community and on campus."
      ],
      icon: Award,
    },
    {
      title: "Core Team Member",
      organization: "Atlassian Visakhapatnam Chapter",
      period: "Jun'24 - Present",
      domain: "Science and Technology",
      highlights: [],
      icon: Users,
    },
    {
      title: "Core Member",
      organization: "Vignan's IIT ACM Student Chapter",
      period: "Sep'23 - Aug'24",
      domain: "Science and Technology",
      highlights: [
        "Planned and executed technical events, coding contests, and speaker sessions under the ACM chapter.",
        "Mentored juniors on DSA fundamentals, Git/GitHub workflows, and collaborative project practices.",
        "Supported chapter operations including registrations, content design, and sponsorship/partner outreach.",
        "Prepared workshop materials and hands‑on labs to deliver practical learning experiences."
      ],
      icon: Users,
    },
  ];

  return (
    <section className="pt-16 pb-8 relative">
      <span aria-hidden className="section-blob blob-vol" />
      <div className="container mx-auto px-6">
  <div className="text-center mb-10 pt-2">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent section-heading">
            Volunteering
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Community contributions and leadership beyond the classroom
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {items.map((item, index) => {
            const Icon = item.icon || Users;
            return (
              <Magnetic key={index}>
                <TiltCard
                  className="volunteer-card glass rounded-xl p-5 hover:shadow-glow transition-all duration-500 animate-fadeInUp relative overflow-hidden group h-auto md:h-[260px] min-h-[220px] w-full flex flex-col"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Soft halos, ripple and sparkles */}
                  <span aria-hidden className="vol-halo" />
                  <span aria-hidden className="vol-halo-2" />
                  <span aria-hidden className="vol-ripple" />
                  <span aria-hidden className="vol-sparkles" />

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-[2]">
                    <div className="flex items-start">
                      <div className="p-3 bg-gradient-primary rounded-lg mr-4 flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                        <h4 className="text-lg font-semibold text-primary mb-1">{item.organization}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          {item.period}
                        </div>
                        <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                          {item.domain}
                        </div>
                      </div>
                    </div>

                    {/* Right side could hold actions or status in future */}
                  </div>

                  {item.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2 relative z-[2] md:max-h-[108px] overflow-hidden flex-1">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground line-clamp-1">{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </TiltCard>
              </Magnetic>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Volunteering;

import { GraduationCap, Calendar, MapPin } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Vignan's Institute of Information Technology",
      period: "Nov'22 - Apr'26",
      location: "Visakhapatnam, India",
      description: "Focused on Software Engineering, Data Structures, Algorithms, and Modern Web Technologies"
    },
    {
      degree: "Bachelor of Science in Programming and Data Science",
      institution: "Indian Institute of Technology, Madras",
      period: "June'23 - April'27",
      location: "Chennai, India",
      description: "Advanced coursework in Programming Methodologies, Data Science, and Machine Learning"
    },
    {
      degree: "AI Programming with Python Nanodegree",
      institution: "Udacity (Sponsored by AWS)",
      period: "Jun'24 - Oct'24",
      location: "Online",
      description: "Python, NumPy, Pandas, Neural Networks, and Deep Learning foundations"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Strong academic foundation in computer science and data science from premier institutions
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <div 
              key={index}
              className="glass rounded-xl p-8 hover:shadow-glow transition-all duration-500 animate-fadeInUp hover:scale-105"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start mb-4 lg:mb-0">
                  <div className="p-3 bg-gradient-primary rounded-lg mr-4 flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                    <h4 className="text-lg font-semibold text-primary mb-2">{edu.institution}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{edu.description}</p>
                  </div>
                </div>

                <div className="lg:text-right lg:ml-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-2 lg:justify-end">
                    <Calendar className="w-4 h-4 mr-2" />
                    {edu.period}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2 lg:justify-end">
                    <MapPin className="w-4 h-4 mr-2" />
                    {edu.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
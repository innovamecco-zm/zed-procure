import React, { useState, useEffect } from 'react';
import { ExternalLink, Briefcase, Building2, Factory, Loader2 } from 'lucide-react';

// Keep your partner logos as is
import client1 from '../assets/tiger.png';
import client2 from '../assets/pspf.jpeg';

const Projects = () => {
  const [dbProjects, setDbProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
        const response = await fetch(import.meta.env.VITE_NOTIFY_URL);
        const data = await response.json();
        // The script returns an error object instead of a list when it fails
        if (Array.isArray(data)) {
          setDbProjects(data);
        } else {
          console.error("Unexpected projects response:", data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'mining': return <Factory className="text-white w-5 h-5" />;
      case 'government': return <Building2 className="text-white w-5 h-5" />;
      default: return <Briefcase className="text-white w-5 h-5" />;
    }
  };

  // Hide the whole section when there is nothing to show
  if (!loading && dbProjects.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-procure-copper font-bold tracking-widest uppercase text-sm mb-3">Track Record</h2>
          <p className="text-4xl font-extrabold text-procure-navy">Selected Projects</p>
          <div className="w-20 h-1 bg-procure-copper mt-4 hidden md:block"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-procure-copper w-10 h-10" /></div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {dbProjects.map((project) => (
              <div key={project.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                
                {/* Image Section - Fixed Height */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                  {/* Missing or broken images fall back to the grey panel */}
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  )}
                  {/* Category Icon Overlay */}
                  <div className="absolute top-4 left-4 bg-procure-navy/90 p-2 rounded-lg backdrop-blur-sm shadow-lg">
                    {getIcon(project.category)}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <p className="text-[10px] font-black text-procure-copper uppercase tracking-[0.2em] mb-1">{project.client}</p>
                    <h3 className="text-xl font-bold text-procure-navy group-hover:text-procure-copper transition-colors">{project.title}</h3>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-auto">
                    <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full uppercase tracking-tight">
                      {project.impact}
                    </span>
                    <div className="bg-slate-50 p-2 rounded-full group-hover:bg-procure-copper group-hover:text-white transition-colors">
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Partners remain the same... */}
      </div>
    </section>
  );
};

export default Projects;
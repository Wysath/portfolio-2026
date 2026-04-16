import React, { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [slug]);

  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Project not found</h1>
          <button 
            onClick={() => navigate('/#work')} 
            className="mono text-white hover:underline"
          >
            Back to work
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0">
          {project.link ? (
            <img src={project.link} alt={project.title} className="w-full h-full object-cover opacity-25" />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a]" />
          )}
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-radial-gradient" style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(10, 10, 10, 0.4) 0%, rgba(10, 10, 10, 0.7) 50%, rgba(10, 10, 10, 0.95) 100%)'
        }} />

        <div className="relative z-10 text-center px-8 max-w-4xl">
          <div className="mono text-xs text-[#a0a0a0] mb-4 tracking-wider uppercase">
            {project.id} — {project.category}
          </div>
          <h1 className="text-[clamp(3rem,10vw,6rem)] font-black tracking-tighter leading-[0.9] mb-8">
            {project.title}
          </h1>
          <p className="text-xl text-[#a0a0a0] mb-8 max-w-2xl mx-auto">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {project.tags.map((tag) => (
              <span key={tag} className="mono text-xs border border-[#303030] px-4 py-2 text-[#a0a0a0]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="max-w-screen-2xl mx-auto px-12 lg:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-16">
            {/* Context */}
            {project.context && (
              <div>
                <h2 className="text-3xl font-black mb-6 tracking-tight">Contexte</h2>
                <p className="text-[#a0a0a0] text-lg leading-relaxed">
                  {project.context}
                </p>
              </div>
            )}

            {/* Missions */}
            {project.missions && project.missions.length > 0 && (
              <div>
                <h2 className="text-3xl font-black mb-6 tracking-tight">Missions & Réalisations</h2>
                <ul className="space-y-4">
                  {project.missions.map((mission, idx) => (
                    <li key={idx} className="flex gap-4 text-[#a0a0a0]">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 shrink-0" />
                      <span className="text-lg leading-relaxed">{mission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="space-y-12 sticky top-24">
              {/* Role */}
              {project.role && (
                <div>
                  <div className="mono text-xs text-[#707070] mb-4 tracking-wider uppercase">Rôle</div>
                  <p className="text-2xl text-white">{project.role}</p>
                </div>
              )}

              {/* Period */}
              {project.period && (
                <div>
                  <div className="mono text-xs text-[#707070] mb-4 tracking-wider uppercase">Période</div>
                  <p className="text-lg text-[#a0a0a0]">{project.period}</p>
                </div>
              )}

              {/* Year */}
              <div>
                <div className="mono text-xs text-[#707070] mb-4 tracking-wider uppercase">Année</div>
                <p className="text-2xl text-white">{project.year}</p>
              </div>

              {/* Skills */}
              {project.skills && project.skills.length > 0 && (
                <div>
                  <div className="mono text-xs text-[#707070] mb-4 tracking-wider uppercase">Compétences & Outils</div>
                  <ul className="space-y-2">
                    {project.skills.map((skill) => (
                      <li key={skill} className="text-[#a0a0a0]">{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-24">
        <div className="max-w-screen-2xl mx-auto px-12 lg:px-20">
          <h2 className="text-3xl font-black mb-12 tracking-tight">Galerie</h2>
          
          {/* Main Image */}
          {project.link && (
            <div className="mb-16">
              <div className="overflow-hidden rounded-lg border border-[#2a2a2a] hover:border-white transition-colors duration-300 bg-[#141414]">
                <img 
                  src={project.link} 
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}

          {/* Gallery Grid - Other Projects */}
          <div>
            <h3 className="text-xl font-black mb-8 text-[#a0a0a0] tracking-tight">Autres projets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.filter(p => p.slug !== project.slug && p.link).map((otherProject) => (
                <button
                  key={otherProject.id}
                  onClick={() => navigate(`/project/${otherProject.slug}`)}
                  className="group relative overflow-hidden rounded-lg border border-[#2a2a2a] hover:border-white transition-all duration-300 bg-[#141414] cursor-pointer"
                  data-cursor-hover
                >
                  <div className="aspect-video overflow-hidden">
                    {otherProject.link ? (
                      <img 
                        src={otherProject.link} 
                        alt={otherProject.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
                        <div className="mono text-[#a0a0a0] text-xs">IMAGE PLACEHOLDER</div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="mono text-xs text-[#a0a0a0] mb-2">{otherProject.id}</div>
                    <h4 className="font-black text-white group-hover:translate-x-1 transition-transform">{otherProject.title}</h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-screen-2xl mx-auto px-12 lg:px-20 py-12 border-t border-[#1a1a1a]">
        <button
          onClick={() => navigate('/#work')}
          className="mono text-sm text-[#a0a0a0] hover:text-white transition-colors tracking-wider"
        >
          ← Back to all projects
        </button>
      </div>
    </div>
  );
}

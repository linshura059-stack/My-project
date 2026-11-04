import React, { useEffect, useRef } from 'react';
import { ProjectItem } from '../types';
import { ProjectScreen } from './ProjectScreens';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = project !== null;

  // Escape to close, Tab kept inside the dialog, page scroll locked while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Move focus into the dialog on open and give it back to the trigger on close
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, [isOpen]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border bg-[#060c13] p-6 shadow-2xl"
        style={{
          borderColor: `rgba(${project.rgb}, 0.5)`,
          boxShadow: `0 0 50px rgba(${project.rgb}, 0.25), 0 20px 60px rgba(0,0,0,0.8)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="space-y-6">
          {/* Header info */}
          <div>
            <span
              className="text-xs font-mono font-bold tracking-widest uppercase"
              style={{ color: `rgb(${project.rgb})` }}
            >
              FEATURED APPLICATION
            </span>
            <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-white mt-1">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.stack.split('+').map((tech) => (
                <span
                  key={tech.trim()}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.72rem] font-medium border"
                  style={{
                    borderColor: `rgba(${project.rgb}, 0.35)`,
                    backgroundColor: `rgba(${project.rgb}, 0.1)`,
                    color: `rgb(${project.rgb})`,
                  }}
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Screen mockup preview */}
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-[#0e0f11]">
            <div className="h-8 bg-[#1a1e24] flex items-center px-3 gap-1.5 border-b border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-3 text-xs text-white/50 font-mono truncate">
                {project.url || 'Not deployed yet'}
              </span>
            </div>
            <div className="max-h-[380px] overflow-y-auto">
              <ProjectScreen type={project.screen} />
            </div>
          </div>

          {/* Description & Technical Summary */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Project Overview</h3>
            <p className="text-sm text-[#cbd6df] leading-relaxed">{project.description}</p>
            {project.highlights && project.highlights.length > 0 && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-[#b0c0cc] space-y-2">
                <p className="font-semibold text-white">Highlights:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#15985a] to-[#20bd70] text-white font-bold text-sm shadow-[0_0_18px_rgba(31,157,85,0.4)] flex items-center gap-2 hover:-translate-y-0.5 transition-all"
              >
                <span>Launch Live Demo ↗</span>
              </a>
            ) : (
              <span className="px-4 py-2.5 rounded-lg bg-white/5 text-white/50 text-xs border border-white/10">
                Live URL: Staging deployment in progress
              </span>
            )}

            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg border text-white text-sm font-medium hover:bg-white/10 transition-colors"
                style={{ borderColor: `rgb(${project.rgb})` }}
              >
                View Repository ↗
              </a>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-white/20 text-white/80 hover:bg-white/5 text-sm transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

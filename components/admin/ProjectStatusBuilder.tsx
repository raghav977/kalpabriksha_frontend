'use client';

import { Plus, Trash2 } from 'lucide-react';
import type { ProjectStatusPhase, ProjectStatusItem } from '@/types/project';
import { calculateOverallPhaseProgress, calculatePhaseProgress } from '@/utils/helper';
import { useMemo } from 'react';

const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 11);
};

export const createBlankStatusItem = (): ProjectStatusItem => ({
  id: generateId(),
  label: '',
  status: 0,
  statusText: '',
});

export const createBlankStatusPhase = (): ProjectStatusPhase => ({
  id: generateId(),
  title: '',
  items: [createBlankStatusItem()],
});

interface ProjectStatusBuilderProps {
  label?: string;
  description?: string;
  value: ProjectStatusPhase[];
  onChange: (value: ProjectStatusPhase[]) => void;
}

const clampInput = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

export function ProjectStatusBuilder({
  label = 'Project Study Phases',
  description = 'Add topics and their sub-topics with completion percentage. Progress is calculated automatically.',
  value,
  onChange,
}: ProjectStatusBuilderProps) {
  const overallProgress = useMemo(() => calculateOverallPhaseProgress(value), [value]);

  const updatePhase = (index: number, updater: (phase: ProjectStatusPhase) => ProjectStatusPhase) => {
    onChange(value.map((phase, phaseIndex) => (phaseIndex === index ? updater(phase) : phase)));
  };

  const handlePhaseTitleChange = (index: number, title: string) => {
    updatePhase(index, (phase) => ({ ...phase, title }));
  };

  const handleAddPhase = () => {
    onChange([...value, createBlankStatusPhase()]);
  };

  const handleRemovePhase = (index: number) => {
    const next = value.filter((_, phaseIndex) => phaseIndex !== index);
    onChange(next.length ? next : [createBlankStatusPhase()]);
  };

  const handleAddItem = (phaseIndex: number) => {
    updatePhase(phaseIndex, (phase) => ({
      ...phase,
      items: [...(phase.items || []), createBlankStatusItem()],
    }));
  };

  const handleRemoveItem = (phaseIndex: number, itemIndex: number) => {
    updatePhase(phaseIndex, (phase) => {
      const nextItems = (phase.items || []).filter((_, idx) => idx !== itemIndex);
      return {
        ...phase,
        items: nextItems.length ? nextItems : [createBlankStatusItem()],
      };
    });
  };

  const handleItemChange = (phaseIndex: number, itemIndex: number, payload: Partial<ProjectStatusItem>) => {
    updatePhase(phaseIndex, (phase) => ({
      ...phase,
      items: (phase.items || []).map((item, idx) =>
        idx === itemIndex ? { ...item, ...payload } : item
      ),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700">{label}</label>
          {description && <p className="text-sm text-neutral-500 max-w-2xl">{description}</p>}
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Overall Progress</p>
          <p className="text-2xl font-semibold text-neutral-900">{overallProgress}%</p>
          <div className="w-40 h-2 bg-neutral-100 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-neutral-900"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {value.map((phase, phaseIndex) => {
          const phaseProgress = calculatePhaseProgress(phase.items);
          return (
            <div key={phase.id || phaseIndex} className="border border-neutral-200 rounded-2xl p-4 space-y-4 bg-white">
              <div className="flex flex-wrap items-start gap-4 justify-between">
                <div className="flex-1 min-w-55">
                  <label className="text-xs uppercase text-neutral-500 font-semibold">Topic / Phase</label>
                  <input
                    type="text"
                    value={phase.title}
                    onChange={(e) => handlePhaseTitleChange(phaseIndex, e.target.value)}
                    placeholder="e.g., Project Study Phase"
                    className="w-full mt-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase text-neutral-500 tracking-wide">Progress</p>
                  <p className="text-xl font-semibold text-neutral-900">{phaseProgress}%</p>
                  <div className="w-32 h-2 bg-neutral-100 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-yellow-400" style={{ width: `${phaseProgress}%` }} />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemovePhase(phaseIndex)}
                  className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove phase"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {(phase.items || []).map((item, itemIndex) => (
                  <div
                    key={item.id || itemIndex}
                    className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_110px_40px] gap-3 items-start"
                  >
                    <div>
                      <label className="text-xs uppercase text-neutral-500 font-semibold">Particular</label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => handleItemChange(phaseIndex, itemIndex, { label: e.target.value })}
                        placeholder="e.g., Feasibility Study"
                        className="w-full mt-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase text-neutral-500 font-semibold">Status Text</label>
                      <textarea
                        value={item.statusText || ''}
                        onChange={(e) =>
                          handleItemChange(phaseIndex, itemIndex, { statusText: e.target.value })
                        }
                        placeholder="e.g., Applied / Obtained"
                        className="w-full mt-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 min-h-11"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase text-neutral-500 font-semibold">Status %</label>
                      <div className="relative mt-1">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={item.status ?? 0}
                          onChange={(e) =>
                            handleItemChange(phaseIndex, itemIndex, {
                              status: clampInput(Number(e.target.value)),
                            })
                          }
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 pr-10"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">%</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(phaseIndex, itemIndex)}
                      className="self-end mb-1 p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove sub topic"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleAddItem(phaseIndex)}
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
              >
                <Plus className="w-4 h-4" /> Add Sub Topic
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleAddPhase}
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
      >
        <Plus className="w-4 h-4" /> Add New Topic / Phase
      </button>
    </div>
  );
}

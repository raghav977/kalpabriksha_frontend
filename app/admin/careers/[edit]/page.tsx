

"use client"

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  PageHeader,
  FormCard,
  Input,
  Textarea,
  Select,
  Checkbox,
  ListInput,
  FormActions,
  LoadingSpinner,
  ErrorState,
} from "@/components/admin";

import { usePositions } from "@/hooks/api/usePositions";
import { useCareer, useUpdateCareer } from "@/hooks/api/useCareers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { careerPositionsApi, careersApi } from "@/lib/api";

// ✅ Interfaces
interface CareerVacancy {
  id?: number;
  positionId: number;
  location?: string;
  employmentType?: string;
  isRemote?: boolean;
  isActive?: boolean;
  salaryRange?: string;
  closingDate?: string;
  description?: string;
  responsibilities: string[];
  requirements: string[];
}

interface PositionOption {
  id: number;
  title: string;
}

export default function EditCareerVacancy({ params }: { params: Promise<{ edit: string }> }) {
  const { edit: id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: career, isLoading, error } = useCareer(parseInt(id));
  const { data: cop = [] } = usePositions();
  const careerOptions = cop.map(item => ({ value: item?.id.toString(), label: item.title }));

  const [form, setForm] = useState<CareerVacancy>({
    positionId: 0,
    location: "",
    employmentType: "full-time",
    isRemote: false,
    isActive: true,
    salaryRange: "",
    closingDate: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
  });

  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    if (career) {
      // Format date from ISO string to YYYY-MM-DD for input
      const closingDate = (career as any).closingDate
        ? new Date((career as any).closingDate).toISOString().split('T')[0]
        : "";

      setForm({
        id: career.id,
        positionId: (career as any).positionId || 0,
        location: (career as any).location || "",
        employmentType: (career as any).employmentType || "full-time",
        isRemote: (career as any).isRemote || false,
        isActive: (career as any).isActive !== false,
        salaryRange: (career as any).salaryRange || "",
        closingDate: closingDate,
        description: (career as any).description || "",
        responsibilities: (career as any).responsibilities?.length ? (career as any).responsibilities : [""],
        requirements: (career as any).requirements?.length ? (career as any).requirements : [""],
      });
    }
  }, [career]);

  // ✅ Create new position
  const createPositionMutation = useMutation({
    mutationFn: (data: string) => careerPositionsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  const addCategory = () => {
    if (!newCategory.trim()) return;
    createPositionMutation.mutate(newCategory);
    setNewCategory("");
  };

  // ✅ List handlers
  function handleResponsibilityChange(index: number, value: string) {
    setForm((prev) => {
      const arr = [...prev.responsibilities];
      arr[index] = value;
      return { ...prev, responsibilities: arr };
    });
  }

  function addResponsibility() {
    setForm((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ""],
    }));
  }

  function removeResponsibility(i: number) {
    setForm((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, idx) => idx !== i),
    }));
  }

  function handleRequirementChange(index: number, value: string) {
    setForm((prev) => {
      const arr = [...prev.requirements];
      arr[index] = value;
      return { ...prev, requirements: arr };
    });
  }

  function addRequirement() {
    setForm((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  }

  function removeRequirement(i: number) {
    setForm((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, idx) => idx !== i),
    }));
  }

  // ✅ Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: any) => careersApi.update(parseInt(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["careers"] });
      queryClient.invalidateQueries({ queryKey: ["careers", id] });
      router.push("/admin/careers");
    },
  });

  // ✅ Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter empty items
    const responsibilities = form.responsibilities.filter(r => r.trim() !== "");
    const requirements = form.requirements.filter(r => r.trim() !== "");

    const payload = {
      positionId: form.positionId,
      requirements,
      responsibilities,
      salaryRange: form.salaryRange || undefined,
      closingDate: form.closingDate || undefined,
      isRemote: !!form.isRemote,
      isActive: form.isActive !== false,
      description: form.description || "",
      employmentType: form.employmentType || "full-time",
      location: form.location || "",
    };

    console.log("Final Payload (update):", payload);
    updateMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Edit Career Vacancy" backButton />
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !career) {
    return (
      <div>
        <PageHeader title="Edit Career Vacancy" backButton />
        <ErrorState message="Failed to load career vacancy" onRetry={() => router.push("/admin/careers")} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Edit Career Vacancy" backButton />

      <FormCard error={updateMutation.isError ? "Failed to update career vacancy. Please try again." : undefined}>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Position */}
            <div>
              <Select
                label="Career Position"
                value={form.positionId.toString()}
                onChange={(e) =>
                  setForm((p) => ({ ...p, positionId: parseInt(e.target.value) }))
                }
                options={careerOptions}
                required
              />

              {/* Add Position */}
              <div className="flex gap-2 mt-2">
                <Input
                  label="Add Position"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g. Civil Engineer"
                />
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={addCategory}
                    className="h-10 px-4 bg-neutral-900 text-white rounded-lg ml-2 hover:bg-neutral-800"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Location + Type */}
            <div>
              <Input
                label="Location"
                value={form.location}
                onChange={(e) =>
                  setForm((p) => ({ ...p, location: e.target.value }))
                }
              />

              <Select
                label="Employment Type"
                value={form.employmentType}
                onChange={(e) =>
                  setForm((p) => ({ ...p, employmentType: e.target.value }))
                }
                options={[
                  { value: "full-time", label: "Full-time" },
                  { value: "part-time", label: "Part-time" },
                  { value: "contract", label: "Contract" },
                  { value: "internship", label: "Internship" },
                  { value: "research", label: "Research" }
                ]}
              />
            </div>
          </div>

          {/* Salary + Date + Flags */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Salary Range"
              value={form.salaryRange}
              onChange={(e) =>
                setForm((p) => ({ ...p, salaryRange: e.target.value }))
              }
            />

            <Input
              label="Closing Date"
              type="date"
              value={form.closingDate}
              onChange={(e) =>
                setForm((p) => ({ ...p, closingDate: e.target.value }))
              }
            />

            <div className="flex items-end gap-4">
              <Checkbox
                id="isRemote"
                label="Remote"
                checked={form.isRemote}
                onChange={(e) =>
                  setForm((p) => ({ ...p, isRemote: e.target.checked }))
                }
              />
              <Checkbox
                id="isActive"
                label="Active"
                checked={form.isActive}
                onChange={(e) =>
                  setForm((p) => ({ ...p, isActive: e.target.checked }))
                }
              />
            </div>
          </div>

          {/* Description */}
          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
            rows={4}
            placeholder="Job description..."
          />

          {/* Responsibilities */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
            <div className="space-y-2">
              {form.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    label={`Responsibility ${idx + 1}`}
                    value={resp}
                    onChange={(e) => handleResponsibilityChange(idx, e.target.value)}
                    placeholder="Enter responsibility"
                  />
                  <button
                    type="button"
                    onClick={() => removeResponsibility(idx)}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 h-10 mt-6"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addResponsibility}
              className="mt-3 px-4 py-2 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300"
            >
              + Add Responsibility
            </button>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Requirements</h3>
            <div className="space-y-2">
              {form.requirements.map((req, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    label={`Requirement ${idx + 1}`}
                    value={req}
                    onChange={(e) => handleRequirementChange(idx, e.target.value)}
                    placeholder="Enter requirement"
                  />
                  <button
                    type="button"
                    onClick={() => removeRequirement(idx)}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 h-10 mt-6"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addRequirement}
              className="mt-3 px-4 py-2 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300"
            >
              + Add Requirement
            </button>
          </div>

          <FormActions
            submitLabel="Update Career Vacancy"
            isSubmitting={updateMutation.isPending}
            onCancel={() => router.back()}
          />
        </form>
      </FormCard>
    </div>
  );
}
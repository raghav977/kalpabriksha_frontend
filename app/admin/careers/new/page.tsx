"use client"

import { useEffect, useState } from "react";
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
} from "@/components/admin";

import { usePositions } from "@/hooks/api/usePositions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { careerPositionsApi, careersApi } from "@/lib/api";

// ✅ Interfaces
interface CareerVacancy {
  id?: number;
  title: string;
  category: string; // stores positionId as string
  location?: string;
  type?: string;
  isRemote?: boolean;
  isActive?: boolean;
  salary?: string;
  closingDate?: string;
  description?: string;
  responsibilities: string[];
  requirements: string[];
}

interface PositionOption {
  id: number;
  title: string;
}

export default function CreateCareerVacancy() {
  const router = useRouter();
  const queryClient = useQueryClient();


  const { data: cop = [], isLoading } = usePositions(); // TS now infers PositionOption[]
const careerOptions = cop.map(item => ({ value: item?.id.toString(), label: item.title }));

  const [form, setForm] = useState<CareerVacancy>({
    title: "",
    category: "",
    location: "",
    type: "full-time",
    isRemote: false,
    isActive: true,
    salary: "",
    closingDate: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
  });

  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (careerOptions.length > 0 && !form.category) {
      setForm((prev) => ({
        ...prev,
        category: careerOptions[0].value,
      }));
    }
  }, [cop]);

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

  // ✅ Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Map to backend-expected shape
    const payload = {
      positionId: Number(form.category), // category stores positionId string
      requirements: form.requirements || [],
      responsibilities: form.responsibilities || [],
      salaryRange: form.salary || "",
      closingDate: form.closingDate || undefined,
      isRemote: !!form.isRemote,
      isActive: form.isActive !== false,
      description: form.description || "",
      employmentType: form.type || "full-time",
      location: form.location || "",
    };

    console.log("Final Payload (mapped to backend shape):", payload);
    try{

        const res = await careersApi.create(payload);
        console.log("Career vacancy created successfully:", res);
        router.push('/admin/careers');
    }
    catch(err:any){
        console.error("Error creating career vacancy:", err);
        alert("Failed to create career vacancy. Please try again.");
        setIsSubmitting(false);

    }

  };

  return (
    <div>
      <PageHeader title="New Career Vacancy" backButton />

      <FormCard>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Position */}
            <div>
              <Select
                label="Career Position"
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
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
                value={form.type}
                onChange={(e) =>
                  setForm((p) => ({ ...p, type: e.target.value }))
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
              value={form.salary}
              onChange={(e) =>
                setForm((p) => ({ ...p, salary: e.target.value }))
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

            <div className="flex items-center gap-6">
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
            rows={5}
          />

          {/* Responsibilities */}
          <ListInput
            label="Responsibilities"
            items={form.responsibilities}
            onAdd={addResponsibility}
            onRemove={removeResponsibility}
            onChange={handleResponsibilityChange}
          />

          {/* Requirements */}
          <ListInput
            label="Requirements"
            items={form.requirements}
            onAdd={addRequirement}
            onRemove={removeRequirement}
            onChange={handleRequirementChange}
          />

          {/* Actions */}
          <FormActions
            submitLabel="Create Vacancy"
            isSubmitting={isSubmitting}
            onCancel={() => router.back()}
          />
        </form>
      </FormCard>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PageHeader,
  FormCard,
  Input,
  Textarea,
  Checkbox,
  FormActions,
  ImageUpload,
} from "@/components/admin";
import { Testimonial } from "@/lib/api";
import { useCreateTestimonial } from '@/hooks/api/useTestimonial';

export default function NewTestimonialPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<Testimonial>({
    name: "",
    quote: "",
    isActive: false,
    image: "",
    company: "",
    id: 0,
  });

  const createMutation = useCreateTestimonial();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => {
        router.push('/admin/testimonial');
      },
    });
  };

  return (
    <div>
      <PageHeader title="New Testimonial" backButton />

      <FormCard>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            label="Quote"
            value={formData.quote}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, quote: e.target.value }))
            }
            rows={3}
            required
          />

          <Input
            label="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />

          <Input
            label="Company / Title"
            value={formData.company || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, company: e.target.value }))
            }
          />

          <ImageUpload
            label="Photo"
            value={formData.image || ""}
            onChange={(url) =>
              setFormData((prev) => ({ ...prev, image: url }))
            }
            aspectRatio="square"
          />

          <div className="flex items-center gap-6">
            <Checkbox
              id="isActive"
              label="Active"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: e.target.checked,
                }))
              }
            />
          </div>

          <FormActions
            submitLabel="Create Testimonial"
            isSubmitting={createMutation.isPending}
            onCancel={() => router.back()}
          />
        </form>
      </FormCard>
    </div>
  );
}
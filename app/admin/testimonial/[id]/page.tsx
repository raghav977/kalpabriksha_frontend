"use client"
import { Checkbox, ErrorState, FormActions, FormCard, ImageUpload, Input, LoadingSpinner, PageHeader } from "@/components/admin";
import { useTestimonial } from "@/hooks/api/useTestimonial";
import { testimonialApi } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import test from "node:test";


import { use, useEffect, useState } from "react";

export default function EditTestimonialPage({params}:{params:Promise<{id:string}>}){
    const {id} = use(params);

    const router = useRouter();

    const queryClient = useQueryClient();

    const {data:testimonial, isLoading, error} = useTestimonial(parseInt(id));


    const [formData,setFormData] = useState({
        name:'',
        quote:"",
        company:"",
        image:"",
        isActive:true
    })


    useEffect(()=>{
        if(testimonial){
            setFormData({
                name:testimonial.name || '',
                quote:testimonial.quote || '',
                company:testimonial.company || '',
                image:testimonial.image || '',
                isActive:testimonial.isActive || true
            })
        }
    },[testimonial])

    const updateMutation = useMutation({
        mutationFn:(data:typeof formData)=>testimonialApi.update(parseInt(id), data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['testimonial']})
            router.push('/admin/testimonial')
        }
    })


    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();

        updateMutation.mutate(formData);
    }

    if(isLoading){
        return(
            <div>
                <PageHeader title="Edit Testimonial" backButton />
                <LoadingSpinner/>
            </div>
        )
    }

    if(error||!testimonial){
        return(
            <div>
                <PageHeader title="Edit Testimonial" backButton />
                <ErrorState message="Failed to load testimonial. Please try again." onRetry={()=>router.push('admin/testimonial')} />
            </div>
        )
    }

    return(
        <div>
            <PageHeader title='Edit Testimonial' backButton/>

            <FormCard error={error? "Failed to load testimonial. Please try again.":undefined}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input label="Name" value={formData.name} onChange={(e)=>setFormData(prev=>({...prev,name:e.target.value}))} required />
                        <Input label="Quote" value={formData.quote} onChange={(e)=>setFormData(prev=>({...prev,quote:e.target.value}))} required />
                        <Input label="Company" value={formData.company} onChange={(e)=>setFormData(prev=>({...prev,company:e.target.value}))} required />
                        <ImageUpload label="Image URL" value={formData.image} onChange={(url)=>setFormData(prev=>({...prev,image:url}))}/>
                        <Checkbox id='isActive' label="Active" checked={formData.isActive} onChange={(e)=>setFormData(prev=>({...prev,isActive:e.target.checked}))}/>
                        {/* Add more fields as necessary */}
                        <FormActions submitLabel="Update Testimonial" isSubmitting={updateMutation.isPending} onCancel={()=>router.back()} />
                    </form>

            </FormCard>
        </div>
    )


}
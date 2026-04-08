import { careerPositionsApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


export const positionKeys = {
    all: ['positions'] as const,
    lists: ()=>[...positionKeys.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...positionKeys.lists(), filters] as const,
    details: () => [...positionKeys.all, 'detail'] as const,
    detail: (id: number) => [...positionKeys.details(), id] as const,
}




// hook to fetch all positions 

export function usePositions(params?:{
    search?:string;
}){
    return useQuery({
        queryKey:positionKeys.list(params || {}),
        queryFn:()=>careerPositionsApi.getAll(params as any),
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,

    })
}



export function useActivePositions(params?:{
    search?:string;
}){
    return useQuery({
        queryKey:positionKeys.list({active:true}),
        queryFn:()=>careerPositionsApi.getAll({active:true, ...params} as any),
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,

    })
}



export function usePosition(id:number){
    return useQuery({
        queryKey:positionKeys.detail(id),
        queryFn:()=>careerPositionsApi.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    })
}





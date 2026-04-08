export interface ProjectStatusItem {
	id?: string;
	label: string;
	status: number;
	statusText?: string;
}

export interface ProjectStatusPhase {
	id?: string;
	title: string;
	items: ProjectStatusItem[];
}

export type ProjectStatusMatrix = ProjectStatusPhase[];

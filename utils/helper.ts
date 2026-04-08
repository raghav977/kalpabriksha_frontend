import type { ProjectStatusPhase } from '@/types/project';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, '') || '';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || '';

function getDefaultBaseUrl(): string {
	if (IMAGE_BASE_URL) {
		return IMAGE_BASE_URL;
	}

	if (API_BASE_URL) {
		return API_BASE_URL.endsWith('/api')
			? API_BASE_URL.replace(/\/api$/, '')
			: API_BASE_URL;
	}

	return '';
}

export function getMediaUrl(path?: string | null, fallback = ''): string {
	if (!path) {
		return fallback;
	}

	if (path.startsWith('http')) {
		return path;
	}

	const baseUrl = getDefaultBaseUrl();

	if (!baseUrl) {
		return path;
	}

	const needsSlash = path.startsWith('/') ? '' : '/';
	return `${baseUrl}${needsSlash}${path}`;
}

export function getFileNameFromPath(path?: string | null): string {
	if (!path) return '';
	return path.split('/').pop() || '';
}

const clampPercentage = (value: number) => {
	if (Number.isNaN(value)) return 0;
	return Math.min(100, Math.max(0, Math.round(value)));
};

const coerceStatus = (value?: number) => clampPercentage(typeof value === 'number' ? value : Number(value ?? 0));

export function calculatePhaseProgress(items: Array<{ status?: number }> = []): number {
	if (!items.length) return 0;
	const total = items.reduce((sum, item) => sum + coerceStatus(item.status), 0);
	return clampPercentage(total / items.length);
}

export function calculateOverallPhaseProgress(phases: ProjectStatusPhase[] = []): number {
	if (!phases.length) return 0;
	const totals = phases.map((phase) => calculatePhaseProgress(phase.items));
	const sum = totals.reduce((acc, value) => acc + value, 0);
	return clampPercentage(sum / phases.length);
}

export function normalizeStatusPhases(raw?: unknown): ProjectStatusPhase[] {
	if (!raw) return [];
	if (Array.isArray(raw)) return raw as ProjectStatusPhase[];
	if (typeof raw === 'string') {
		try {
			const parsed = JSON.parse(raw);
			return Array.isArray(parsed) ? (parsed as ProjectStatusPhase[]) : [];
		} catch (error) {
			console.error('Failed to parse status phases', error);
			return [];
		}
	}
	return [];
}

export function sanitizeStatusPhases(phases: ProjectStatusPhase[] = []): ProjectStatusPhase[] {
	return phases
		.map((phase) => ({
			...phase,
			title: phase.title?.trim() || '',
			items: (phase.items || [])
				.map((item) => ({
					...item,
					label: item.label?.trim() || '',
					statusText: item.statusText?.trim() || '',
					status: coerceStatus(item.status),
				}))
				.filter((item) => item.label),
		}))
		.filter((phase) => phase.title || phase.items.length);
}

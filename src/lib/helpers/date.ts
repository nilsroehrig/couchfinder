export function dateToISODate(date: Date): string {
	return date.toISOString().split('T')[0];
}

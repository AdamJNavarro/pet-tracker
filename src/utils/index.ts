type PluralizeArgs = {
	count: number;
	single: string;
	plural?: string;
};

export function pluralize({ count, single, plural }: PluralizeArgs): string {
	return `${count} ${count !== 1 ? plural || single + 's' : single}`;
}

type GetTimesBreakdownArgs = {
	completed_at: string;
	desired_frequency: number | null;
};

export function get_times_breakdown({
	completed_at,
	desired_frequency
}: GetTimesBreakdownArgs): string {
	let ago_str = '';
	const current_date_time = new Date().getTime();
	const last_date = new Date(completed_at);
	const last_date_time = last_date.getTime();
	const time_since_completed = Math.abs(current_date_time - last_date_time);
	const mins_ago = Math.floor(time_since_completed / (1000 * 60));
	const hours_ago = Math.floor(time_since_completed / (1000 * 60 * 60));
	const days_ago = Math.floor(time_since_completed / (1000 * 60 * 60 * 24));

	if (mins_ago < 1) {
		ago_str = 'Just Now';
	} else if (hours_ago < 1) {
		ago_str = `${pluralize({ count: mins_ago, single: 'min' })} ago`;
	} else if (days_ago < 3) {
		ago_str = `${pluralize({ count: hours_ago, single: 'hour' })} ago`;
	} else if (days_ago < 30) {
		const weeks_ago = Math.floor(days_ago / 7);
		ago_str = `${pluralize({ count: weeks_ago, single: 'week' })} ago`;
	} else {
		ago_str = 'Too Long ago';
	}

	if (desired_frequency) {
		const target_date_time = last_date_time + desired_frequency;
		const time_til_target = Math.abs(target_date_time - current_date_time);
		// console.log('time_til_target', time_til_target);
	}

	return ago_str;
}

export type AgoFormat = 'hrs-ago' | 'days-ago';

type FormatDateArgs = {
	date: string;
	format: AgoFormat;
};

export function formatDate({ date, format }: FormatDateArgs): string {
	try {
		// date = date.replace(/\s+/g, 'T') + 'Z';

		const current_date_time = new Date().getTime();
		const target_date = new Date(date);
		const target_date_time = target_date.getTime();
		const time_diff = Math.abs(current_date_time - target_date_time);
		const mins_ago = Math.floor(time_diff / (1000 * 60));
		const hours_ago = Math.floor(time_diff / (1000 * 60 * 60));
		const days_ago = Math.floor(time_diff / (1000 * 60 * 60 * 24));

		if (format === 'hrs-ago') {
			if (mins_ago < 1) return 'Now';
			if (hours_ago < 1) {
				return `${pluralize({ count: mins_ago, single: 'min' })} ago`;
			}
			return `${pluralize({ count: hours_ago, single: 'hour' })} ago`;
		}

		let ago_str;

		if (days_ago < 1) {
			ago_str = 'Today';
		} else if (days_ago < 7) {
			ago_str = `${pluralize({ count: days_ago, single: 'day' })} ago`;
		} else if (days_ago < 30) {
			const weeks_ago = Math.floor(days_ago / 7);
			ago_str = `${pluralize({ count: weeks_ago, single: 'week' })} ago`;
		} else if (days_ago < 365) {
			const months_ago = Math.floor(days_ago / 30);
			ago_str = `${pluralize({ count: months_ago, single: 'month' })} ago`;
		} else {
			const years_ago = Math.floor(days_ago / 365);
			ago_str = `${pluralize({ count: years_ago, single: 'year' })} ago`;
		}

		return `${ago_str}`;
	} catch (error) {
		throw new Error('Format Date Error');
	}
}

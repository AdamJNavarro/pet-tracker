type PluralizeArgs = {
	count: number;
	single: string;
	plural?: string;
};

export function pluralize({ count, single, plural }: PluralizeArgs): string {
	return `${count} ${count !== 1 ? plural || single + 's' : single}`;
}

type GetLogBreakdownArgs = {
	time_stamp: string;
	desired_frequency: number | null;
};

export type LogBreakdown = {
	ago_str: string;
	needs_completing?: boolean;
};

export function get_log_breakdown({
	time_stamp,
	desired_frequency
}: GetLogBreakdownArgs): LogBreakdown {
	let ago_str = '';
	const current_date_time = new Date().getTime();
	const completed_date_time = new Date(time_stamp).getTime();
	const time_since_completed = Math.abs(current_date_time - completed_date_time);
	const mins_ago = Math.floor(time_since_completed / (1000 * 60));
	const hours_ago = Math.floor(time_since_completed / (1000 * 60 * 60));
	const days_ago = Math.floor(time_since_completed / (1000 * 60 * 60 * 24));

	if (mins_ago < 1) {
		ago_str = '< 1 min';
	} else if (hours_ago < 1) {
		ago_str = `${pluralize({ count: mins_ago, single: 'min' })}`;
	} else if (hours_ago < 24) {
		ago_str = `${pluralize({ count: hours_ago, single: 'hour' })}`;
	} else if (days_ago < 7) {
		ago_str = `${pluralize({ count: days_ago, single: 'day' })}`;
	} else {
		const weeks_ago = Math.floor(days_ago / 7);
		ago_str = `${pluralize({ count: weeks_ago, single: 'week' })}`;
	}

	if (desired_frequency) {
		const target_date_time = completed_date_time + desired_frequency;
		if (current_date_time > target_date_time) {
			return {
				ago_str,
				needs_completing: true
			};
		}
	}

	return { ago_str };
}

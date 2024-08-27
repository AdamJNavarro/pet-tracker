type PluralizeArgs = {
	count: number;
	single: string;
	plural?: string;
};

export function pluralize({ count, single, plural }: PluralizeArgs): string {
	return `${count} ${count !== 1 ? plural || single + 's' : single}`;
}

type GetLogBreakdownArgs = {
	completed_at: string;
	desired_frequency: number | null;
	updated_at: Date;
};

export type LogBreakdown = {
	ago_str: string;
	within_undo_period: boolean;
	needs_completing?: boolean;
};

export function get_log_breakdown({
	completed_at,
	desired_frequency,
	updated_at
}: GetLogBreakdownArgs): LogBreakdown {
	let ago_str = '';
	const current_date_time = new Date().getTime();
	const updated_date_time = new Date(updated_at).getTime();
	const time_since_updated = Math.abs(current_date_time - updated_date_time);
	const updated_mins_ago = Math.floor(time_since_updated / (1000 * 60));
	const within_undo_period = updated_mins_ago < 1;
	const completed_date_time = new Date(completed_at).getTime();
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
	} else if (days_ago < 30) {
		const weeks_ago = Math.floor(days_ago / 7);
		ago_str = `${pluralize({ count: weeks_ago, single: 'week' })}`;
	} else {
		ago_str = 'Too Long ago';
	}

	if (desired_frequency) {
		const target_date_time = completed_date_time + desired_frequency;
		if (current_date_time > target_date_time) {
			return {
				ago_str,
				within_undo_period,
				needs_completing: true
			};
		}
	}

	return { ago_str, within_undo_period };
}

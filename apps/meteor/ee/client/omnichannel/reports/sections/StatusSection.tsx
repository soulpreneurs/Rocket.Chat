import { useTranslation } from '@rocket.chat/ui-contexts';
import React from 'react';

import { PieChart, ReportCard } from '../components';
import { useStatusSection } from '../hooks';

export const StatusSection = () => {
	const t = useTranslation();
	const { data, total, ...config } = useStatusSection();

	const subtitle = t('__count__conversations__period__', {
		count: total ?? 0,
		period: config.period,
	});

	return (
		<ReportCard title={t('Conversations_by_status')} height={200} subtitle={subtitle} {...config}>
			<PieChart data={data} width={350} height={200} />
		</ReportCard>
	);
};

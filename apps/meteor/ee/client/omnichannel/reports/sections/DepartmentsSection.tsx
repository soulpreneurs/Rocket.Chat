import { useTranslation } from '@rocket.chat/ui-contexts';
import React from 'react';

import { BarChart, ReportCard } from '../components';
import { useDepartmentsSection } from '../hooks';
import { ellipsis } from '../utils/ellipsis';

export const DepartmentsSection = () => {
	const t = useTranslation();
	const { data, config } = useDepartmentsSection();

	return (
		<ReportCard title={t('Conversations_by_departments')} {...config}>
			<BarChart
				data={data}
				direction='horizontal'
				height={360}
				margins={{ left: 90, top: 16, right: 8 }}
				axis={{
					axisLeft: {
						tickSize: 0,
						tickRotation: 0,
						format: (v) => ellipsis(v, 20),
					},
					axisTop: {
						tickSize: 0,
						tickRotation: 0,
						tickValues: 4,
						format: (v) => ellipsis(v, 20),
					},
				}}
			/>
		</ReportCard>
	);
};

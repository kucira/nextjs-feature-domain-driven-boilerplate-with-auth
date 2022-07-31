import SectionData from 'src/features/dashboard/home/ui/components/SectionData';
import withPrivateRoute from 'src/shared/libs/withPrivateRoute';

function Dashboard() {
	return <SectionData />;
}

export default withPrivateRoute(Dashboard);

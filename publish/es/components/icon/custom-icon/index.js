import CheckCircle from './check-circle';
import Manual from './manual';
import AssignmentCheck from './assignment-check';
import FlightTakeoff from './flight-takeoff';

var customIconNames = ['check-circle', 'manual', 'assignment-check', 'flight-takeoff'];

var customIcons = {
  CheckCircle: CheckCircle,
  Manual: Manual,
  AssignmentCheck: AssignmentCheck,
  FlightTakeoff: FlightTakeoff
};

export default customIcons;
export { customIconNames };
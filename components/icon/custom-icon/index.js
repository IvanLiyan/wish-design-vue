import CheckCircle from './check-circle.vue';
import Manual from './manual.vue';
import AssignmentCheck from './assignment-check.vue';
import FlightTakeoff from './flight-takeoff';

const customIconNames = ['check-circle', 'manual', 'assignment-check', 'flight-takeoff'];

const customIcons = {
  CheckCircle,
  Manual,
  AssignmentCheck,
  FlightTakeoff,
};

export default customIcons;
export {
  customIconNames,
};

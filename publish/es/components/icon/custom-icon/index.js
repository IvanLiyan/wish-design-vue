import CheckCircle from './check-circle';
import Manual from './manual';
import AssignmentCheck from './assignment-check';

var customIconNames = ['check-circle', 'manual', 'assignment-check'];

var customIcons = {
  CheckCircle: CheckCircle,
  Manual: Manual,
  AssignmentCheck: AssignmentCheck
};

export default customIcons;
export { customIconNames };
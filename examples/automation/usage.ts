import { ElementIds, type ElementId } from 'shared-element-ids';

// Example for the future Automation repository, independent of a test framework.
// Its locator layer maps the shared ID to the actual platform-specific selector.
export const initialTargetId: ElementId = ElementIds.mainApp.main.mainAppPageLoginButton;

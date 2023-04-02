import {Location, NavigateFunction} from "react-router-dom";

export interface withRouterData {
  location: Location;
  navigate: NavigateFunction;
}
export {withRouter} from './WithRouter'

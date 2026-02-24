import grantPermission from "./grantpermission";
import {Route} from "react-router-dom";

export default function RoleBasedRouting({
    component: Component, roles, ...rest
  }) {
    return (
      <>
        { grantPermission(roles) && (
        <Route
          {...rest}
          render={(props) => (
            <>
              <Component {...props} />
            </>
          )}
        />
        )}
        {
          !grantPermission(roles) && (
            <Route
              render={() => (
                <>
                  Unauthorized Page View (skippable)
                </>
              )}
            />
          )
        }
      </>
    );
  }
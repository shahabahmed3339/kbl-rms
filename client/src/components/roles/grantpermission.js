import store from "../../store";

export default function GrantPermission (requestedRoles) {
  const role = store.getState().auth.user.role;

  if(role == requestedRoles){
    return true;
  }
 // in case of multiple roles, if one of the permittedRoles is present in requestedRoles, return true;
  return false;
};
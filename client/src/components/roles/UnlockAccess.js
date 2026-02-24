import grantPermission from "./grantpermission";

export default function UnlockAccess ({ children, request }) {
  const permission = grantPermission(request); // request = ['ROLE_ADMIN'] / ['ROLE_USER'] / ['ROLE_MANAGER']
  return (
    <>
      {permission && children}
    </>
  );
};
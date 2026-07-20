import type { RoleCode } from "@prisma/client";

const fullAccessRoles: RoleCode[] = ["SUPER_ADMIN"];

const readOnlyRoles: RoleCode[] = ["LEADER", "PA", "KPA", "AUDITOR", "VIEWER"];

export function hasAnyRole(userRoles: RoleCode[], allowedRoles: RoleCode[]) {
  return userRoles.some((role) => allowedRoles.includes(role));
}

export function canMutateTransaction(userRoles: RoleCode[]) {
  if (hasAnyRole(userRoles, fullAccessRoles)) {
    return true;
  }

  if (hasAnyRole(userRoles, readOnlyRoles)) {
    return false;
  }

  return hasAnyRole(userRoles, ["OPERATOR", "PPK", "PROCUREMENT_OFFICER"]);
}

export function canAccessAdmin(userRoles: RoleCode[]) {
  return hasAnyRole(userRoles, ["SUPER_ADMIN", "LPSE_ADMIN"]);
}

export enum Role {
  KING = 'king',
  QUEEN = 'queen',
  ANNO = 'anno',
}

/**
 * Returns user role
 * Currently always returns ANNO as role-based authentication is now handled via API keys in CLI
 * Frontend role management may be re-implemented in the future
 */
export const useRole = (): Role => {
  return Role.ANNO;
};

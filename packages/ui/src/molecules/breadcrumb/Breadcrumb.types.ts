/**
 * Path object representing a single breadcrumb segment
 */
export type PathObj = {
  /** Optional path for navigation. If not provided, the segment is displayed as text */
  path?: string;
  /** Display name for the breadcrumb segment */
  name: string;
};

/**
 * Props for the Breadcrumb component
 */
export type BreadcrumbProps = {
  /** Array of path objects to display as breadcrumbs */
  paths: PathObj[];
  /** Whether the last breadcrumb segment is in loading state */
  loading?: boolean;
};

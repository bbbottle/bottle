import { ContextMenuItem, ContextMenuShortcut } from '@bbki.ng/components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Login menu item
 * Note: Authentication is now handled via API keys in CLI.
 * Frontend login is disabled until re-implemented.
 */
export const LoginMenuItem = () => {
  const nav = useNavigate();

  return (
    <ContextMenuItem
      onClick={() => {
        nav('/login');
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-log-in mr-8"
      >
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
        <polyline points="10 17 15 12 10 7"></polyline>
        <line x1="15" y1="12" x2="3" y2="12"></line>
      </svg>
      login
      <ContextMenuShortcut className="mr-1">l</ContextMenuShortcut>
    </ContextMenuItem>
  );
};

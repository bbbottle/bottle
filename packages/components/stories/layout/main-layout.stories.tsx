import React from 'react';
import { MainLayout } from '@bbki.ng/components';

export default {
  title: 'Layout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

const PlaceholderBox = ({ children, label }: { children?: React.ReactNode; label?: string }) => (
  <div className="h-full border border-dotted border-gray-400 p-4 flex items-center justify-center bg-gray-50">
    {label ? <span className="text-gray-500">{label}</span> : children}
  </div>
);

export const MainLayoutDefault = () => (
  <div className="h-screen w-full overflow-auto">
    <div className="h-[832px] w-[1280px] min-w-[1280px]">
      <MainLayout
        leftCol={<PlaceholderBox label="Left Column" />}
        rightCol={<PlaceholderBox label="Right Column" />}
      >
        <PlaceholderBox label="Main Content (Children)" />
      </MainLayout>
    </div>
  </div>
);

export const MainLayoutWithoutSideColumns = () => (
  <div className="h-screen w-full overflow-auto">
    <div className="h-[832px] w-[1280px] min-w-[1280px]">
      <MainLayout>
        <PlaceholderBox label="Main Content Only" />
      </MainLayout>
    </div>
  </div>
);

export const MainLayoutWithCustomContent = () => (
  <div className="h-screen w-full overflow-auto">
    <div className="h-[832px] w-[1280px] min-w-[1280px]">
      <MainLayout
        leftCol={
          <div className="h-full p-4 bg-blue-50">
            <h3 className="font-bold">Sidebar</h3>
            <ul className="mt-2 space-y-1">
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
            </ul>
          </div>
        }
        rightCol={
          <div className="h-full p-4 bg-green-50">
            <h3 className="font-bold">Info Panel</h3>
            <p className="mt-2 text-sm">Additional information here.</p>
          </div>
        }
      >
        <div className="h-full p-4 bg-white">
          <h2 className="text-xl font-bold">Main Content Area</h2>
          <p className="mt-4">This is the main content rendered via children prop.</p>
        </div>
      </MainLayout>
    </div>
  </div>
);

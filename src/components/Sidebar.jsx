import React from 'react';
import { useSelector } from 'react-redux';

const Icons = {
  Home: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 4.33l7 6.12V20h-4v-6H9v6H5v-9.55l7-6.12M12 3L4 10v10h6v-6h4v6h6V10l-8-7z" />
    </svg>
  ),
  Shorts: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86l-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72l-2.04 1.08v1.21l.69.28 1.11.46c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z" />
    </svg>
  ),
  Subscriptions: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z" />
    </svg>
  ),
  ChevronRight: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className='mt-1'>
      <path d="M9.4 18.4l-.8-.8 5.6-5.6-5.6-5.6.8-.8 6.4 6.4-6.4 6.4z" />
    </svg>
  ),
  History: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M14.97 16.95L10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3.94 8H8v1H1.96V3h1v4.74c.04-.09.07-.17.11-.25.11-.22.23-.42.35-.63C5.22 3.86 8.51 2 12 2c5.51 0 10 4.49 10 10z" />
    </svg>
  ),
  Playlists: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm4.5 1.5l-2.5-1.5v3l2.5-1.5z" />
      <path d="M20 6h-8v7h8V6zm-1 6h-6V7h6v5z" />
    </svg>
  ),
  Videos: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M10 8l6 4-6 4V8zm11-5v18H3V3h18zm-1 1H4v16h16V4z" />
    </svg>
  ),
  Courses: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
    </svg>
  ),
  WatchLater: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M14.97 16.95L10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
    </svg>
  ),
  LikedVideos: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h1h9.43c1.06 0 1.98-.67 2.19-1.61l1.34-6c.27-1.24-.78-2.39-2.19-2.39zM7 20H4v-8h3v8zm12.98-6.83l-1.34 6c-.1.48-.61.83-1.21.83H8v-8.61l5.6-6.06c.19-.21.48-.33.78-.33.26 0 .5.11.63.3.07.1.15.26.09.47l-1.52 4.94-.4 1.29h5.58c.41 0 .8.17 1.03.46.13.15.26.4.19.71z" />
    </svg>
  ),
  Clips: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M8 7c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-1 9c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3.79-7.77L21 18.44V20h-3.27l-5.76-5.76-1.27 1.27c.19.46.3.96.3 1.49 0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4c.42 0 .81.08 1.19.2l1.37-1.37-1.11-1.11C8 10.89 7.51 11 7 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4c0 .43-.09.84-.21 1.23zm-.71.71-.43-.44.19-.58c.11-.34.16-.64.16-.92 0-1.65-1.35-3-3-3S4 5.35 4 7s1.35 3 3 3c.36 0 .73-.07 1.09-.21l.61-.24.46.46 1.11 1.11.71.71-.71.71-1.37 1.37-.43.43-.58-.18C7.55 14.05 7.27 14 7 14c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3c0-.38-.07-.75-.22-1.12l-.25-.61.47-.47 1.27-1.27.71-.71.71.71L18.15 19H19v-.85l-9.92-9.92z" />
    </svg>
  ),
  Menu: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z" />
    </svg>
  ),
  Trending: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-1h2v-4h4v-2h-4V7h-2v4H8v2h4v4z" />
    </svg>
  ),
  Music: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  ),
  Gaming: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z" />
    </svg>
  ),
  News: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M11 11h6v6h-6zM9 9H3v6h6V9zm0 12H3v6h6v-6zm2 0h6v6h-6v-6zm6-12h6v6h-6V9z" />
    </svg>
  ),
  Sport: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M18 11c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1h1v4h-1c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1v-5zm-7-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
    </svg>
  )
};

const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center px-2 py-1 rounded-lg cursor-pointer h-10 ${active ? 'bg-gray-100' : 'hover:bg-gray-100'}`}>
    {icon}
    <span className="ml-3 font-medium text-sm">{label}</span>
  </div>
);

const SidebarSection = ({ title, icon, items, showChevron = false }) => (
  <div className="mb-2 border-t border-gray-200 pt-2">
    {title && (
      <div className="flex items-center px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer h-12">
        <span className="font-medium text-sm">{title}</span>
        {showChevron && icon}
      </div>
    )}
    {items.map((item, index) => (
      <SidebarItem 
        key={index} 
        icon={item.icon} 
        label={item.label} 
        active={item.active}
      />
    ))}
  </div>
);

const SubscriptionItem = ({ name }) => (
  <div className="flex items-center px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer h-10">
    <div>
      <img src='/assests/loveIcon.jpg' alt="Icon" className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-3 overflow-hidden" />
    </div>
    <span className="font-medium text-sm">{name}</span>
  </div>
);

const Sidebar = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);

  const subscriptions = [
    "C#",
    "Mutayyab01",
    ".NET Full Stack Developer",
    "Entity Framework",
    "React JS",
    "Next JS",
    "ASP NET CORE",
    "Debugging"
  ];

  return (
    <aside className={`fixed top-14 left-0 h-[calc(100vh-56px)] w-64 bg-white border-r border-gray-200 py-4 px-3 overflow-y-auto z-50 transition-transform duration-200 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Home Section */}
      <div className="mb-2">
        <SidebarItem icon={Icons.Home} label="Home" active={true} />
        <SidebarItem icon={Icons.Shorts} label="Shorts" />
        <SidebarItem icon={Icons.Subscriptions} label="Subscriptions" />
      </div>

      {/* You Section */}
      <SidebarSection
        title="You"
        icon={Icons.ChevronRight}
        showChevron={true}
        items={[
          { icon: Icons.History, label: "History" },
          { icon: Icons.Playlists, label: "Playlists" },
          { icon: Icons.Videos, label: "Your videos" },
          { icon: Icons.Courses, label: "Your courses" },
          { icon: Icons.WatchLater, label: "Watch Later" },
          { icon: Icons.LikedVideos, label: "Liked videos" },
          { icon: Icons.Clips, label: "Your clips" }
        ]}
      />

      {/* Subscriptions Section */}
      <SidebarSection
        title="Subscriptions"
        icon={Icons.ChevronRight}
        showChevron={true}
        items={[]}
      />
      <div className="mb-4">
        {subscriptions.map((name, index) => (
          <SubscriptionItem key={index} name={name} />
        ))}
      </div>

      {/* Complete Explore Section */}
      <SidebarSection
        title="Explore"
        icon={Icons.ChevronRight}
        showChevron={true}
        items={[
          { icon: Icons.Trending, label: "Trending" },
          { icon: Icons.Music, label: "Music", }, 
          { icon: Icons.Gaming, label: "Gaming" },
          { icon: Icons.News, label: "News" },
          { icon: Icons.Sport, label: "Sport" }
        ]}
      />
    </aside>
  );
};

export default Sidebar;

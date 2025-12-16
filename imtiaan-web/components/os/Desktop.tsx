"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import Dock from "./Dock";
import Window from "./Window";
import About from "@/components/apps/About";
import Work from "@/components/apps/Work";
import Services from "@/components/apps/Services";
import Contact from "@/components/apps/Contact";
import Blog from "@/components/apps/Blog";
import { BlogPost } from "@/lib/posts";

// Define the apps and their components
const APPS = {
  about: { title: "About Me", component: About, width: 800, height: 600 },
  work: { title: "Work Experience", component: Work, width: 900, height: 700 },
  consulting: { title: "Services", component: Services, width: 1000, height: 700 },
  blog: { title: "Blog", component: Blog, width: 800, height: 600 },
  contact: { title: "Contact", component: Contact, width: 600, height: 500 },
};

type AppId = keyof typeof APPS;

interface WindowState {
  id: AppId;
  zIndex: number;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
}

interface DesktopProps {
  initialPosts: BlogPost[];
}

export default function Desktop({ initialPosts }: DesktopProps) {
  const [windows, setWindows] = useState<WindowState[]>([
    { id: "about", zIndex: 1, isOpen: true, isMinimized: false, position: { x: 50, y: 50 } }
  ]);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>("about");
  const [maxZIndex, setMaxZIndex] = useState(1);

  // Handle opening an app from the dock
  const handleOpenApp = (id: string) => {
    const appId = id as AppId;
    
    setWindows((prev) => {
      const existingWindow = prev.find((w) => w.id === appId);
      
      if (existingWindow) {
        // If minimized, restore it. If open, focus it.
        return prev.map((w) => 
          w.id === appId 
            ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZIndex + 1 }
            : w
        );
      }
      
      // Open new window with staggered position
      const offset = prev.length * 30;
      return [
        ...prev,
        { 
          id: appId, 
          zIndex: maxZIndex + 1, 
          isOpen: true, 
          isMinimized: false, 
          position: { x: 50 + offset, y: 50 + offset } 
        }
      ];
    });

    setMaxZIndex((prev) => prev + 1);
    setActiveWindowId(appId);
  };

  // Handle closing a window
  const handleCloseWindow = (id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  // Handle focusing a window (bring to front)
  const handleFocusWindow = (id: AppId) => {
    setWindows((prev) => 
      prev.map((w) => 
        w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
      )
    );
    setMaxZIndex((prev) => prev + 1);
    setActiveWindowId(id);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-black relative selection:bg-emerald-500/30">
      {/* Dynamic Green Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]" />
      
      {/* Animated Blobs for "Liquid Glass" effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-emerald-800/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

      {/* Desktop Icons Area */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 blur-[120px] rounded-full mix-blend-screen animate-blob" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen animate-blob animation-delay-2000" />
      <div className="absolute bottom-[20%] left-[20%] w-[30%] h-[30%] bg-emerald-500/10 blur-[100px] rounded-full mix-blend-screen animate-blob animation-delay-4000" />
      
      {/* Grid Overlay for "Tech" feel */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <TopBar />

      <div className="relative z-10 w-full h-full pt-8 pb-24">
        {windows.map((win) => {
          const App = APPS[win.id];
          const AppComponent = App.component as any;
          
          return (
            <Window
              key={win.id}
              id={win.id}
              title={App.title}
              isOpen={win.isOpen}
              isActive={activeWindowId === win.id}
              onClose={() => handleCloseWindow(win.id)}
              onFocus={() => handleFocusWindow(win.id)}
              initialPosition={win.position}
              defaultWidth={App.width}
              defaultHeight={App.height}
              className={win.isMinimized ? "hidden" : ""}
            >
              {/* Pass specific props to apps that need them */}
              {win.id === 'blog' ? (
                <Blog posts={initialPosts} />
              ) : (
                <AppComponent />
              )}
            </Window>
          );
        })}
      </div>

      <Dock 
        onOpenApp={handleOpenApp} 
        activeApps={windows.map(w => w.id)} 
      />
    </div>
  );
}

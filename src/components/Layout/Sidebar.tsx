import React from 'react';
import { Calendar, Users, BarChart3, Clock, MapPin, Settings, X } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Find Appointments', icon: Calendar, id: 'appointments' },
  { name: 'Waitlist', icon: Clock, id: 'waitlist' },
  { name: 'My Appointments', icon: Users, id: 'my-appointments' },
  { name: 'NHS Trusts', icon: MapPin, id: 'trusts' },
  { name: 'Analytics', icon: BarChart3, id: 'analytics' },
  { name: 'Settings', icon: Settings, id: 'settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  onViewChange, 
  isOpen, 
  onClose 
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex justify-end p-4 lg:hidden">
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-4 space-y-1">
            {navigation.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    onViewChange(item.id);
                    onClose();
                  }}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full text-left transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Bottom info */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs font-medium text-blue-900">NHS Impact</p>
              <p className="text-lg font-bold text-blue-700">£2.8M saved</p>
              <p className="text-xs text-blue-600">12,584 appointments optimized</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
import React, { useState } from 'react';
import { MapPin, Star, Phone, Globe, Navigation } from 'lucide-react';
import { NHSTrust } from '../../types';
import { useTrusts } from '../../hooks/useNHSData';

export const TrustDirectory: React.FC = () => {
  const { data: trusts, isLoading } = useTrusts();
  const [selectedTrust, setSelectedTrust] = useState<NHSTrust | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrusts = trusts?.filter(trust =>
    trust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trust.postcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trust.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ) || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">NHS Trust Directory</h2>
          <p className="text-gray-600">Find NHS trusts and their specialties</p>
        </div>
        
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search trusts, postcodes, specialties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTrusts.map((trust) => (
          <div
            key={trust.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => setSelectedTrust(selectedTrust?.id === trust.id ? null : trust)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{trust.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{trust.address}, {trust.postcode}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium text-gray-700">{trust.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">rating</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {trust.code}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Specialties</p>
              <div className="flex flex-wrap gap-1">
                {trust.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {specialty}
                  </span>
                ))}
                {trust.specialties.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{trust.specialties.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {selectedTrust?.id === trust.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">All Specialties</h4>
                    <div className="space-y-1">
                      {trust.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        <Calendar className="h-4 w-4 mr-2" />
                        View Appointments
                      </button>
                      <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTrusts.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No trusts found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};
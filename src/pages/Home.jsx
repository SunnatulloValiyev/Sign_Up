import React from 'react';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user, onlineUsers } = useAuth();

  const otherOnlineUsers = onlineUsers.filter(onlineUser => 
    onlineUser.uid !== user?.uid
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bosh sahifa</h1>
      
      {user ? (
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src={user.photoURL} 
                  alt={user.displayName} 
                  className="w-12 h-12 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {user.displayName}
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Siz (Online)
                  </span>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">
            Boshqa online foydalanuvchilar ({otherOnlineUsers.length})
          </h2>
          
          {otherOnlineUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherOnlineUsers.map((onlineUser) => (
                <div 
                  key={onlineUser.uid} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center space-x-4"
                >
                  <img 
                    src={onlineUser.photoURL} 
                    alt={onlineUser.displayName} 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {onlineUser.displayName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{onlineUser.email}</p>
                    <span className="inline-flex items-center mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Hozircha boshqa online foydalanuvchilar yo'q
            </p>
          )}
        </div>
      ) : (
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <p className="text-black dark:text-white">
            Online foydalanuvchilarni ko'rish uchun tizimga kiring
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
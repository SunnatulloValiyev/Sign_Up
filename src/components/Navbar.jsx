import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout, onlineUsers } = useAuth();

  return (
    <header className="p-4 dark:bg-gray-800 dark:text-white shadow-sm">
      <div className="container flex justify-between h-16 mx-auto items-center">
        <Link to="/" className="flex items-center text-xl font-bold">
          MyApp
        </Link>
        
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName} 
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
                <div>
                  <p className="font-medium">{user.displayName}</p>
                  <p className="text-xs text-gray-500">
                    {onlineUsers.length} online
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Chiqish
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-4 py-2 hover:text-blue-500 transition-colors"
              >
                Kirish
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Ro'yxatdan o'tish
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
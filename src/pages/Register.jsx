import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get('email'),
      name: formData.get('name'),
      password: formData.get('password')
    };

    try {
      await register(userData);
      navigate("/"); 
    } catch (err) {
    }
  };

  return (
    <section>
      <div className="h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="fixed inset-0 bg-cover bg-center bg-[url(https://picsum.photos/1200)] opacity-60 md:opacity-100 md:relative"></div>

        <div className="grid place-items-center relative z-10">
          <div className="w-full max-w-md p-8 space-y-3 rounded-xl opacity-90 dark:text-gray-100 backdrop-blur-sm">
            {error && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <h1 className="text-2xl font-bold text-black text-center">Ro'yxatdan o'tish</h1>

              <div className="space-y-1 text-sm">
                <label htmlFor="email" className="block text-black">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Emailni kiriting"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:text-black focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="name" className="block text-black">
                  Ism
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Ismingizni kiriting"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:text-black focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="password" className="block text-black">
                  Parol
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Parolni kiriting"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:text-black focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Kamida 6 belgi bo'lishi kerak
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="block w-full p-3 text-center rounded-sm text-white bg-violet-600 hover:bg-violet-700 active:scale-95 transition-transform disabled:opacity-50"
              >
                {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
              </button>
            </form>

            <p className="text-xs text-center sm:px-6 text-gray-600 dark:text-black">
              Akkauntingiz bormi?{' '}
              <Link
                to="/login"
                className="ml-1 text-violet-600 dark:text-violet-400 hover:underline"
                onClick={clearError}
              >
                Kirish
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
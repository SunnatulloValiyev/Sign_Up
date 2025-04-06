import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, loading, error, clearError, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    const formData = new FormData(e.target);
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      await login(credentials);
      navigate("/main"); 
    } catch (err) {}
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/main");
    } catch (err) {}
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
              <h1 className="text-2xl font-bold text-black text-center">Tizimga kirish</h1>

              <div className="space-y-1 text-sm">
                <label htmlFor="email" className="block text-black">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Emailni kiriting"
                  className="w-full px-4 py-3 rounded-md border text-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="password" className="block text-black">Parol</label>
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Parolni kiriting"
                  className="w-full px-4 py-3 rounded-md border text-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
                <div className="flex justify-end text-xs dark:text-gray-600">
                  <Link to="/forgot-password" className="hover:underline">
                    Parolni unutdingizmi?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="block w-full p-3 text-center rounded-sm text-white bg-violet-600 hover:bg-violet-700 active:scale-95 transition-transform disabled:opacity-50"
              >
                {loading ? "Kirilmoqda..." : "Kirish"}
              </button>
            </form>

            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 bg-gray-300 dark:bg-gray-600"></div>
              <p className="px-3 text-sm text-gray-600 dark:text-gray-400">
                Ijtimoiy tarmoqlar orqali kirish
              </p>
              <div className="flex-1 h-px sm:w-16 bg-gray-300 dark:bg-gray-600"></div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="p-3 rounded-sm cursor-pointer flex items-center gap-2 border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 text-black h-5 fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
                <span className="text-black">Google bilan kirish</span>
              </button>
            </div>

            <p className="text-xs text-center sm:px-6 text-gray-600 dark:text-gray-400">
              Akkauntingiz yo'qmi?{" "}
              <Link
                to="/register"
                className="ml-1 text-violet-600 dark:text-violet-400 hover:underline"
                onClick={clearError}
              >
                Ro'yxatdan o'tish
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
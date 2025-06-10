import { useState, type FormEvent } from "react";
import { useAuth } from "../auth/AuthContext";

export const AuthField = () => {
  const { login, register, logout, token } = useAuth(); // добавляем token для проверки
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // управление формой

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }

      setShowForm(false); // скрываем форму после успеха
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Помилка авторизації");
    }
  };

  // Если пользователь залогинен
  if (token) {
    return (
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Вийти
        </button>
      </div>
    );
  }

  // Если пользователь не залогинен и форма скрыта
  if (!showForm) {
    return (
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          Увійти
        </button>
      </div>
    );
  }

  // Форма входа/регистрации
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm relative"
      >
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Вхід" : "Реєстрація"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
        >
          {isLogin ? "Увійти" : "Зареєструватися"}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin((prev) => !prev)}
          className="w-full mt-2 text-sm text-purple-600 hover:underline"
        >
          {isLogin ? "Немає акаунту? Реєстрація" : "Уже є акаунт? Вхід"}
        </button>
      </form>
    </div>
  );
};

export default AuthField;

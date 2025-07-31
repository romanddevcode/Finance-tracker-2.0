import { useState, type FormEvent } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";

export const AuthField = () => {
  const { login, register, logout, token } = useAuth(); // добавляем token для проверки
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // управление формой

  const { t } = useTranslation("loginReg");

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
          {t("button_logout")}
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
          className="bg-primary text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          {t("button_login")}
        </button>
      </div>
    );
  }

  // Форма входа/регистрации
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40">
      <form
        onSubmit={handleSubmit}
        className="bg-bgBase p-6 rounded-lg shadow-md w-full max-w-sm relative"
      >
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-textBase">
          {isLogin ? `${t("title_login")}` : `${t("title_register")}`}
        </h2>

        {error && (
          <p
            role="errorMessage"
            className="text-red-500 text-sm text-center mb-3"
          >
            {error}
          </p>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("email_placeholder")}
          className="w-full mb-3 p-2 border rounded text-textBase"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("password_placeholder")}
          className="w-full mb-3 p-2 border rounded text-textBase"
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-textBase py-2 px-4 rounded hover:bg-purple-600"
        >
          {isLogin ? `${t("button_login")}` : `${t("button_register")}`}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin((prev) => !prev)}
          className="w-full mt-2 text-sm text-primary hover:underline"
        >
          {isLogin ? `${t("login_question")}` : `${t("register_question")}`}
        </button>
      </form>
    </div>
  );
};

export default AuthField;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./ExpensesPages.styled";
import ExpensesTable from "./ExpensesTable";
import AddExpenseForm from "./AddExpenseForm";
import Header from "../components/Header";
import api from "../api";

const categoryTranslations = {
  food: "Еда",
  transport: "Транспорт",
  housing: "Жилье",
  joy: "Развлечения",
  education: "Образование",
  others: "Другое"
};
const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    // Если дата некорректная (например, уже в формате ДД.ММ.ГГГГ), возвращаем как есть
    if (isNaN(date.getTime())) return dateString; 
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы в JS идут от 0 до 11
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
  } catch {
    return dateString;
  }
};
const ExpensesPages = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //  Функция загрузки расходов с бэкенда
  useEffect(() => {
    const token = localStorage.getItem("token");
  
  // Если токена нет, не отправляем запрос, а сразу выкидываем на логин
  if (!token) {
    navigate("/login"); // Убедитесь, что navigate доступен в компоненте через useNavigate()
    return;
  }
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await api("transactions");
        const transactionsData = response.transactions || response;
        const formattedExpenses = transactionsData.map(item => ({
        ...item,
        id: item._id || item.id,
        name: item.description || item.name,
        amount: item.sum || item.amount,
        date: formatDate(item.date),
        // Переводим категорию на русский для таблицы, если есть перевод
        category: categoryTranslations[item.category] || item.category 
      }));
        setExpenses(formattedExpenses);
      } catch (error) {
        console.error("Не удалось загрузить расходы:", error.message);
        alert(`Ошибка загрузки: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, [navigate]);

  // Коллбэк для добавления нового расхода из формы
  const handleAddExpense = async (expenseData) => {
    // Очищаем сумму от пробелов и валюты, преобразуя в чистое число для сервера
    const cleanAmount =
      typeof expenseData.amount === "string"
        ? Number(expenseData.amount.replace(/\s|₽/g, ""))
        : Number(expenseData.amount);

    const newExpense = {
      description: expenseData.name,
      category: expenseData.category,
      date: expenseData.date,
      sum: cleanAmount,
    };
    try {
      const response = await api("transactions",{
        method: "POST",
        body: newExpense,
      });
      // Если сервер возвращает созданный объект внутри поля transaction, берем его
      const addedExpense = response.transaction || response;
      const safeAddedExpense = {
      ...addedExpense,
      id: addedExpense._id || addedExpense.id,
      name: addedExpense.description || addedExpense.name,
      amount: addedExpense.sum || addedExpense.amount,
      // Переводим для таблицы
      category: categoryTranslations[addedExpense.category] || addedExpense.category
    };

      setExpenses([safeAddedExpense, ...expenses]);
    } catch (error) {
       console.error("Не удалось добавить расход:", error.message);
      alert(`Не удалось добавить расход: ${error.message}`);
    }
  };
  //  удаления расхода из таблицы
  const handleDeleteExpense = async (id) => {
    try {
      await api(`transactions/${id}`, {
        method: "DELETE",
      });
      setExpenses(expenses.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Не удалось удалить расход:", error);
      alert(`Не удалось удалить элемент на сервере: ${error.message}`);
    }
  };

  return (
    <S.PageWrapper>
      <Header />

      {/* Основной контент */}
      <S.Main>
        <S.Title>Мои расходы</S.Title>

        <S.GridContainer>
          {/* Компонент таблицы */}
          {isLoading ? (
            <p>Загрузка расходов...</p>
          ) : (
            <ExpensesTable
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
            />
          )}
          {/* Компонент формы */}
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </S.GridContainer>
      </S.Main>
    </S.PageWrapper>
  );
};

export default ExpensesPages;

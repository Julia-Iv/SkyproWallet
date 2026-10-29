import { useState, useEffect } from "react";
import * as S from "./ExpensesPages.styled";
import ExpensesTable from "./ExpensesTable";
import AddExpenseForm from "./AddExpenseForm";
import Header from "../components/Header";
import api from "../api";
/*
const initialExpenses = [
  {
    id: 1,
    name: "Пятерочка",
    category: "Еда",
    date: "03.07.2026",
    amount: "3 500 ₽",
  },
  {
    id: 2,
    name: "Яндекс Такси",
    category: "Транспорт",
    date: "03.07.2026",
    amount: "750 ₽",
  },
  {
    id: 3,
    name: "Аптека Вита",
    category: "Другое",
    date: "03.07.2026",
    amount: "1 200 ₽",
  },
  {
    id: 4,
    name: "Додо Пицца",
    category: "Еда",
    date: "02.07.2026",
    amount: "950 ₽",
  },
];
*/
const ExpensesPages = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //  Функция загрузки расходов с бэкенда
  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/transactions");
        const transactionsData = response.data.transactions || response.data;
        setExpenses(transactionsData);
      } catch (error) {
        if (error.response) {
          // Сервер ответил статусом 5xx или 4xx
          console.log("Данные ответа сервера:", error.response.data);
          console.log("Статус ответа:", error.response.status);
        } else if (error.request) {
          // Запрос был отправлен, но ответ не получен
          console.log("Сервер не ответил:", error.request);
        } else {
          console.log("Ошибка Axios:", error.message);
        }
        //console.error("Не удалось загрузить расходы:", error);
        // alert("Ошибка при получении данных с сервера");
        } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Коллбэк для добавления нового расхода из формы
  const handleAddExpense = async (expenseData) => {
    // Очищаем сумму от пробелов и валюты, преобразуя в чистое число для сервера
    const cleanAmount =
      typeof expenseData.amount === "string"
        ? Number(expenseData.amount.replace(/\s|₽/g, ""))
        : Number(expenseData.amount);

    const newExpense = {
      name: expenseData.name,
      category: expenseData.category,
      date: expenseData.date,
      amount: cleanAmount,
    };
    try {
      const response = await api.post("/transactions", newExpense);

      // Если сервер возвращает созданный объект внутри поля transaction, берем его
      const addedExpense = response.data.transaction || response.data;

      setExpenses([addedExpense, ...expenses]);
    } catch (error) {
      console.error("Полная ошибка Axios:", error);
  
  if (error.response) {
    // Сервер ответил кодом ошибки (400, 401, 403 и т.д.)
    console.log("Данные от сервера:", error.response.data);
    alert(`Ошибка сервера: ${error.response.data.message || error.response.data.error || error.response.status}`);
  } else {
    // Ошибка сети или Axios
    alert(`Ошибка соединения: ${error.message}`);
     // console.error("Не удалось добавить расход:", error);
     // alert("Ошибка при сохранении расхода");
    }
  }
  };

  //  удаления расхода из таблицы
  const handleDeleteExpense = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      setExpenses(expenses.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Не удалось удалить расход:", error);
      alert("Не удалось удалить элемент на сервере");
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

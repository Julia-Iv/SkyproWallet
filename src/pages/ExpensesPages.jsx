import { useState } from "react";
import * as S from "./ExpensesPages.styled";
import ExpensesTable from "./ExpensesTable";
import AddExpenseForm from "./AddExpenseForm";
import Header from "../components/Header";

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

function ExpensesPages() {
  const [expenses, setExpenses] = useState(initialExpenses);

  // Коллбэк для добавления нового расхода из формы
  const handleAddExpense = (expenseData) => {
    const newExpense = {
      id: Date.now(),
      name: expenseData.name,
      category: expenseData.category,
      date: expenseData.date,
      amount: expenseData.amount.includes("₽")
        ? expenseData.amount
        : `${Number(expenseData.amount).toLocaleString("ru-RU")} ₽`,
    };

    setExpenses([newExpense, ...expenses]);
  };

  // Коллбэк для удаления расхода из таблицы
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  return (
    <S.PageWrapper>
      <Header />

      {/* Основной контент */}
      <S.Main>
        <S.Title>Мои расходы</S.Title>

        <S.GridContainer>
          {/* Компонент таблицы */}
          <ExpensesTable
            expenses={expenses}
            onDeleteExpense={handleDeleteExpense}
          />

          {/* Компонент формы */}
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </S.GridContainer>
      </S.Main>
    </S.PageWrapper>
  );
}

export default ExpensesPages;

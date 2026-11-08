import { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import PeriodCalendar from "../components/PeriodCalendar";
import AnalysisChart from "./AnalysisChart";
import * as S from "./AnalysisPage.styled";
import api from "../api";

const categoryTranslations = {
  groceries: "Еда",
  transport: "Транспорт",
  housing: "Жилье",
  entertainment: "Развлечения",
  education: "Образование",
  other: "Другое",
};

const ALL_CATEGORIES = [
  "Еда",
  "Транспорт",
  "Жилье",
  "Развлечения",
  "Образование",
  "Другое",
];

const AnalysisPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Храним выбранные даты (выбираются в календаре). По умолчанию — текущий месяц
  const [selectedRange, setSelectedRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // 1-е число месяца
    to: new Date(), // Сегодня
  });

  // Загрузка транзакций
  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await api("transactions");
        const transactionsData = response.transactions || response;
        const formatted = transactionsData.map((item) => ({
          ...item,
          amount:
            typeof item.sum === "string"
              ? Number(item.sum.replace(/\s|₽/g, ""))
              : Number(item.sum || item.amount),
          date: new Date(new Date(item.date).setHours(0, 0, 0, 0)),
          category:
            categoryTranslations[item.category] || item.category || "Другое",
        }));
        setExpenses(formatted);
      } catch (error) {
        console.error("Ошибка загрузки аналитики:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  //  Фильтрация расходов по выбранному диапазону дат из календаря
  const filteredExpenses = useMemo(() => {
    if (!selectedRange || !selectedRange.from || !selectedRange.to) return expenses;

    // Сбрасываем время для точного сравнения дней
    const start = new Date(selectedRange.from).setHours(0, 0, 0, 0);
    const end = selectedRange.to
      ? new Date(selectedRange.to).setHours(23, 59, 59, 999)
      : new Date(selectedRange.from).setHours(23, 59, 59, 999);

    return expenses.filter((item) => {
      const itemTime = item.date.getTime();
      return itemTime >= start && itemTime <= end;
    });
  }, [expenses, selectedRange]);

  // Расчет общей суммы за период
  const totalAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, item) => sum + (item.amount || 0), 0);
  }, [filteredExpenses]);

  // Подготовка структуры для графика (гарантируем наличие всех столбцов с суммами)
  const chartData = useMemo(() => {
    const map = {};
    ALL_CATEGORIES.forEach((cat) => {
      map[cat] = 0;
    });

    filteredExpenses.forEach((item) => {
      if (map[item.category] !== undefined) {
        map[item.category] += item.amount;
      } else {
        map["Другое"] += item.amount;
      }
    });

    return Object.keys(map).map((key) => ({
      name: key,
      value: map[key],
    }));
  }, [filteredExpenses]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f5f7" }}>
      {/* Общая шапка приложения */}
      <Header />

      {/* Сетка страницы Анализа */}
      <S.Main>
        <S.Title>Анализ расходов</S.Title>

        <S.GridContainer>
          <PeriodCalendar onPeriodSelect={(range) => setSelectedRange(range)} />
          {isLoading ? (
            <p>Загрузка аналитики...</p>
          ) : (
            <AnalysisChart
              chartData={chartData}
              totalAmount={totalAmount}
              dateRange={selectedRange}
            />
          )}
        </S.GridContainer>
      </S.Main>
    </div>
  );
};

export default AnalysisPage;

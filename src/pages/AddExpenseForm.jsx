import { useState } from "react";
import * as S from "./ExpensesPages.styled";

const categories = [
  { id: "food", name: "Еда", icon: "🍔" },
  { id: "transport", name: "Транспорт", icon: "🚗" },
  { id: "housing", name: "Жилье", icon: "🏠" },
  { id: "joy", name: "Развлечения", icon: "🎬" },
  { id: "education", name: "Образование", icon: "🎓" },
  { id: "others", name: "Другое", icon: "⚫" },
];

function AddExpenseForm({ onAddExpense }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !date || !amount) {
      alert("Пожалуйста, заполните все поля и выберите категорию!");
      return;
    }
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}.${month}.${year}`;
    // Передаем собранные данные в родительский компонент
    onAddExpense({
      name,
      category,
      date: formattedDate,
      amount,
    });

    // Очищаем форму
    setName("");
    setCategory("");
    setDate("");
    setAmount("");
  };

  return (
    <S.Card>
      <S.CardTitle>Новый расход</S.CardTitle>
      <S.Form onSubmit={handleSubmit}>
        <S.FormGroup>
          <S.Label>Описание</S.Label>
          <S.Input
            type="text"
            placeholder="Введите описание"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>Категория</S.Label>
          <S.CategoryGrid>
            {categories.map((cat) => (
              <S.CategoryButton
                key={cat.id}
                type="button"
                style={
                  category === cat.id
                    ? { borderColor: "#6366f1", backgroundColor: "#eef2ff" }
                    : {}
                }
                onClick={() => setCategory(cat.id)}
              >
                {cat.icon} {cat.name}
              </S.CategoryButton>
            ))}
          </S.CategoryGrid>
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>Дата</S.Label>
          <S.Input
            type="date"
            placeholder="ДД.ММ.ГГГГ"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>Сумма</S.Label>
          <S.Input
            type="number"
            placeholder="Введите сумму"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </S.FormGroup>

        <S.SubmitButton type="submit">Добавить новый расход</S.SubmitButton>
      </S.Form>
    </S.Card>
  );
}

export default AddExpenseForm;

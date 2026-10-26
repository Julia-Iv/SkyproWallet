import * as S from "../pages/AnalysisPage.styled";

const PeriodCalendar = () => {
  const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  
  // Пример генерации массива дней для июля
  const julyDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <S.Card>
      <S.CardTitle>Период</S.CardTitle>
      
      {/* Статичные дни недели */}
      <S.DaysOfWeek>
        {daysOfWeek.map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </S.DaysOfWeek>

      {/* Прокручиваемый список месяцев */}
      <S.CalendarScroll>
        <S.MonthTitle>Июль 2024</S.MonthTitle>
        <S.DaysGrid>
          {/* Пустые ячейки для выравнивания по дням недели, если месяц начинается не с понедельника */}
          <div /> <div /> 
          {julyDays.map((day) => (
            <S.DayButton key={`july-${day}`} $active={day === 10}>
              {day}
            </S.DayButton>
          ))}
        </S.DaysGrid>

        <S.MonthTitle>Август 2024</S.MonthTitle>
        <S.DaysGrid>
          {/* Пример для следующего месяца */}
          {Array.from({ length: 11 }, (_, i) => i + 1).map((day) => (
            <S.DayButton key={`august-${day}`} $active={false}>
              {day}
            </S.DayButton>
          ))}
        </S.DaysGrid>
      </S.CalendarScroll>
    </S.Card>
  );
};

export default PeriodCalendar;
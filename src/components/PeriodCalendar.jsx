import { useState } from "react";
import * as S from "../pages/AnalysisPage.styled";

const PeriodCalendar = ({onPeriodSelect}) => {
  const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  // Функция для генерации данных месяцев (например, весь 2026 год или текущий + прошлый)
  // Для примера сгенерируем 12 месяцев 2026 года
  const generateYearData = (year = 2026) => {
    const months = [];
    
    for (let month = 4; month < 12; month++) {
      // Узнаем, с какого дня недели начинается месяц (0 - вск, 1 - пн, ..., 6 - сб)
      const firstDayInstance = new Date(year, month, 1);
      let startDayOfWeek = firstDayInstance.getDay(); 
      // Переводим на привычный нам лад (0 - пн, 1 - вт, ..., 6 - вск)
      startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

      // Узнаем количество дней в этом месяце
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      months.push({
        year,
        monthIndex: month,
        name: `${monthNames[month]} ${year}`,
        startDayOfWeek,
        daysCount: daysInMonth
      });
    }
    return months;
  };

const calendarData = generateYearData(2026); // Можно передать currentYear динамически

  //  клик по дню
  const handleDayClick = (year, monthIndex, day) => {
    const clickedDate = new Date(year, monthIndex, day);
   if (!startDate || (startDate && endDate)) {
      // Первый клик или сброс старого диапазона: устанавливаем дату старта
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      // Второй клик
      if (clickedDate < startDate) {
        // Если кликнули на дату раньше старта, делаем её новой датой старта
        setStartDate(clickedDate);
      } else {
        // Иначе это дата окончания
        setEndDate(clickedDate);
        
        // Передаем статичный период в родительский компонент для отправки в анализ
        if (onPeriodSelect) {
          onPeriodSelect({
            start: startDate.toLocaleDateString("ru-RU"),
            end: clickedDate.toLocaleDateString("ru-RU")
          });
        }
        console.log("Фиксированный период выбран:", {
          from: startDate.toLocaleDateString("ru-RU"),
          to: clickedDate.toLocaleDateString("ru-RU")
        });
      }
    }
  };

  // Проверка статуса дня для стилизации
  const getDayStatus = (year, monthIndex, day) => {
    const currentDate = new Date(year, monthIndex, day);
    
    const isStart = startDate && currentDate.getTime() === startDate.getTime();
    const isEnd = endDate && currentDate.getTime() === endDate.getTime();
    const isInRange = startDate && endDate && currentDate > startDate && currentDate < endDate;

    return { isStart, isEnd, isInRange };
  };

 
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
        {calendarData.map((month) => {
          // Создаем массив пустых ячеек для сдвига первой недели
          const blanks = Array.from({ length: month.startDayOfWeek }, (_, i) => i);
          // Создаем массив дней месяца [1, 2, 3...31]
          const days = Array.from({ length: month.daysCount }, (_, i) => i + 1);

          return (
            <S.MonthWrapper key={`${month.year}-${month.monthIndex}`}>
              <S.MonthTitle>{month.name}</S.MonthTitle>
              <S.DaysGrid>
                {/* Рендерим пустые ячейки для выравнивания */}
                {blanks.map((blank) => (
                  <div key={`blank-${month.monthIndex}-${blank}`} />
                ))}
                
                {/* Рендерим реальные дни */}
                {days.map((day) => {
                  const { isStart, isEnd, isInRange } = getDayStatus(month.year, month.monthIndex, day);
                  return (
                    <S.DayButton 
                      key={`day-${month.year}-${month.monthIndex}-${day}`} 
                      $active={isStart || isEnd} // Границы диапазона (первый и последний день)
                      $inRange={isInRange}       // Дни внутри диапазона
                      onClick={() => handleDayClick(month.year, month.monthIndex, day)}
                    >
                      {day}
                    </S.DayButton>
                  );
                })}
              </S.DaysGrid>
            </S.MonthWrapper>
          );
        })}
      </S.CalendarScroll>
    </S.Card>
  );
};

export default PeriodCalendar;
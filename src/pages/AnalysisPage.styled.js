import styled, { css } from "styled-components";

// Главный контейнер страницы
export const Main = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 24px 40px 24px;
  font-family:
    "Montserrat",
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  margin-top: 0;
  margin-bottom: 24px;
  color: #111827;
  letter-spacing: -0.02em;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 32px;
  align-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 24px 0px 24px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  height: 100%;
`;

export const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #000000;
`;
export const ChartSubTitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #9ca3af;
  margin: 4px 0 0 0;
`;
// Сетка для столбцов диаграммы (теперь гибкая и высокая)
export const ChartBarsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    6,
    1fr
  ); /* 6 одинаковых колонок на всю ширину карточки */
  gap: 24px; /* Увеличили расстояние между графиками */
  align-items: end;
  flex-grow: 1; /* Заставляет контейнер графиков занять всю оставшуюся высоту карточки */
  margin-top: 40px; /* Отступ сверху до подсказок */
  height: 260px; /* Базовая высота зоны графиков */
`;

// Контейнер одного столбца
export const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  height: 100%;
  justify-content: flex-end;
`;

// столбец с адаптивной шириной
export const Bar = styled.div`
  width: 100%; /* Растягивается по ширине своей колонки */
  max-width: 56px; /* Ограничение максимальной ширины, чтобы не были слишком толстыми */
  height: ${(props) => props.$height || "0%"};
  background-color: ${(props) => props.$color || "#e5e7eb"};
  border-radius: 8px 8px 0px 0px;
  transition: height 0.3s ease;
  position: relative;

  /* Подсказка над столбцом */
  &::before {
    content: "${(props) => props.$value}";
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 13px;
    font-weight: 700;
    color: #111827;
    white-space: nowrap;
  }
`;

export const BarLabel = styled.span`
  font-size: 13px;
  color: #6b7280;
  text-align: center;
  font-weight: 500;
`;

/* Стили для Календаря */
export const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-top: 32px;
  margin-bottom: 12px;
  border-bottom: 1px solid #f3f4f6;
  padding-right: 24px;
  div {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    text-transform: uppercase;
  }
`;
export const CalendarScroll = styled.div`
  max-height: 280px;
  overflow-y: auto;
  margin-top: 16px;
  padding-right: 24px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 4px;
  }
  /* Смещаем сам скроллбар чуть ближе к краю карточки, если необходимо */
  &::-webkit-scrollbar-track {
    margin-right: 2px;
  }
`;
export const MonthWrapper = styled.div`
  margin-bottom: 24px; /* Отступ между месяцами (например, между концом Июля и заголовком Августа) */

  &:last-child {
    margin-bottom: 0;
  }
`;
export const MonthTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin-top: 0;
  margin-bottom: 16px;
  margin-left: 8px;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px 0;
  justify-items: stretch;
  align-items: center;
`;

export const DayButton = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 12px;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  z-index: 1;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  /* СТАТИЧНОЕ СОСТОЯНИЕ: Все числа изначально в серых кружочках */
  background-color: #f3f5f6;
  color: #4b5563;
  border-radius: 50%;

  /* БАЗОВЫЙ ХОВЕР: Для обычных дней при наведении легкий круглый фон */
  &:hover {
    background: #f1ebfd;
    color: #7f56d9;
    border-radius: 50%;
  }

  /* СОСТОЯНИЕ: ДЕНЬ ВНУТРИ ДИАПАЗОНА (Несколько дней / недель) */
  ${(props) =>
    props.$inRange &&
    css`
      background: #f1ebfd !important;
      color: #7f56d9;
      border-radius: 50%;

      &:hover {
        background: #e9dffd !important;
        color: #7f56d9 !important;
        border-radius: 50%;
      }
    `}

  /* СОСТОЯНИЕ: АКТИВНЫЕ ДНИ (Старт или Конец периода) */
  ${(props) =>
    props.$active &&
    css`
      background: #f1ebfd; /* Фоновая заливка подложки диапазона */
      font-weight: 600;
      color: #7f56d9;
      border-radius: 50%;

      /* Создаем фиолетовый кружок поверх заливки с помощью псевдоэлемента */
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 40px;
        height: 40px;
        background: #f1ebfd;
        color: #7f56d9;
        border-radius: 50%;
        z-index: -1;
      }

      &:hover {
        background: #f1ebfd;
        color: #7f56d9;
      }
    `}
`;
/* Стили для Графика */

export const ChartAmount = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 32px;
`;

// Подпись под столбцом (Еда, Транспорт...)

export const ChartHeader = styled.div`
  margin-bottom: 24px;
`;

export const TotalAmount = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
`;

export const DateRangeText = styled.p`
  font-size: 12px;
  color: #9ca3af;
  margin: 4px 0 0 0;
`;

export const BarsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 240px;
  padding-top: 20px;
`;

export const BarValue = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #111827;
`;
export const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 24px;

  /* Находим SVG-элемент Recharts и жестко зачищаем любые рамки и контуры */
  svg {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }

  /* Зачищаем внутреннюю обводку фонового прямоугольника Recharts */
  .recharts-wrapper, 
  .recharts-surface {
    border: none !important;
    outline: none !important;
  }
`;
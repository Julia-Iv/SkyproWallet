import styled from "styled-components";

// Главный контейнер страницы (переиспользует логику отступов)
export const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 24px 40px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #111827;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr; /* Календарь уже, график шире */
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.section`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #111827;
`;

/* Стили для Календаря */
export const CalendarScroll = styled.div`
  max-height: 320px;
  overflow-y: auto;
  margin-top: 12px;
  padding-right: 4px;
`;

export const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 11px;
  color: #9ca3af;
  margin-bottom: 8px;
  position: sticky;
  top: 0;
  background: #ffffff;
`;

export const MonthTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  margin: 16px 0 8px;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

export const DayButton = styled.button`
  aspect-ratio: 1;
  border: none;
  background: ${props => props.$active ? '#6366f1' : 'none'};
  color: ${props => props.$active ? '#ffffff' : '#4b5563'};
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$active ? '#6366f1' : '#f3f4f6'};
  }
`;

/* Стили для Графика */
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

export const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 8px;
`;

export const BarValue = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #111827;
`;

export const Bar = styled.div`
  width: 48px;
  height: ${props => props.$height || '0px'};
  background-color: ${props => props.$color || '#6366f1'};
  border-radius: 8px 8px 0 0;
  transition: height 0.5s ease-out;
`;

export const BarLabel = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

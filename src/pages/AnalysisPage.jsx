import Header from "../components/Header"; 
import PeriodCalendar from "../components/PeriodCalendar";
import AnalysisChart from "./AnalysisChart";
import * as S from "./AnalysisPage.styled";

const AnalysisPages = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f5f7" }}>
      {/* Общая шапка приложения */}
      <Header />

      {/* Сетка страницы Анализа */}
      <S.Main>
        <S.Title>Анализ расходов</S.Title>
        
        <S.GridContainer>
          {/* Левая колонка — Выбор периода */}
          <PeriodCalendar />

          {/* Правая колонка — Столбчатый график */}
          <AnalysisChart />
        </S.GridContainer>
      </S.Main>
    </div>
  );
};

export default AnalysisPages;
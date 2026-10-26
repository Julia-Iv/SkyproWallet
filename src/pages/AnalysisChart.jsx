import * as S from "./AnalysisPage.styled";

const AnalysisChart = () => {
  // Тестовые данные согласно макету
  const chartData = [
     { label: "Еда", value: 3590, height: "85%", color: "#B692F6" },         
    { label: "Транспорт", value: 1835, height: "45%", color: "#FAA74A" },   
    { label: "Жилье", value: 0, height: "1%", color: "#E5E7EB" },           
    { label: "Развлечения", value: 1250, height: "32%", color: "#A4BCFD" }, 
    { label: "Образование", value: 600, height: "16%", color: "#A6EF54" },  
    { label: "Другое", value: 2306, height: "55%", color: "#FECDCA" },      
  ];
  return (
    <S.Card>
    {/* Главная сумма */}
      <S.CardTitle style={{ marginBottom: "4px" }}>9 581 ₽</S.CardTitle>
      
      {/* Подпись с датой */}
      <S.ChartSubTitle>Расходы за 10 июля 2024</S.ChartSubTitle>

      {/* Контейнер для столбцов */}
      <S.ChartBarsContainer>
        {chartData.map((item, index) => (
          <S.BarWrapper key={index}>
            <S.Bar 
              $height={item.height} 
              $color={item.color} 
              $value={item.value > 0 ? `${item.value} ₽` : "0 ₽"} 
            />
            <S.BarLabel>{item.label}</S.BarLabel>
          </S.BarWrapper>
        ))}
      </S.ChartBarsContainer>
    </S.Card>
  );
};

export default AnalysisChart;
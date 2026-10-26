import * as S from "./AnalysisPage.styled";

const AnalysisChart = () => {
  // Тестовые данные согласно макету
  const chartData = [
    { label: "Еда", value: 3590, height: "80%", color: "#c7d2fe" },
    { label: "Транспорт", value: 1835, height: "45%", color: "#fbcfe8" },
    { label: "Жилье", value: 0, height: "2%", color: "#e0e7ff" },
    { label: "Развлечения", value: 1250, height: "30%", color: "#c7d2fe" },
    { label: "Образование", value: 600, height: "15%", color: "#a7f3d0" },
    { label: "Другое", value: 2306, height: "55%", color: "#fca5a5" },
  ];

  return (
    <S.Card>
      <S.ChartHeader>
        <S.TotalAmount>9 581 ₽</S.TotalAmount>
        <S.DateRangeText>Расходы за 10 июля 2024</S.DateRangeText>
      </S.ChartHeader>

      <S.BarsContainer>
        {chartData.map((item, index) => (
          <S.BarWrapper key={index}>
            <S.BarValue>{item.value > 0 ? `${item.value} ₽` : "0 ₽"}</S.BarValue>
            <S.Bar $height={item.height} $color={item.color} />
            <S.BarLabel>{item.label}</S.BarLabel>
          </S.BarWrapper>
        ))}
      </S.BarsContainer>
    </S.Card>
  );
};

export default AnalysisChart;
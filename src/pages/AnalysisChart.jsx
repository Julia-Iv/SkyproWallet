import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LabelList,
} from "recharts";
import * as S from "./AnalysisPage.styled";

const COLORS = [
  "#c084fc", // Еда (Фиолетовый)
  "#fb923c", // Транспорт (Оранжевый)
  "#38bdf8", // Жилье (Голубой)
  "#818cf8", // Развлечения (Синий)
  "#a7f3d0", // Образование (Мятный)
  "#fca5a5", // Другое (Розовый)
];

//  рендер меток над столбцами (чтобы точно задать отступ сверху)
const CustomLabel = (props) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 12} // Расстояние над столбцом как в дизайне
      fill="#000000"
      textAnchor="middle"
      style={{ fontSize: "14px", fontWeight: "700", fontFamily: "sans-serif" }}
    >
      {`${value.toLocaleString("ru-RU")} ₽`}
    </text>
  );
};
const AnalysisChart = ({ chartData = [], totalAmount = 0, dateRange }) => {
  const formatSubDate = (dateInputValue) => {
    if (!dateInputValue) return "";
    const parsedDate =
      dateInputValue instanceof Date
        ? dateInputValue
        : new Date(dateInputValue);
    if (isNaN(parsedDate.getTime())) return "";

    return parsedDate.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const renderDateSubtitle = () => {
    if (!dateRange) return "Период не указан";
    if (dateRange.from && dateRange.to) {
      return `Расходы за период с ${formatSubDate(dateRange.from)} по ${formatSubDate(dateRange.to)}`;
    }
    return `Расходы за ${formatSubDate(dateRange.from || dateRange)}`;
  };
  return (
    <S.Card>
      {/* Главная сумма */}
      <S.CardTitle style={{ marginBottom: "4px" }}>
        {`${totalAmount.toLocaleString("ru-RU")} ₽`}
      </S.CardTitle>

      {/* Динамическая подпись с датой */}
      <S.ChartSubTitle
        style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "16px" }}
      >
        {renderDateSubtitle()}
      </S.ChartSubTitle>

      {/* Контейнер для графика Recharts */}
      <S.ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 30, right: 20, left: 20, bottom: 20 }}
            barGap={0}
            style={{ border: "none", outline: "none", boxShadow: "none" }}
          >
            {/* Скрываем ось Y, так как значения будут над столбцами */}
            <YAxis
              hide
              domain={[0, "dataMax + 4000"]}
              axisLine={{ strokeWidth: 0 }}
              tickLine={false}
            />
            {/* Ось X для подписей категорий/дней */}
            <XAxis
              dataKey="name"
              axisLine={{ strokeWidth: 0 }}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 13, fontFamily: "sans-serif" }}
              dy={15}
            />

            {/* Столбец */}
            <Bar
              dataKey="value"
              radius={[12, 12, 12, 12]} // Полностью закругленные углы (капсулы), как в макете
              maxBarSize={64} // Ширина столбца
              minPointSize={6} // Задает минимальную высоту (полоску) для значений в 0 ₽
            >
              {/* Рендерим плашки над столбцами через кастомный компонент */}
              <LabelList dataKey="value" content={<CustomLabel />} />

              {/* Индивидуальное окрашивание каждого столбца по макету */}
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </S.ChartWrapper>
    </S.Card>
  );
};

export default AnalysisChart;

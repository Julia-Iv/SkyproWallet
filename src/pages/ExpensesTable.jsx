import * as S from './ExpensesPages.styled';

function ExpensesTable({ expenses, onDeleteExpense }) {
  return (
    <S.Card>
      <S.CardTitle>Таблица расходов</S.CardTitle>
      <S.TableContainer>
        <S.Table>
          <thead>
            <tr>
              <S.Th>Описание</S.Th>
              <S.Th>Категория</S.Th>
              <S.Th>Дата</S.Th>
              <S.Th>Сумма</S.Th>
              <S.Th style={{ width: '40px' }}></S.Th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <S.Td colSpan="5" style={{ textAlign: 'center', color: '#9ca3af', padding: '24px 0' }}>
                  Список расходов пуст. Добавьте первый расход!
                </S.Td>
              </tr>
            ) : (
              expenses.map((item) => (
                <tr key={item.id}>
                  <S.Td>{item.name}</S.Td>
                  <S.Td $color="#6b7280">{item.category}</S.Td>
                  <S.Td $color="#9ca3af">{item.date}</S.Td>
                  <S.Td $bold>{item.amount}</S.Td>
                  <S.Td style={{ textAlign: 'right' }}>
                    <S.DeleteButton 
                      title="Удалить" 
                      onClick={() => onDeleteExpense(item.id)}
                    >
                      🗑️
                    </S.DeleteButton>
                  </S.Td>
                </tr>
              ))
            )}
          </tbody>
        </S.Table>
      </S.TableContainer>
    </S.Card>
  );
}

export default ExpensesTable;
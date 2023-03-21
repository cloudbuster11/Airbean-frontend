export default function OrderTotal({ orderHistory }) {
  let totalSum = orderHistory.orderHistory.reduce(function (previousValue, currentValue) {
    return {
      total: previousValue.total + currentValue.total,
    };
  });

  return (
    <>
      <p>Totalt spenderat</p>
      <p>
        {totalSum.total}
        <span> kr</span>
      </p>
    </>
  );
}

export default function OrderTotal({ orderHistory }) {
  let totalSum = orderHistory.reduce(function (previousValue, currentValue) {
    return {
      totalPrice: previousValue.totalPrice + currentValue.totalPrice,
    };
  });

  return (
    <>
      <p>Totalt spenderat</p>
      <p>
        {totalSum.totalPrice}
        <span> kr</span>
      </p>
    </>
  );
}

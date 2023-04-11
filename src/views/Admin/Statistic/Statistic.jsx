import { useState, useEffect } from 'react';
import { getMostSoldProducts, getTopRatedProducts, getTotalIncome } from '../../../helpers/api';

import './Statistic.scss';

export default function Statistic({}) {
  const [statistic, setStatistic] = useState([]);

  useEffect(() => {
    const getDetails = async () => {
      const topRated = await getTopRatedProducts();
      const mostSold = await getMostSoldProducts();
      const totalIncome = await getTotalIncome();
      setStatistic({
        topRatedProducts: topRated.data.allDocs,
        total: totalIncome.data,
        mostSoldProducts: mostSold.data.stats,
      });
    };

    getDetails();
  }, []);

  let topRatedElem;
  let mostSoldElem;
  let totalIncomeElem;

  if (statistic.topRatedProducts) {
    topRatedElem = statistic.topRatedProducts.map((product) => {
      return (
        <>
          <tr>
            <td>Title:</td>
            <td>{product.title}</td>
          </tr>
          <tr>
            <td>Pris:</td>
            <td>{product.price}</td>
          </tr>
          <tr>
            <td>Rating: </td>
            <td>{product.ratingsAverage}</td>
          </tr>
          <tr>
            <td>Antal recensioner</td>
            <td>{product.reviews.length}</td>
          </tr>
        </>
      );
    });
  }
  if (statistic.mostSoldProducts) {
    mostSoldElem = statistic.mostSoldProducts.map((product) => {
      return (
        <>
          <tr>
            <td>Title:</td>
            <td>{product.title}</td>
          </tr>

          <tr>
            <td>Antal sålda: </td>
            <td>{product.totalSold}</td>
          </tr>
        </>
      );
    });
  }
  if (statistic.total) {
    totalIncomeElem = (
      <>
        <tr>
          <td>Total:</td>
          <td>{statistic.total[0].totalIncome[0].total} kr.</td>
        </tr>
        {statistic.total[1].monthlyIncome.map((month) => {
          const monthString = ['', 'Januari', 'Februari', 'Mars', 'April'];
          return (
            <tr>
              <td>{monthString[month._id]} </td>
              <td>{month.monthTotal}</td>
            </tr>
          );
        })}
      </>
    );
  }

  return (
    <section className='tool__container'>
      <h3>Total Försäljning</h3>
      <table>
        <tbody>{totalIncomeElem && totalIncomeElem}</tbody>
      </table>

      <h3>Mest sålda produkter</h3>
      <table>
        <tbody>{mostSoldElem && mostSoldElem}</tbody>
      </table>

      <h3>Mest omtyckta produkter</h3>
      <table>
        <tbody>{topRatedElem && topRatedElem}</tbody>
      </table>
    </section>
  );
}

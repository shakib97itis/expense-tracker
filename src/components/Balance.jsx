import {useSelector} from 'react-redux';
import formatNumber from '../utils/formatNumber';

export default function Balance() {
  const {transactions} = useSelector((state) => state.transaction);

  const balance = transactions.reduce((acc, item) => {
    const {type, amount} = item;
    if (type === 'income') {
      return acc + amount;
    } else {
      return acc - amount;
    }
  }, 0);

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>&nbsp;<span>{formatNumber(balance)}</span>
      </h3>
    </div>
  );
}

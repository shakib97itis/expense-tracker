import {useDispatch, useSelector} from 'react-redux';
import Transaction from './Transaction';
import {fetchTransactionsThunk} from '../../features/transaction/transactionSlice';
import {useEffect} from 'react';

export default function Transactions() {
  const {transactions, isLoading, isError, error} = useSelector(
    (state) => state.transaction,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactionsThunk());
  }, [dispatch]);

  let content = null;

  if (isLoading) content = <p>Loading..</p>;
  if (!isLoading && isError) content = <p className="error">{error}</p>;

  if (!isLoading && !isError && transactions?.length === 0)
    content = <p>No transactions found</p>;

  if (!isLoading && !isError && transactions?.length > 0)
    content = (
      <ul>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    );

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="container_of_list_of_transactions">{content}</div>
    </>
  );
}

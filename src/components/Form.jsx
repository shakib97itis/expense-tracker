import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createTransactionThunk} from '../features/transaction/transactionSlice';

export default function Form() {
  const [name, setName] = useState('');
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');

  const dispatch = useDispatch();
  const {isLoading, isError} = useSelector((state) => state.transaction);

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(
      createTransactionThunk({
        name,
        type,
        amount,
      }),
    );
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={handleForm}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Transaction Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>

          <div className="radio_group">
            <input
              id="income"
              type="radio"
              value="income"
              name="type"
              checked={type === 'income'}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
          </div>

          <div className="radio_group">
            <input
              id="expense"
              type="radio"
              value="expense"
              name="type"
              checked={type === 'expense'}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            name="amount"
            placeholder="300"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button disabled={isLoading} type="submit" className="btn">
          Add Transaction
        </button>
      </form>

      {!isLoading && isError && <p className="error">Something went wrong</p>}

      <button type="button" className="btn cancel_edit">
        Cancel Edit
      </button>
    </div>
  );
}

// function Formm() {
//   return (
//     <div className="form">
//       <h3>Add new transaction</h3>{' '}
//       <div className="form-group">
//         <label htmlFor="name">Name</label>{' '}
//         <input type="text" name="name" placeholder="Transaction Name" />{' '}
//       </div>{' '}
//       <div className="form-group radio">
//         {' '}
//         <label htmlFor="type">Type</label>{' '}
//         <div className="radio_group">
//           {' '}
//           <input type="radio" value="income" name="type" checked />{' '}
//           <label htmlFor="type">Income</label>{' '}
//         </div>{' '}
//         <div className="radio_group">
//           {' '}
//           <input
//             type="radio"
//             value="expense"
//             name="type"
//             placeholder="Expense"
//           />{' '}
//           <label htmlFor="type">Expense</label>{' '}
//         </div>{' '}
//       </div>{' '}
//       <div className="form-group">
//         {' '}
//         <label htmlFor="amount">Amount</label>{' '}
//         <input type="number" placeholder="300" name="amount" />{' '}
//       </div>{' '}
//       <button className="btn">Add Transaction</button>{' '}
//       <button className="btn cancel_edit">Cancel Edit</button>{' '}
//     </div>
//   );
// }

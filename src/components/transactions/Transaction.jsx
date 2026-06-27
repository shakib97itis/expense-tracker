import editImage from '../../assets/edit.svg';
import deleteImage from '../../assets/delete.svg';
import {
  addEditing,
  deleteTransactionThunk,
} from '../../features/transaction/transactionSlice';
import {useDispatch} from 'react-redux';
import formatNumber from '../../utils/formatNumber';

export default function Transaction({transaction}) {
  const {id, name, type, amount} = transaction;
  const dispatch = useDispatch();

  const handleActivateEdit = () => {
    dispatch(addEditing({...transaction}));
  };

  const handleDelete = () => {
    dispatch(deleteTransactionThunk(id));
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {formatNumber(amount)}</p>
        <button onClick={handleActivateEdit} className="link">
          <img className="icon" src={editImage} />
        </button>
        <button onClick={handleDelete} className="link">
          <img className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}

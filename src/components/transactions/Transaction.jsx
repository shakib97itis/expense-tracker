import editImage from '../../assets/edit.svg';
import deleteImage from '../../assets/delete.svg';
import {addEditing} from '../../features/transaction/transactionSlice';
import {useDispatch} from 'react-redux';

export default function Transaction({transaction}) {
  const {name, type, amount} = transaction;
  const dispatch = useDispatch();

  const handleActivateEdit = () => {
    dispatch(addEditing({...transaction}));
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button onClick={handleActivateEdit} className="link">
          <img className="icon" src={editImage} />
        </button>
        <button className="link">
          <img className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}

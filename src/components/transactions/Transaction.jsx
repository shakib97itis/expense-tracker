import editImage from '../../assets/edit.svg';
import deleteImage from '../../assets/delete.svg';

export default function Transaction() {
  return (
    <li className="transaction income">
      <p>Earned this month</p>
      <div className="right">
        <p>৳ 100</p>
        <button className="link">
          <img className="icon" src={editImage} />
        </button>
        <button className="link">
          <img className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}

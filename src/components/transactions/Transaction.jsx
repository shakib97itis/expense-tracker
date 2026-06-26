import editImage from '../../assets/edit.svg';
import deleteImage from '../../assets/delete.svg';

export default function Transaction() {
  return (
    <li class="transaction income">
      <p>Earned this month</p>
      <div class="right">
        <p>৳ 100</p>
        <button class="link">
          <img class="icon" src={editImage} />
        </button>
        <button class="link">
          <img class="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}

/* eslint-disable react-hooks/set-state-in-effect */
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  createTransactionThunk,
  removeEditing,
  updateTransactionThunk,
} from '../features/transaction/transactionSlice';

const initialForm = {
  name: '',
  type: 'income',
  amount: '',
};

export default function Form() {
  const dispatch = useDispatch();

  const {isLoading, isError, editing} = useSelector(
    (state) => state.transaction,
  );

  const {id, name, type, amount} = editing;

  const [form, setForm] = useState(initialForm);

  const isEditMode = Boolean(editing.id);

  const resetForm = () => setForm(initialForm);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;
    if (!form.amount) return;

    const payload = {
      ...form,
      amount: Number(form.amount),
    };

    if (isEditMode) {
      dispatch(
        updateTransactionThunk({
          id: editing.id,
          data: payload,
        }),
      );

      dispatch(removeEditing());
    } else {
      dispatch(createTransactionThunk(payload));
    }

    resetForm();
  };

  const handleCancelEdit = () => {
    resetForm();
    dispatch(removeEditing());
  };

  useEffect(() => {
    if (!id) {
      resetForm();
      return;
    }

    setForm({
      name,
      type,
      amount,
    });
  }, [id, name, type, amount]);

  return (
    <div className="form">
      <h3>{isEditMode ? 'Edit Transaction' : 'Add New Transaction'}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="Transaction Name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>

          <div className="radio_group">
            <input
              id="income"
              type="radio"
              name="type"
              value="income"
              checked={form.type === 'income'}
              onChange={handleChange}
            />
            <label htmlFor="income">Income</label>
          </div>

          <div className="radio_group">
            <input
              id="expense"
              type="radio"
              name="type"
              value="expense"
              checked={form.type === 'expense'}
              onChange={handleChange}
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
            value={form.amount}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn" disabled={isLoading}>
          {isEditMode ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </form>

      {!isLoading && isError && <p className="error">Something went wrong</p>}

      {isEditMode && (
        <button
          type="button"
          className="btn cancel_edit"
          onClick={handleCancelEdit}
        >
          Cancel Edit
        </button>
      )}
    </div>
  );
}

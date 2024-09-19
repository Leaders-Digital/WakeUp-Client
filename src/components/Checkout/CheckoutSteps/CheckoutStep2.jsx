import { useState } from 'react';

export const CheckoutStep2 = ({ onNext, onPrev }) => {
  const [payment, setPayment] = useState('credit-card');
  return (
    <>
      {/* <!-- BEING CHECKOUT STEP TWO -->  */}
      <div className='checkout-payment checkout-form'>
        <h4>Payment Methods</h4>
    
        <div
          className={`checkout-payment__item ${payment === 'cash' && 'active'}`}
        >
          <div className='checkout-payment__item-head'>
            <label onClick={() => setPayment('cash')} className='radio-box'>
              Cash payment
              <input type='radio' checked={payment === 'cash'} name='radio' />
              <span className='checkmark'></span>
              <span className='radio-box__info'>
                <i className='icon-info'></i>
                <span className='radio-box__info-content'>
                  Aliqua nulla id aliqua minim ullamco adipisicing enim. Do sint
                  nisi velit qui. Ullamco Lorem aliquip dolor nostrud cupidatat
                  amet.
                </span>
              </span>
            </label>
          </div>
          
        </div>
        <div className='checkout-buttons'>
          <button onClick={onPrev} className='btn btn-grey btn-icon'>
            <i className='icon-arrow'></i> back
          </button>
          <button onClick={onNext} className='btn btn-icon btn-next'>
            next <i className='icon-arrow'></i>
          </button>
        </div>
      </div>
      {/* <!-- CHECKOUT STEP TWO EOF -->  */}
    </>
  );
};

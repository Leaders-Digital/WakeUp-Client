export const ContactFrom = () => {
  return (
    <>
      {/* <!-- BEGIN DISCOUNT --> */}
      <div
        className='discount discount-contacts js-img'
        style={{ backgroundImage: `url('/assets/img/discount-bg3.jpg')` }}
      >
        <div className='wrapper'>
          <div className='discount-info'>
            <span className='saint-text'>écrivez-nous</span>
            <span className='main-text'>laissez un message</span>
            <p>
              Écrivez-nous si vous avez des questions, nous vous contacterons
              certainement et trouverons une solution.
            </p>
            <form>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Entrez votre nom'
                />
              </div>
              <div className='box-field'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Entrez votre email'
                />
              </div>
              <div className='box-field box-field__textarea'>
                <textarea
                  className='form-control'
                  placeholder='Entrez votre message'
                ></textarea>
              </div>
              <button type='submit' className='btn'>
                envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- DISCOUNT EOF   --> */}
    </>
  );
};

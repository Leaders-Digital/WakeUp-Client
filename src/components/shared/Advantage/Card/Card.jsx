export const Card = ({ advantage }) => {
  const { icon, title, body } = advantage;
  
  return (
    <div className='advantages-item' style={{width:"100px"}}>
      <div className='advantages-item__icon'>
        <img src={icon} width={100} height={100} style={{objectFit:"cover"}}/>
      </div>
      <h6 style={{fontSize:"13px",textAlign:"center"}}>{title}</h6>
      {/* <p style={{fontSize:"15px"}}>{body}</p> */}
    </div>
  );
};

import productData from "data/product/product";
import { Card } from "./Card/Card";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const Wishlist = () => {
  const [orderCode, setCode] = useState("");
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const findOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}api/order/code/${orderCode}`,  // Data being sent in the body of the request
        {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_KEY, // Send the API key in the request header
          },
        }
      );

      setOrder(response.data.data);
      toast.success(response.data.message);
      setLoading(false);
      // You can set the order data to state or handle it as needed
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Toaster />
      {/* <!-- BEGIN WISHLIST --> */}
      <div className="wrapper">
        <div className="detail-block__content">
          <div
            className="box-field"
            style={{ marginTop: "50px", display: "flex", gap: "30px" }}
          >
            <input
              onChange={(e) => setCode(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Votre code de commande"
            />
            <button className="btn" onClick={findOrder}>
              Suivre Votre commande
            </button>
          </div>
        </div>
        {!loading && order.orderCode ? (
          <div style={{ marginTop: "30px" }}>
            <h3>Commande N° {order.orderCode}</h3>
            <h4>Statut de la commande: {order.statut}</h4>
          </div>
        ) : null}
      </div>
      {/* <div className='wishlist'>
        <div className='wrapper'>
          <div className='cart-table'>
            <div className='cart-table__box'>
              <div className='cart-table__row cart-table__row-head'>
                <div className='cart-table__col'>Product</div>
                <div className='cart-table__col'>Price</div>
                <div className='cart-table__col'>status</div>
                <div className='cart-table__col'>Add to cart</div>
              </div>

              {wishItems.map((wish) => (
                <Card key={wish.id} wish={wish} />
              ))}
            </div>
          </div>
          <div className='wishlist-buttons'>
            <a href='#' className='btn btn-grey'>
              clear Wishlist
            </a>
            <Link href='/shop'>
              <a className='btn'>go shopping</a>
            </Link>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          data-src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div> */}
      {/* <!-- WISHLIST EOF   --> */}
    </>
  );
};

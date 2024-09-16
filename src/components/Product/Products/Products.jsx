import { CartContext } from 'pages/_app';
import { useContext } from 'react';
import { SingleProduct } from './SingleProduct/SingleProduct';

export const Products = ({ products }) => {
  const { cart, setCart } = useContext(CartContext);
console.log("from Products",products) ;

  const handleAddToCart = (id) => {
    const newProduct = products?.find((pd) => pd.id === id);
    setCart([...cart, { ...newProduct, quantity: 1 }]);
  };
  return (
    <>
      {products.map((product) => (
        <SingleProduct
          addedInCart={Boolean(cart?.find((pd) => pd.id === product.id))}
          key={product._id}
          product={product}
          onAddToWish={(id) => console.log(id)}
          onAddToCart={handleAddToCart}
        />
      ))}
    </>
  );
};

import { useState } from "react"

function App() {

  const [ addedProducts, setAddedProducts ] = useState([]);

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 }
  ]

  function addToCart(product) {
    const isProductInCart = addedProducts.some(cartProduct => cartProduct.name === product.name);
    /* console.log("Prodotto nel carrello: ", isProductInCart) */
    if(isProductInCart) {
      console.log("Prodotto già nel carrello")
      updateProductQuantity(product);
      return;
    }
    setAddedProducts(prev => [...prev, {...product, quantity: 1}]);
  }
  
  function updateProductQuantity(product){
    setAddedProducts(prev => prev.map(cartProduct => cartProduct.name === product.name ? {...cartProduct, quantity: cartProduct.quantity + 1} : cartProduct))
  }
  
  function removeFromCart(product){
    setAddedProducts(prev => prev.filter(cartProduct => cartProduct.name !== product.name ))
  }

  const total = addedProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0)

  console.log(addedProducts)

  return (
    <>
      <h1>Lista dei prodotti</h1>
      <ul>
        {
          products.map((product, index) => (
            <li key={index}>
              <h2>Prodotto {index + 1}</h2>
              <p>Nome: {product.name}</p>
              <p>Prezzo: {product.price.toFixed(2)} €</p>
              <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
            </li>
          ))
        }
      </ul>

      {
        addedProducts.length > 0 && (
          <>
            <h2>Carrello</h2>
            {
              addedProducts.map((cartProduct, index) => (
                <>
                  <p key={index}>{cartProduct.name} - {cartProduct.price.toFixed(2)} € - x{cartProduct.quantity}</p>
                  <button onClick={() => removeFromCart(cartProduct)}>Rimuovi dal carrello</button>
                </>
              ))
            }
            <h2>Totale da pagare</h2>
            <p>{total.toFixed(2)} €</p>
          </>
        )
      }

    </>
  )
}

export default App

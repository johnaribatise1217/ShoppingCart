import React from 'react'
import { CartState } from '../Context/AppContext'
import Filters from './Filters'
import { Button, Card } from 'react-bootstrap'
import Rating from './Rating'

const Home = () => {
  const {state : {products}, filterState : {byStock, byFastDelivery,sort, byRating, searchQuery}} = CartState()

  const transformProducts = () => {
    let sortedProducts = products
    if(sort){
        sortedProducts = sortedProducts.sort((a,b) => (
            sort === "LowToHigh" ? a.price - b.price : b.price - a.price
        ))
    }

    if(!byStock) {
        sortedProducts = sortedProducts.filter((prod) => prod.inStock)
    }

    if(byFastDelivery){
        sortedProducts = sortedProducts.filter((product)=> product.fastDelivery)
    }

    if(byRating) {
        sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating)
    }

    if(searchQuery){
        sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return sortedProducts
  }
  
  return (
    <div className='home'>
      <Filters/>
      <div className="product-con">
        {transformProducts().map((product) => {
            return <Product product={product} key={product.id}/>
        })}
      </div>
    </div>
  )
}

const Product = ({product}) => {
    const {state : {cart}, dispatch} = CartState()
    return (
        <div className='products'>
            <Card>
                <Card.Img variant='top' src={product.image} alt={product.name}/>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle style={{paddingBottom : 10}}>
                        <span>$ {product.price.split(".")[0]}</span>
                        {product.fastDelivery ? (
                            <div>Fast Delivery</div>
                        ) : (
                            <div>4 days delivery</div>
                        )}
                        <Rating rating={product.ratings}/>
                    </Card.Subtitle>
                    <div style={{display: "flex", width : "95%", height : 70, gap : 3}}>
                        {cart.some((item) => item.id === product.id) 
                        ? 
                        (
                            <Button
                            onClick={() => {
                                dispatch({
                                    type : "REMOVE FROM CART",
                                    payload : product
                                })
                            }}
                            variant='danger'>Remove From cart</Button>
                        ) 
                            :
                        (
                            <Button
                            onClick={() => {
                                dispatch({
                                    type : "ADD TO CART",
                                    payload : product
                                })
                            }}
                            disabled={!product.inStock}>
                            {!product.inStock ? "Out of Stock" : "Add to Cart"}
                        </Button>
                        )
                        }
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Home

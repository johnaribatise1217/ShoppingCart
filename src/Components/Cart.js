import React, {useState, useEffect} from 'react'
import { CartState } from '../Context/AppContext'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import Rating from './Rating'
import { AiFillDelete } from 'react-icons/ai'

const Cart = () => {
  const {state : {cart}, dispatch} = CartState()

  const [total, setTotal] = useState()

  useEffect(() => {
    setTotal(cart.reduce((acc,current) => acc + Number(current.price) * current.qty,0))
  }, [cart])  

  return (
    <div className='home'>
      <div className="product-con">
        {cart.length === 0 ? 
          (
            <h3>Oopps!,Cart Is Empty.</h3>
          ) : (
            <>
              <ListGroup>
                {
                  cart.map(prod => (
                    <ListGroup.Item key={prod.id}>
                      <Row>
                        <Col md={2}>
                          <Image src={prod.image} alt={prod.name} fluid rounded/>
                        </Col>
                        <Col md={2}>
                          <span>{prod.name}</span>
                        </Col>
                        <Col md={2}>
                          <span>$ {prod.price}</span>
                        </Col>
                        <Col md={2}>
                          <Rating rating={prod.ratings}/>
                        </Col>
                        <Col md={2}>
                          <Form.Control as="select" value={prod.qty}
                            onChange={(e) => 
                              dispatch({
                                type : "CHANGE CART QUANTITY",
                                payload : {
                                  id : prod.id,
                                  qty : e.target.value
                                }
                              })
                            }
                          >
                            {[...Array(prod.inStock).keys()].map((x) => (
                              <option key={x+1}>{x+1}</option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button
                            type='button'
                            variant='light'
                            onClick={() => 
                              dispatch({
                                type :"REMOVE FROM CART",
                                payload : prod
                              })
                            }
                          >
                            <AiFillDelete fontSize="23px"/>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
            </>
          )
        }
      </div>
      <div className="filters summary">
        <span className='title'>Subtotal ({cart.length}) items</span>
        <span style={{fontWeight : 700, fontSize : 20}}>Total: ${total}</span>
        <Button type='button' disabled={cart.length === 0}>Proceed to Checkout</Button>
      </div>
    </div>
  )
}

export default Cart

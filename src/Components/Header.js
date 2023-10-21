import React from 'react'
import { Navbar, Container, FormControl, Dropdown, Badge,Nav, Button } from 'react-bootstrap'
import {FaShoppingCart} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CartState } from '../Context/AppContext'
import { AiFillDelete } from 'react-icons/ai'

const style = {
    NavStyle : {
        backgroundColor : "#002D62",
        height : 65,
        position: 'fixed',
        top : 0,
        left : 0,
        zIndex : 90,
        width : '100vw',
    },
    Form : {
        width : 450,
    },
    cartIcon : {
        color : "white",
        fontSize : "25px"
    }, 
    Button : {
        width : "95%",
        margin : "0 10px"
    }
}

const Header = () => {
  const {state: {cart}, dispatch, filterDispatch} = CartState()
  return (
    <Navbar style={style.NavStyle} variant='dark'>
        <Container>
            <Navbar.Brand>
                <Link to="/" style={{fontSize : 30, fontWeight : "bold"}}>Shopping Cart</Link>
            </Navbar.Brand>
            <Navbar.Text className='search'>
                <FormControl style={style.Form} placeholder='Search for a Product' className='m-auto'
                onChange={(e) => 
                    filterDispatch({
                        type : "FILTER BY SEARCH",
                        payload : e.target.value
                    })
                }
                />
            </Navbar.Text>
            <Nav>
                <Dropdown alignRight>
                    <Dropdown.Toggle variant='success'>
                        <Link to="/cart">
                            <FaShoppingCart style={style.cartIcon}/>
                        </Link>
                        <Badge style={{marginLeft : 10}}>{cart.length}</Badge>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{
                        minWidth : 370
                    }}>
                        {cart.length > 0 ? 
                            (
                            <>
                                {
                                    cart.map((item) => (
                                        <span className="cartItem" key={item.id}>
                                            <img src={item.image} alt={item.name} className="cartImg" />
                                            <div className="cartItemDetail">
                                                <span>{item.name}</span>
                                                <span>$ {item.price.split(".")[0]}</span>
                                            </div>
                                            <AiFillDelete
                                                fontSize="20px"
                                                style={{cursor : "pointer"}}
                                                onClick={() => 
                                                    dispatch({
                                                        type : "REMOVE FROM CART",
                                                        payload : item
                                                    })
                                                }
                                            />
                                        </span>
                                    ))
                                }
                                <Link to="/cart">
                                    <Button style={style.Button}>Go To Cart</Button>
                                </Link>
                            </>
                            ) : (
                                <span style={{padding : 10}}>Cart is Empty</span>
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default Header

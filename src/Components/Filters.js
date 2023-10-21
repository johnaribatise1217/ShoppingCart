import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Rating from './Rating'
import { CartState } from '../Context/AppContext'

const Filters = () => {
  const {filterState : {byStock, byFastDelivery,sort, byRating}, filterDispatch} = CartState()

  return (
    <div className='filters'>
        <span className="title">Filter Products</span>
        <span>
            <Form.Check inline label="Ascending" name='group1' type='radio' id={`inline-1`}
            onChange={() => 
                filterDispatch({
                    type : "SORT BY PRICE",
                    payload : "LowToHigh"
                })
            }
            checked={sort === "LowToHigh" ? true : false}
            />
        </span>
        <span>
            <Form.Check inline label="Descending" name='group1' type='radio' id={`inline-2`}
            onChange={() => 
                filterDispatch({
                    type : "SORT BY PRICE",
                    payload : "HighToLow"
                })
            }
            checked={sort === "HighToLow" ? true : false}
            />
        </span>
        <span>
            <Form.Check inline label="Include Out of Stock" name='group1' type='checkbox' id={`inline-3`}
            onChange={() => 
                filterDispatch({
                    type : "FILTER BY STOCK",
                })
            }
            checked={byStock}
            />
        </span>
        <span>
            <Form.Check inline label="Fast Delivery Only" name='group1' type='checkbox' id={`inline-4`}
            onChange={() => 
                filterDispatch({
                    type : "FILTER BY FASTDELIVERY"
                })
            }
            checked={byFastDelivery}
            />
        </span>
        <span>
            <label style={{paddingRight : 12}}>Rating: </label>
            <Rating rating={byRating} 
            onClick={(i) => 
                filterDispatch({
                    type : "FILTER BY RATING",
                    payload : i + 1
                })
            } style={{cursor : "pointer"}}/>
        </span>
        <Button variant='light'
        onClick={() => 
            filterDispatch({
                type : "CLEAR FILTERS"
            })
        }
        >Clear Filters</Button>
    </div>
  )
}

export default Filters

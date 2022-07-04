import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FC} from 'react'
import { Button, Card } from 'react-bootstrap';
import { idText } from 'typescript';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';

interface StoreCardProps {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

const StoreCard:FC<StoreCardProps> = ({id, name, price, imgUrl}) => {
    const { 
        getItemsQuantity, 
        increaseItemsQuantity, 
        decreaseItemsQuantity, 
        removeItemsQuantity } = useShoppingCart()

    const quantity = getItemsQuantity(id);
    
    
    return (
        <Card className="h-100">
            <Card.Img 
            variant="top" 
            src={imgUrl} 
            height="300px" 
            style={{objectFit: 'cover'}} />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className='fs-2'>{name}</span>
                    <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
                </Card.Title>
                <div className='mt-auto'>
                    {quantity === 0 ? 
                        <Button onClick={() => increaseItemsQuantity(id)} className="w-100">
                            <FontAwesomeIcon icon={faPlus} size='xs'/>
                            Add to cart
                        </Button>
                        : 
                        <div className='d-flex flex-column align-items-center' style={{gap: '1rem'}}>
                            <div className='d-flex justify-content-center align-items-center' style={{gap: '.5rem'}}>
                                <Button onClick={() => decreaseItemsQuantity(id)}>-</Button>
                                <div>
                                    <span className='fs-2'>{quantity} </span>
                                    in cart
                                </div>
                                
                                <Button onClick={() => increaseItemsQuantity(id)}>+</Button>
                            </div>
                            <Button onClick={() => removeItemsQuantity(id)} variant='danger' size='sm'>Remove</Button>

                        </div>
                    }
                    
                </div>
            </Card.Body>
        </Card>
    )
}

StoreCard.defaultProps = {

}

export default StoreCard;
import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import items from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
    id: number,
    quantity: number
}

const CartItem = ({id, quantity}:CartItemProps) => {
    const { removeItemsQuantity } = useShoppingCart()
    const item = items.find(item => item.id === id)
    if (item == null) return null

    return (
        <Stack gap={2} direction='horizontal' className='d-flex align-items-center'>
            <img 
                alt={'cart item'}
                src={item.imgUrl} 
                style={{
                    width: 125,
                    height: 75,
                    objectFit: 'cover'
                }}
            />
            <div className="me-auto">
                <div>
                    {item.name} {" "}
                    {quantity > 1 && <span 
                            style={{fontSize: '.7rem'}}
                            className='text-muted'>x{quantity}</span>}
                </div>
                <div style={{fontSize: '.65rem'}} className='text-muted'>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div className="text-muted" style={{fontSize: '.8rem'}}>
                    {formatCurrency(item.price * quantity)}
                </div>
            <Button 
                variant="outline-danger" 
                onClick={() =>removeItemsQuantity(item.id)} 
                size='sm'>&times;</Button>
        </Stack>
    )
}
export default CartItem;
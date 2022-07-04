import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import {faBasketShopping} from '@fortawesome/free-solid-svg-icons'
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
    const {cartQuantity, openCart} = useShoppingCart()

    return (
        <NavbarBs className="bg-white shadow-sm mb-3" sticky="top">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to={'/'} as={NavLink}>Home</Nav.Link>
                    <Nav.Link to={'/store'} as={NavLink}>Store</Nav.Link>
                    <Nav.Link to={'/about'} as={NavLink}>About</Nav.Link>
                </Nav>
                {
                    cartQuantity ?
                        <Button onClick={openCart} variant="outline-primary" 
                        style={{position: 'relative'}}
                        >
                        <FontAwesomeIcon icon={faBasketShopping} />
                        <div className='bg-danger rounded-circle d-flex justify-content-center align-items-center' style={{
                            position: 'absolute',
                            display: 'inline-block',
                            width: 20,
                            height: 20,
                            color: '#fff',
                            bottom: 0,
                            right: 0,
                            fontSize: '0.8rem',
                            transform: "translate(25%, 25%)"
                        }}>{cartQuantity}</div>
                    </Button>
                :null
                }
            </Container>
        </NavbarBs>
    )
}
export default Navbar;
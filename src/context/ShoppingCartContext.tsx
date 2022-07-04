import { type } from "os"
import React, { createContext, ReactNode, useContext, useState } from "react"
import Cart from "../components/Cart"
import { UseLocalStorage } from "../hooks/UseLocalStorage"

type ShoppingCartProviderTypes = {
    children: ReactNode
}

type CartItemTypes = {
    id: number,
    quantity: number
}
type ShoppingCartContextTypes = {
    openCart: () => void,
    closeCart: () => void,
    cartQuantity: number,
    cartItems: CartItemTypes[],
    getItemsQuantity: (id: number) => number,
    increaseItemsQuantity: (id: number) => void,
    decreaseItemsQuantity: (id: number) => void,
    removeItemsQuantity: (id: number) => void,
}

let ShoppingCartContext = createContext({} as ShoppingCartContextTypes)

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}

export const ShoppingCartContextProvider = ({ children }: ShoppingCartProviderTypes) => {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = UseLocalStorage<CartItemTypes[]>("shopping-cart", [])

    
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    const getItemsQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    const increaseItemsQuantity = (id: number) => {
        setCartItems(currItems => {
            if (cartItems.find(item => item.id === id) == null) {
                return [...currItems, {id: id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {id: item.id, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const decreaseItemsQuantity = (id: number) => {
        setCartItems(currItems => {
            if (cartItems.find(item => item.id === id)?.quantity === 1) {
                return cartItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {id: item.id, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const removeItemsQuantity = (id: number) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }


    return (
        <ShoppingCartContext.Provider value={{ 
            getItemsQuantity, 
            increaseItemsQuantity, 
            decreaseItemsQuantity, 
            removeItemsQuantity,
            openCart,
            closeCart,
            cartItems,
            cartQuantity,
            }}>
            {children}
            <Cart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}
import { Row, Col } from "react-bootstrap"
import StoreCard from "../components/StoreCard";
import items from "../data/items.json"

const Store = () => {
    return (
        <>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {items.map(item => (
                    <Col key={item.id}>
                        <StoreCard {...item}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Store;
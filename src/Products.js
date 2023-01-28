import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {Button, Container, Row, Col, Card, CardTitle, CardSubtitle, CardText, CardBody} from "reactstrap";

// Component which handles the all-products-list page
function Products(){
    
    // URL of the mock-api
    const url = "https://63cf64bce52f5878299e2b45.mockapi.io/products/";
    
    const navigate = useNavigate();

    // Defining initial state for the details of all-products
    const [allProductsDetails, setAllProductsDetails] = useState([]);

    // Function to get the details of all-products
    const getAllProductsDetails = async () => {
        await axios.get(url)
        .then(res=>{setAllProductsDetails(res.data)});
    }

    // Using useEffect to call the above function whenever the state changes
    useEffect(()=>{
        getAllProductsDetails();
        // eslint-disable-next-line
    },[]);

    // Function to delete a product
    const handleDeleteProduct = async (productId) => {
        await axios.delete(url+productId)
        .then(res=>getAllProductsDetails());
    }


    // Returning data that needs to be shown on the web-page
    return (
        <Container className="main-container">

            {/* Button to add a new product */}
            <Button color="primary" onClick={()=>navigate("/add-product")}>Add product</Button>
            <br />
            <br />

            <Row className="products-main-container">

                {/* Mapping through the details of all-products */}
                {allProductsDetails.map((item)=>{
                    return <Col className="each-card-col" key={item.id}>
                            <Card className="each-card" style={{ width: '18rem' }}>
                                <CardBody>
                                <CardTitle tag="h5"> {item.title} </CardTitle>
                                <CardSubtitle className="mb-2 text-muted" tag="h6" >
                                    $ {item.price}
                                </CardSubtitle>
                                </CardBody>
                                    <img alt="Card cap" src={item.image} width="100%" height="200px" />
                                <CardBody>
                                    <CardText className="card-text">
                                        <span>Rating:<b>{" " +item.rating}</b></span> <span>Brand: <b>{" "+item.brand}</b></span>
                                    </CardText>
                                    <CardText>
                                        Stock: <b>{" " + item.stock}</b>
                                    </CardText>
                                    <CardText>
                                        {item.description}
                                    </CardText>
                                </CardBody>
                                <CardBody>

                                    {/* Button to view (read) the product details */}
                                    <Button color="info" className="action-buttons" onClick={()=>navigate("/view-product/"+item.id +"/"+true)} style={{fontSize:"small"}} >View</Button>

                                    {/* Button to edit (update) the product details */}
                                    <Button color="warning" className="action-buttons" onClick={()=>navigate("/edit-product/"+item.id)} style={{fontSize:"small"}} >Edit</Button>

                                    {/* Button to delete the product details */}
                                    <Button color="danger" className="action-buttons" onClick={()=>handleDeleteProduct(item.id)} style={{fontSize:"small"}} >Delete</Button>
                                </CardBody>
                            </Card>
                    </Col>
                })}
            </Row>
        </Container>
    );
}
export default Products;



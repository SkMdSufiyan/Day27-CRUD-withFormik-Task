import {Container, Form, FormGroup, Label, Input, Button, FormFeedback} from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import axios from "axios";


// Component which handles the add (create), view (read), edit (update) product
function ActionProduct(){

    // URL of the mock-api
    const url = "https://63cf64bce52f5878299e2b45.mockapi.io/products/";

    // Getting the params from the Products.js component (all-products-list page)
    const {id, toView} = useParams();
    const navigate = useNavigate();

    // Empty form data, that will be used to set the initial state of "productFormData" below
    const emptyProductFormData = {
        "title": "",
        "description": "",
        "price":"",
        "discountPercentage": "",
        "rating": "",
        "stock": "",
        "brand": "",
        "category": "",
        "image": ""
       };

    //    Setting the initial state for "productFormData"
       const [productFormData, setProductFormData] = useState(emptyProductFormData);

    //    Function to populate the form
       const fillProductForm = async (productId) => {
        if(productId){
            // For editing (updating) a product
            await axios.get(url+productId)
            .then(res=>setProductFormData(res.data));
        }else{
            // For adding (creating) a new product
            setProductFormData(emptyProductFormData);
        }
       };


    //    Setting initial state for "allProductsDetails" in this component
       const [allProductsDetails, setAllProductsDetails] = useState([]);
       const getAllProductsDetails = async () => {
            await axios.get(url)
            .then(res=>{setAllProductsDetails(res.data)});
        }

    //    Using useEffect to execute the required functions whenever the state changes
       useEffect(()=>{
        getAllProductsDetails();
        fillProductForm(id);
        // eslint-disable-next-line
       },[]);
   

    //    Defining formik using "useFormik" hook
       const formik = useFormik({
        initialValues:productFormData,
        onSubmit: async (values)=>{
            if(id){
                await axios.put(url+id, values)
                .then(res=>{navigate("/")});
            }else{
                await axios.post(url, values)
                .then(res=>{navigate("/")});
            }
        },
        enableReinitialize:true,
        validate: async (values) => {
            const errors = {};

            // Error validation for product title
            if(!values.title){
                errors.title="Title is required";
            }else if(!id){
                let allProductsTitles = allProductsDetails.map(val=>val.title);
                if(allProductsTitles.includes(values.title)){
                    errors.title = "Title already exists";
                }
            };

            // Error validation for product price
            if(!values.price){
                errors.price = "Price is required";
            }else if(isNaN(values.price)){
                errors.price = "Provide a number";
            }

            // Error validation for product discount percentage
            if(!values.discountPercentage){
                errors.discountPercentage = "Discount percentage is required";
            }else if(isNaN(values.discountPercentage) || Number(values.discountPercentage)>100){
                errors.discountPercentage = "Provide a number (0-100)";
            }

            // Error validation for product rating
            if(isNaN(values.rating) || Number(values.rating)>5 ){
                errors.rating = "Provide a number (0-5)";
            }

            // Error validation for product stock
            if(!values.stock){
                errors.stock = "Stock is required";
            }else if(isNaN(values.stock)){
                errors.stock = "Provide a number";
            }

            // Error validation for product brand
            if(!values.brand){
                errors.brand = "Brand is required";
            }

            // Error validation for product category
            if(!values.category){
                errors.category = "Category is required";
            }

            // Error validation for product image link
            if(!values.image){
                errors.image = "Image-Link is required";
            }else if(!/\.(jpg|jpeg|png|webp|avif|gif)$/.test(values.image)){
                errors.image = "Provide a valid image link";
            }
            return errors;
        }
       });
 

    //    "toDisableAllFields" is used to disable all the form fields when it is view-product page
    let toDisableAllFields = false;
    if(toView){
        toDisableAllFields = true;
    }


    return <Container className="main-container">
        <h6> { id && toView ? "View-product page" : id? "Edit-product page" : "Add-product page"}</h6>
        <br />
        {/* When it is view-product page then the "To products page" button will be shown */}
        {toView? 
            (<Button color="primary" onClick={()=>navigate("/") }>To products page</Button>) 
        : ""}
        <br />
        <br />

        <Form>

            <FormGroup>

                {/* Form filed for product title */}
                <Label for="title" className="form-labels" >Title</Label>
                <Input name="title" placeholder="Title" value={formik.values.title} onChange={formik.handleChange} disabled={toDisableAllFields} invalid={formik.errors.title? true : false} />

                {/* Error message for product title */}
                {formik.errors.title ? (<FormFeedback>{formik.errors.title}</FormFeedback>) : ("")}


                {/* Form filed for product price */}
                <Label for="price" className="form-labels" >Price (in $)</Label>
                <Input name="price" placeholder="Price" value={formik.values.price} onChange={formik.handleChange} disabled={toDisableAllFields} invalid={formik.errors.price? true : undefined} />

                {/* Error message for product price */}
                {formik.errors.price? <FormFeedback>{formik.errors.price}</FormFeedback> : ""}


                {/* Form filed for product dicount percentage */}
                <Label for="discountPercentage" className="form-labels" >Discount Percentage (for no discount give 0)</Label>
                <Input name="discountPercentage" placeholder="Discount percentage" value={formik.values.discountPercentage} onChange={formik.handleChange} disabled={toDisableAllFields} invalid={formik.errors.discountPercentage? true : undefined} />

                {/* Error message for product discount percentage */}
                {formik.errors.discountPercentage ? <FormFeedback>{formik.errors.discountPercentage}</FormFeedback> : ""}


                {/* Form filed for product rating */}
                <Label for="rating" className="form-labels" >Rating</Label>
                <Input name="rating" placeholder="Rating" value={formik.values.rating} onChange={formik.handleChange} disabled={toDisableAllFields} invalid={formik.errors.rating? true : undefined} />

                {/* Error message for product rating */}
                {formik.errors.rating? <FormFeedback>{formik.errors.rating}</FormFeedback> : "" }


                {/* Form filed for product stock */}
                <Label for="stock" className="form-labels" >Stock</Label>
                <Input name="stock" placeholder="Stock" value={formik.values.stock} onChange={formik.handleChange} disabled={toDisableAllFields} invalid={formik.errors.stock ? true : undefined} />

                {/* Error message for product stock */}
                {formik.errors.stock ? <FormFeedback>{formik.errors.stock}</FormFeedback> : ""}


                {/* Form filed for product brand */}
                <Label for="brand" className="form-labels" >Brand</Label>
                <Input name="brand" placeholder="Brand" value={formik.values.brand} onChange={formik.handleChange} disabled={toDisableAllFields} invalid={formik.errors.brand? true : undefined} />

                {/* Error message for product brand */}
                {formik.errors.brand? <FormFeedback>{formik.errors.brand}</FormFeedback> : ""}


                {/* Form filed for product category */}
                <Label for="category" className="form-labels" >Category</Label>
                <p>(Provide category in lowercase letters)</p>
                <Input name="category" placeholder="Category" value={formik.values.category} onChange={formik.handleChange} disabled={toDisableAllFields} invalid={formik.errors.category ? true : undefined} />

                {/* Error message for product category */}
                {formik.errors.category? <FormFeedback>{formik.errors.category}</FormFeedback> : ""}


                {/* Form filed for product image link */}
                <Label for="image" className="form-labels" >Image-Link</Label>
                <p>(Provide a valid link of the product's image)</p>
                <Input name="image" placeholder="Image Link" value={formik.values.image} onChange={formik.handleChange} disabled={toDisableAllFields} invalid={formik.errors.image? true : undefined} />

                {/* Error message for product image link */}
                {formik.errors.image? <FormFeedback>{formik.errors.image}</FormFeedback> : ""}


                {/* Form filed for product description */}
                <Label for="description" className="form-labels" >Description</Label>
                <textarea className="text-area" name="description" placeholder="Description" value={formik.values.description} onChange={formik.handleChange} disabled={toDisableAllFields} />
                
            </FormGroup>
            

            {toView?""
            :
            (<>
            {/* Buttons to cancel and submit or update (when adding or editing product) */}
                <Button className="main-buttons" color="warning" onClick={()=>navigate("/") }>Cancel</Button>
                <Button className="main-buttons" color="success" onClick={ ()=>formik.handleSubmit(id) }>{id? "Update" : "Submit"}</Button>
            </>)
            }

        </Form>

    </Container>
}
export default ActionProduct;



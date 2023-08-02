import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { MDBCol } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';


function Product() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token")
    let userId;
    if (token) {
        const { user } = jwtDecode(token)
        userId = user.id
    }

    const [data, setData] = useState([])
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [mfg, setMfg] = useState('');
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [searchcategory, setSearchcategory] = useState('')
    const [deleted, setDeleted] = useState(false)
    const [count, setCount] = useState(0)
    const [ownerId, setownerId] = useState(0)
    const [ProductId, setProductId] = useState(0)
    const [productCount, setproductCount] = useState(0)

    console.log("object", userId);

    const productAdd = async (event) => {

        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/add', { name, price, mfg, category, userId })

            // if (res.data.success === true) {
            setName(res.data.name)
            setPrice(res.data.price)
            setMfg(res.data.mfg)
            setCategory(res.data.category)
            // fetchInfo();

            toast.success('Product Added!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            // }
            fetchInfo();

        } catch (error) {
            console.log(error);
        }
    }

    const fetchInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/get?userId=${userId}`);
            console.log(response.data);
            setData(response.data.data);
        } catch (err) {
            return console.log(err);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, []);


    useEffect(() => {
        const searchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/search?name=${search.toLowerCase()}&userId=${userId}`);
                setData(res.data.products)
            } catch (error) {
                console.log(error)
            }
        }
        searchProduct()
    }, [search])




    useEffect(() => {
        const searchCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/searchcategory?category=${searchcategory.toLowerCase()}&userId=${userId}`);
                setData(res.data.products)
            } catch (error) {
                console.log(error)
            }
        }
        searchCategory()
    }, [searchcategory])


    const deleteProduct = async (dataObj) => {
        try {
            const res = await axios.delete(`http://localhost:5000/deleted?productId=${dataObj.id}`);

            setDeleted(res.data.products === true)

            toast.success('Product Deleted', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            fetchInfo();

        } catch (error) {
            console.log(error)
        }
    }

    const addCart = (productId) => {
        try {

            axios.post('http://localhost:5000/carts', { ownerId: userId, ProductId: productId, productCount: count })
                .then(res => {
                    console.log("Cart response: ", res.data)

                    toast.success('Product Added on Cart!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                })

            fetchInfo();

            setownerId('')
            setProductId('')
            setproductCount('')


            navigate('/carts')


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className=" p-3 bg-secondary" onSubmit={productAdd}>
                <Row className="mb-3">
                    <Form.Group controlId="formBasicEmail" className="col col-sm-3">
                        <Form.Label >Product Name</Form.Label>
                        <Form.Control type="name" placeholder="Product Name" name="name" onChange={e => setName(e.target.value)} className="form-control" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className="col col-sm-2">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control type="number" placeholder="Price" name="price" onChange={e => setPrice(e.target.value)} className="form-control" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className="col col-sm-2">
                        <Form.Label>Manufacturing</Form.Label>
                        <Form.Control type="date" name="date" onChange={e => setMfg(e.target.value)} className="form-control" />
                    </Form.Group>


                    <Form.Group controlId="formGridCheckbox" className="col col-sm-2">
                        <Form.Label>Category</Form.Label>
                        <Form.Select defaultValue="Choose" className="form-control" name="menu" onChange={e => setCategory(e.target.value)}>
                            <option value="Choose">Choose</option>
                            <option value="Home appliances">Home appliances</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Medical">Medical</option>
                            <option value="Soft drinks">Soft drinks</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Serums">Serums</option>
                            <option value="Sports">Sports</option>
                        </Form.Select>
                    </Form.Group>
                    <button type="submit" class="btn btn-success col-sm-2">Add</button>
                </Row>
            </form>

            <div className="App">

                <MDBCol className=" p-4 bg-danger">
                    <p>Search By Product Name</p>
                    <input className="form-control" type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search} aria-label="Search" />
                    <button type="button" className="btn btn-success " onClick={(e) => setSearch("")}>Clear</button>
                </MDBCol>

                <h2 class="mb-0 p-3 bg-dark text-white">FUNCTION BASED</h2>

                <MDBCol className=" p-4 bg-danger">
                    <p>Search By Product Category</p>
                    <input className="form-control" type="text" placeholder="Search" onChange={(e) => setSearchcategory(e.target.value)} value={searchcategory} aria-label="Search" />
                    <button type="button" className="btn btn-success " onClick={(e) => setSearchcategory("")}>Clear</button>
                </MDBCol>  &nbsp;



                {/* <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th class="p-3 mb-2 bg-info text-white">Product Name</th>
                            <th class="p-3 mb-2 bg-info text-white">Product Price</th>
                            <th class="p-3 mb-2 bg-info text-white">Product Manufacturing</th>
                            <th class="p-3 mb-2 bg-info text-white">Product Category</th>
                            <th class="p-3 mb-2 bg-info text-white">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            data.length > 0 && data.map((dataObj, index) => (
                                <tr>
                                    <td class="p-3 mb-2 bg-warning text-dark">{dataObj.name}</td>
                                    <td class="p-3 mb-2 bg-warning text-dark">{dataObj.price}</td>
                                    <td class="p-3 mb-2 bg-warning text-dark">{dataObj.mfg}</td>
                                    <td class="p-3 mb-2 bg-warning text-dark"> {dataObj.category}</td>
                                    <button class="btn btn-success" onClick={() => deleteProduct(dataObj)}>Delete</button> 
                                    <Form.Select defaultValue="Choose" className="form-control" name="menu"  onChange={(e) => setCount(e.target.value)}>
                                        <option value="Choose">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                    </Form.Select>
                                    <button class="btn btn-success" onClick={() => {addCart(dataObj.id)}}>ADD TO CART</button>

                                </tr>

                            ))
                        }
                    </tbody>
                </Table> */}


                <div className="row">
                    {
                        data.length > 0 && data.map((dataObj, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <Card>
                                    <Card.Header className="bg-info text-white">{dataObj.name}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Price: {dataObj.price}</Card.Title>
                                        <Card.Text> Manufacturing: {dataObj.mfg}
                                            <br /> 
                                            Category: {dataObj.category}
                                        </Card.Text> 
                                        <Button variant="success" onClick={() => deleteProduct(dataObj)}>Delete</Button>
                                        <Form.Select defaultValue="Choose" className="form-control mt-2" name="menu" onChange={(e) => setCount(e.target.value)}>
                                            <option value="Choose">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                        </Form.Select>
                                        <Button variant="success" className="mt-2" onClick={() => addCart(dataObj.id)}>ADD TO CART</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    }
                </div>


            </div>
        </>
    )
}

export default Product;
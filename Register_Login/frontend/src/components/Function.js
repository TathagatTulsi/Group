import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { MDBCol } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';


function Function() {
    const [data, setData] = useState([])
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [mfg, setMfg] = useState('');
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [searchcategory, setSearchcategory] = useState('')
    const [deleted, setDeleted] = useState(false)

    const productAdd = (event) => {

        event.preventDefault();
        axios.post('http://localhost:5000/api/add', { name, price, mfg, category })
            .then(res => {
                console.log(res)
                fetchInfo();
            })
            .catch(err => console.log(err));
    }

    const fetchInfo = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/get");
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
                const res = await axios.get(`http://localhost:5000/api/search?name=${search.toLowerCase()}`);
                setData(res.data.products)
            } catch (error) {
                console.log(error)
            }
        }
        searchProduct()
    }, [search])

    useEffect(() =>{
        const deleteProduct = async () =>{
            try {
                const res = await axios.delete(`http://localhost:5000/api/deleted?id=${deleted}`);
                setDeleted(true)
            } catch (error) {
                console.log(error)
            }
        }
        deleteProduct()
    }, [deleted])


    useEffect(() => {
        const searchCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/searchcategory?category=${searchcategory.toLowerCase()}`);
                setData(res.data.products)
            } catch (error) {
                console.log(error)
            }
        }
        searchCategory()
    }, [searchcategory])


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
                </MDBCol>
                


                    <Table striped bordered hover>
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
                                        <button type="submit" class="btn btn-success" onClick={e => setDeleted(e.target.value)}>Delete</button>
                                    </tr>
                                    
                                ))
                            }
                        </tbody>
                    </Table>
            </div>
        </>
    )
}

export default Function;
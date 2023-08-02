import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// const Register = () => {
//     const [name, setName] = useState('');
//     const [lastname, setLastname] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confPassword, setConfPassword] = useState('');
//     const [msg, setMsg] = useState('');
//     const navigate = useNavigate();

//     const Register = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:5000/register', {
//                 name: name,
//                 lastname: lastname,
//                 email: email,
//                 password: password,
//                 confPassword: confPassword
//             });

//             if (res.data.success === true) {
                
//                 toast.success('Successfully Register!', {
//                     position: "top-center",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 });

//                 localStorage.setItem("token", res.data.token);
//                 navigate("/")
//             }
//         } catch (error) {
//             if (error.response) {
//                 setMsg(error.response.data.msg);
//                 toast.error('Fill Details!', {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "dark",
//                 });
//             }
//         }
//     }

//     return (
//         <section className="hero has-background-grey-light is-fullheight is-fullwidth">
//             <div className="hero-body">
//                 <div className="container">
//                     <div className="columns is-centered">
//                         <div className="column is-4-desktop">
//                             <form onSubmit={Register} className="box">
//                                 <p className="has-text-centered">{msg}</p>
//                                 <div className="field mt-5">
//                                     <label className="label">Name</label>
//                                     <div className="controls">
//                                         <input type="text" className="input" placeholder="Name"
//                                             value={name} onChange={(e) => setName(e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="label">Last Name</label>
//                                     <div className="controls">
//                                         <input type="text" className="input" placeholder="Name"
//                                             value={lastname} onChange={(e) => setLastname(e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div className="field mt-5">
//                                     <label className="label">Email</label>
//                                     <div className="controls">
//                                         <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div className="field mt-5">
//                                     <label className="label">Password</label>
//                                     <div className="controls">
//                                         <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div className="field mt-5">
//                                     <label className="label">Confirm Password</label>
//                                     <div className="controls">
//                                         <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div className="field mt-5">
//                                     <button className="button is-success is-fullwidth">Register</button>
//                                 </div>
//                                 <p className="forgot-password text-right"> <a href="/">Login?</a> </p>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Register


const Register = () => {
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        lastname: "",
        email: "",
        password: "",
        confPassword: ""
      };
    
      const validationSchema = Yup.object({
        name: Yup.string().required("Name is required").min(5, "Name must be 5 character"),
        lastname: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(8, "Password must be 8 character").required("Password is required"),
        confPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required")
      });
    
      const handleSubmit = async(values, { setSubmitting }) => {

        try {
                        const res = await axios.post('http://localhost:5000/register', {
                            name: values.name,
                            lastname: values.lastname,
                            email: values.email,
                            password: values.password,
                            confPassword: values.confPassword
                        });
            
                        if (res.data.success === true) {
                            
                            toast.success('Successfully Register!', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
            
                            localStorage.setItem("token", res.data.token);
                            navigate("/")
                        }
                    } catch (error) {
                        if (error.response) {
                            // setMsg(error.response.data.msg);
                            toast.error('Fill Details!', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            });
                        }
                    
                }
            

        console.log(values);
        setSubmitting(false);
      };

    return(
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="box">
                    <p className="has-text-centered">
                      {/* Display form submission status */}
                      {/* For example: <span>{msg}</span> */}
                    </p>
                    <div className="field mt-5">
                      <label className="label">Name</label>
                      <div className="controls">
                        <Field type="text" className="input" name="name" placeholder="Name" />
                        <ErrorMessage name="name" component="p" className="help is-danger" />
                      </div>
                    </div>
                    <div>
                      <label className="label">Last Name</label>
                      <div className="controls">
                        <Field
                          type="text"
                          className="input"
                          name="lastname"
                          placeholder="Last Name"
                        />
                        <ErrorMessage name="lastname" component="p" className="help is-danger" />
                      </div>
                    </div>
                    <div className="field mt-5">
                      <label className="label">Email</label>
                      <div className="controls">
                        <Field type="text" className="input" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="p" className="help is-danger" />
                      </div>
                    </div>
                    <div className="field mt-5">
                      <label className="label">Password</label>
                      <div className="controls">
                        <Field
                          type="password"
                          className="input"
                          name="password"
                          placeholder="******"
                        />
                        <ErrorMessage name="password" component="p" className="help is-danger" />
                      </div>
                    </div>
                    <div className="field mt-5">
                      <label className="label">Confirm Password</label>
                      <div className="controls">
                        <Field
                          type="password"
                          className="input"
                          name="confPassword"
                          placeholder="******"
                        />
                        <ErrorMessage
                          name="confPassword"
                          component="p"
                          className="help is-danger"
                        />
                      </div>
                    </div>
                    <div className="field mt-5">
                      <button
                        type="submit"
                        className="button is-success is-fullwidth"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Registering..." : "Register"}
                      </button>
                    </div>
                    <p className="forgot-password text-right">
                      <a href="/">Login?</a>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Register
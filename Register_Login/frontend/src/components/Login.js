import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const Login = () => {
  const navigate = useNavigate();
  
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });


    const handleSubmit = async(values, actions) => {
     
      try {
                    const res = await axios.post('http://localhost:5000/login', {
                        email: values.email,
                        password: values.password
                    });
                    if (res.data.success === true){
        
                        toast.success('Successfully LogIN!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
        
                        localStorage.setItem("token", res.data.token)
                        navigate("/dashboard")
                       
                    }
                    
                } catch (error) {
                    
                        toast.error('Error!', {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    
                }

    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <section className="hero has-background-grey-dark is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit} >
                {({ isSubmitting }) => (
                  <Form className="box">
                    <div className="field mt-5">
                      <label className="label has-text-link">Email</label>
                      <div className="controls has-text-light">
                        <Field type="email" className="input" name="email" placeholder="Username" />
                        <ErrorMessage name="email" component="p" className="help is-danger" />
                      </div>
                    </div>
                    <div className="field mt-5">
                      <label className="label has-text-dark">Password</label>
                      <div className="controls">
                        <Field type="password" className="input" name="password" placeholder="******" />
                        <ErrorMessage name="password" component="p" className="help is-danger" />
                      </div>
                    </div>
                    <div className="field mt-5">
                      <button className="button is-success is-fullwidth" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging In...' : 'Login'}
                      </button>
                    </div>
                    <p className="forgot-password text-right">
                      <a href="/Register">Register?</a>
                    </p>
                    <p className="forgot-password text-left">
                      <a href="/forgot">Forgot?</a>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;



// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();


//     const Auth = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:5000/login', {
//                 email: email,
//                 password: password
//             });
//             if (res.data.success === true){

//                 toast.success('Successfully LogIN!', {
//                     position: "top-center",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 });

//                 localStorage.setItem("token", res.data.token)
//                 navigate("/dashboard")
               
//             }
            


//         } catch (error) {
//             if (error.response) {

//                 toast.error('Error!', {
//                     position: "bottom-right",
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
//         <section className="hero has-background-grey-dark is-fullheight is-fullwidth">
//             <div className="hero-body">
//                 <div className="container">
//                     <div className="columns is-centered">
//                         <div className="column is-4-desktop">
//                             <form onSubmit={Auth} className="box">
//                                 <div className="field mt-5">
//                                     <label className="label has-text-link">Email</label>
//                                     <div className="controls has-text-light">
//                                         <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div className="field mt-5">
//                                     <label className="label has-text-dark">Password</label>
//                                     <div className="controls">
//                                         <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div className="field mt-5">
//                                     <button className="button is-success is-fullwidth">Login</button>

//                                 </div>

//                                 <p className="forgot-password text-right"> <a href="/Register">Register?</a> </p>
//                             </form>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Login
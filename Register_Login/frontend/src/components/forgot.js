import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';



const Forgot = () => {

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required')
  });

  const handleSubmit = async (values, actions) => {

    try {
      const res = await axios.post('http://localhost:5000/forgot', { 
        email: values.email
      
      });
      if (res.data.success === true) {

        toast.success('Successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // localStorage.setItem("token", res.data.token)
        navigate("/")

      }



    } catch (error) {
      if (error.response) {

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
    }
    console.log(values);
    actions.setSubmitting(false);
  }

 

  

  return (
    <section className="hero has-background-grey-dark is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <Formik
                initialValues={{ email: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="box">
                    <div className="field mt-5">
                      <label className="label has-text-link">Email</label>
                      <div className="controls has-text-light">
                        <Field type="text" className="input" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="p" className="help is-danger" />
                      </div>
                    </div>

                    <div className="field mt-5">
                      <button
                        type="submit"
                        className="button is-success is-fullwidth"
                        disabled={isSubmitting}
                      >
                        Send mail
                      </button>
                    </div>

                    <p className="forgot-password text-right">
                      <a href="/">Login</a>
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

export default Forgot





// const Forgot = () => {
//   const [email, setEmail] = useState('');
//   // const [password, setPassword] = useState('');
//   const navigate = useNavigate();


//   const Auth = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/forgot', { email
//         // password: password
//       });
//       if (res.data.success === true) {

//         toast.success('Successfully!', {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });

//         // localStorage.setItem("token", res.data.token)
//         navigate("/")

//       }



//     } catch (error) {
//       if (error.response) {

//         toast.error('Error!', {
//           position: "bottom-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         });
//       }
//     }

//   }

//   return (
//     <section className="hero has-background-grey-dark is-fullheight is-fullwidth">
//       <div className="hero-body">
//         <div className="container">
//           <div className="columns is-centered">
//             <div className="column is-4-desktop">
//               <form onSubmit={Auth} className="box">
//                 <div className="field mt-5">
//                   <label className="label has-text-link">Email</label>
//                   <div className="controls has-text-light">
//                     <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                   </div>
//                 </div>

//                 <div className="field mt-5">
//                   <button className="button is-success is-fullwidth">Send mail</button>
//                 </div>

//                 <p className="forgot-password text-right"> <a href="/">Login</a> </p>
//               </form>

//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Forgot
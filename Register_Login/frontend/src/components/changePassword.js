import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';



const ChangePassword = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Old Password is required'),
        newPassword: Yup.string().required('New Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Confirm Password is required'),
    });

    const handleSubmit = async (values, actions) => {

        try {
            const res = await axios.post('http://localhost:5000/changepassword', {
                email: values.email,
                password: values.password,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword
            });
            if (res.data.success === true) {

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

                navigate("/dashboard")

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

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [newPassword, setnewPassword] = useState('');
    // const [confirmPassword, setconfirmPassword] = useState('');
    // const navigate = useNavigate();


    // const Auth = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post('http://localhost:5000/changepassword', {
    //             email: email,
    //             password: password,
    //             newPassword: newPassword,
    //             confirmPassword: confirmPassword
    //         });
    //         if (res.data.success === true) {

    //             toast.success('Successfully LogIN!', {
    //                 position: "top-center",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //             });

    //             navigate("/dashboard")

    //         }



    //     } catch (error) {
    //         if (error.response) {

    //             toast.error('Error!', {
    //                 position: "bottom-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "dark",
    //             });
    //         }
    //     }

    // }

    return (
        // <section className="hero has-background-grey-dark is-fullheight is-fullwidth">
        //     <div className="hero-body">
        //         <div className="container">
        //             <div className="columns is-centered">
        //                 <div className="column is-4-desktop">
        //                     <form onSubmit={Auth} className="box">
        //                         <div className="field mt-5">
        //                             <label className="label has-text-link">Email</label>
        //                             <div className="controls has-text-light">
        //                                 <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        //                             </div>
        //                         </div>
        //                         <div className="field mt-5">
        //                             <label className="label has-text-link">Password</label>
        //                             <div className="controls has-text-light">
        //                                 <input type="text" className="input" placeholder="Temporary Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        //                             </div>
        //                         </div>
        //                         <div className="field mt-5">
        //                             <label className="label has-text-dark">New Password</label>
        //                             <div className="controls">
        //                                 <input type="text" className="input" placeholder="******" value={newPassword} onChange={(e) => setnewPassword(e.target.value)} />
        //                             </div>
        //                         </div>
        //                         <div className="field mt-5">
        //                             <label className="label has-text-dark">Confirm Password</label>
        //                             <div className="controls">
        //                                 <input type="password" className="input" placeholder="******" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
        //                             </div>
        //                         </div>
        //                         <div className="field mt-5">
        //                             <button className="button is-success is-fullwidth">Change</button>

        //                         </div>

        //                         <p className="forgot-password text-right"> <a href="/dashboard">Dashboard?</a> </p>
        //                     </form>

        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>

        <section className="hero has-background-grey-dark is-fullheight is-fullwidth">
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
                                        <div className="field mt-5">
                                            <label className="label has-text-link">Email</label>
                                            <div className="controls has-text-light">
                                                <Field type="email" className="input" name="email" placeholder="Email" />
                                                <ErrorMessage name="email" component="p" className="help is-danger" />
                                            </div>
                                        </div>
                                        <div className="field mt-5">
                                            <label className="label has-text-link">Old Password</label>
                                            <div className="controls has-text-light">
                                                <Field type="password" className="input" name="password" placeholder="Old Password" />
                                                <ErrorMessage name="password" component="p" className="help is-danger" />
                                            </div>
                                        </div>
                                        <div className="field mt-5">
                                            <label className="label has-text-dark">New Password</label>
                                            <div className="controls">
                                                <Field type="password" className="input" name="newPassword" placeholder="******" />
                                                <ErrorMessage name="newPassword" component="p" className="help is-danger" />
                                            </div>
                                        </div>
                                        <div className="field mt-5">
                                            <label className="label has-text-dark">Confirm Password</label>
                                            <div className="controls">
                                                <Field type="password" className="input" name="confirmPassword" placeholder="******" />
                                                <ErrorMessage name="confirmPassword" component="p" className="help is-danger" />
                                            </div>
                                        </div>
                                        <div className="field mt-5">
                                            <button type="submit" className="button is-success is-fullwidth" disabled={isSubmitting}>
                                                Change
                                            </button>
                                        </div>
                                        <p className="forgot-password text-right"> <a href="/dashboard">Dashboard?</a> </p>
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

export default ChangePassword
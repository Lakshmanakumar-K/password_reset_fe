import { useState } from 'react';
import { signUpAPI } from "../../apis.js"
import { useDispatch } from "react-redux";
import styles from "./signup.module.css"


const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simple validation for passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            const { msg } = await signUpAPI({ name, email, phone, password });
            setLoading(false);
            dispatch({ type: "user registered" });
            setTimeout(() => { alert(msg) }, 100);
        }
        catch (e) {
            setLoading(false);
            dispatch({ type: "user registered" });
            setTimeout(() => { alert(e.message) }, 100);
        }
    };

    return (<>
        {loading ?
            <div className={styles.loading}>
                <div style={{ fontSize: "30px" }}>User Registration under progress...</div>
                <i className="fa fa-spinner fa-spin" style={{ fontSize: "50px", display: "inline-block" }}></i>
            </div> :
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4" style={{ width: '600px' }}>
                    <h3 className="text-center mb-4" style={{ color: "rgb(10, 99, 159)" }}>Sign Up</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                    </form>
                </div>
            </div>
        }
    </>);
};

export default SignupForm;

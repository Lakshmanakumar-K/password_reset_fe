import styles from "./Signin.module.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { passwordValidaionAPI } from "../../apis.js"

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ email, password });
        try {
            const { msg } = await passwordValidaionAPI({ email, password });
            alert(msg);
            navigate("/Home");
        }
        catch (e) {
            alert(e.message);
        }
    };

    const handleSignup = () => {
        dispatch({ type: "user not registered" });
    }
    const handleForgotPaswword = () => {
        navigate("/ForgotPassword")
    }

    return (<div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{ width: '500px', }}>
            <h3 className="text-center mb-4" style={{ color: "rgb(10, 99, 159)" }}>Login</h3>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            {/*  <div className="d-flex justify-content-between mt-3">
                <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
                <a href="/signup" className="text-decoration-none">Sign Up</a>
            </div> */}
            <button onClick={handleForgotPaswword} className={styles.link}>Forgot Password?</button>
            <button onClick={handleSignup} className={styles.link}>Sign Up</button>
        </div>
    </div>)
}

export default Signin
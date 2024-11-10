import styles from "./ForgotPassword.module.css"
import { useState } from 'react';
import { emailVeriicationAPI, getOTPAPI, updateOTPAPI, alterPassworAPI } from "../../apis.js"
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpField, setShowOtpField] = useState(false);
    const [timer, setTimer] = useState(false);
    let [time, setTime] = useState(60);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const handleVerify = async () => {
        try {
            setLoading(true);
            const { msg } = await emailVeriicationAPI(email);
            setLoading(false);
            setTimeout(() => { alert(msg) }, 100);
            setEmailVerified(true);
        }
        catch (e) {
            alert(e.message);
            setEmail("");
        }
    }


    const handleGetOtp = async () => {
        if (password === confirmPassword && password.length > 0) {
            setShowOtpField(true);
            try {
                setLoading(true);
                const { msg } = await getOTPAPI(email);
                setLoading(false);
                setTimeout(() => { alert(msg) }, 100);
                setTimer(true);
                const interval = setInterval(async () => {
                    if (time > 0) {
                        setTime(--time);
                    }
                    else {
                        setOtp(" ");
                        setTimer(false);
                        setTime(60);
                        setShowOtpField(false);
                        await updateOTPAPI(email);
                        clearInterval(interval);
                    }
                }, 1000);
            }
            catch (e) {
                alert(e.message);
                setPassword("");
                setConfirmPassword("");
            }
        }
        else {
            alert("Paswword not matched or password field is empty");
            setPassword("");
            setConfirmPassword("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { msg } = await alterPassworAPI({ email, password, otp });
            setLoading(false);
            setTimeout(() => { alert(msg) }, 100);
            setPassword("");
            setConfirmPassword("");
            navigate("/");
        }
        catch (e) {
            alert(e.message);
        }
    };

    return (
        <>{loading ?
            <div className={styles.loading}>
                <div style={{ fontSize: "30px" }}>Loading...</div>
                <i className="fa fa-spinner fa-spin" style={{ fontSize: "50px", display: "inline-block" }}></i>
            </div> :
            <>
                {emailVerified ?
                    <div className="container d-flex justify-content-center align-items-center vh-100">
                        <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
                            <h4 className="text-center mb-4">Password</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Enter password"
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
                                        placeholder="Re-enter password"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-secondary w-100 mb-3"
                                    onClick={handleGetOtp}
                                >
                                    Get OTP
                                </button>
                                {showOtpField && (<>
                                    <div className="mb-3">
                                        <label htmlFor="otp" className="form-label">OTP</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="otp"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                            placeholder="Enter OTP"
                                        />
                                    </div>
                                    {timer ? <div style={{ textAlign: "center" }}>Enter OTP in {time} seconds</div> : <></>}
                                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                                </>
                                )}

                            </form>
                        </div>
                    </div>
                    :
                    <div className="container d-flex justify-content-center align-items-center vh-100">
                        < div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
                            <h4 className="text-center mb-4">Email Verification</h4>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={handleVerify}
                            >
                                Verify
                            </button>
                        </div >
                    </div >}
            </>
        }
        </>
    );
};

export default ForgotPassword;
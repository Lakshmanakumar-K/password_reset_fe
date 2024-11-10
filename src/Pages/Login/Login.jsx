import { useSelector } from "react-redux"
import Signin from "../../Components/Signin/Signin.jsx"
import SignupForm from "../../Components/Signup/Signup.jsx"
const Login = () => {

    const appreducer = useSelector((state) => state.appreducer);

    return (<>
        {appreducer.isRegistered ? <Signin /> : <SignupForm />}
    </>)
}

export default Login
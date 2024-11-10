import { useSelector } from "react-redux"
import Signin from "../../Components/Signin/Signin.jsx"
import Signup from "../../Components/Signup/SIGNUP.JSX"
const Login = () => {

    const appreducer = useSelector((state) => state.appreducer);

    return (<>
        {appreducer.isRegistered ? <Signin /> : <Signup />}
    </>)
}

export default Login
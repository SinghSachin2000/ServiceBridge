import registerImg from "../assets/signupImg.jpg"
import Template from "../components/core/Auth/Template"

function Register(){
    return (
        <Template
        title= "join our platform"
        image = {registerImg}
        formType="register"
        />
    )
}

export default Register
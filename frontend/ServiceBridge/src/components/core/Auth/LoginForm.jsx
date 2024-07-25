import { useState } from "react";
import {useDispatch} from "react-redux"
import {Link,useNavigate} from "react-router-dom"

function LoginForm(){
    const navigate = useNavigate()
    const dispatch= useDispatch()

    const [formData,setFormData] = useState({
        email:"",
        password:"",
    })

const [showPassword,setShowPassword] = useState(false)
const {email,password} = formData

const handleonChange = (e)=>{
    setFormData((prevData)=>({
        
            ...prevData,
            [e.target.name]:e.target.value,
        
    }))
}
/*
const AddDeatils = useMutation({
    mutationKey : ["addDeatils"],
    mutationfn: async (data) => {
        return await postData("/register", data);
    },
    onSuccess: (data) => {
      console.log(data.data);
    },
    onError : (data) => {
       console.log(data);
    }
})
    */

const handleonSubmit = (e)=>{
    e.preventDefault()
    dispatch()
    AddDeatils.mutate(data);
}

return (
    <form>
      
    </form>
)
}

export default LoginForm
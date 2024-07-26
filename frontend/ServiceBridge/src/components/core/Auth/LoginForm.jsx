import { useState } from "react";
import {useDispatch} from "react-redux"
import {Link,useNavigate} from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

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

// const AddDeatils = useMutation({
//     mutationKey : ["addDeatils"],
//     mutationfn: async (data) => {
//         return await postData("/register", data);
//     },
//     onSuccess: (data) => {
//       console.log(data.data);
//     },
//     onError : (data) => {
//        console.log(data);
//     }
// })
    

const handleonSubmit = (e)=>{
    e.preventDefault()
    dispatch()
    // AddDeatils.mutate(data);
}

return (
    <form onSubmit={handleonSubmit}
    className="mt-6 flex w-full flex-col gap-y-4 w-[300px] shadow-2xl p-6"> 
      
<label className="w-full">
<p className="mb-1 text-[0.875rem] leading-[1.375rem] ">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
  <input
  required 
  type="text"
  name="email"
  value={email}
  onChange={handleonChange}
  placeholder="Enter email address"
  className = "form-style w-full"
  />      
</label>

<label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleonChange}
          placeholder="Enter Password"
          className="form-style w-full !pr-10"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-[#00aaee] py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Login
      </button>

    </form>
)
}

export default LoginForm
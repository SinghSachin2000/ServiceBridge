
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Tab from "../../common/Tab"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import CountryCode from "../../../data/countrycode.json"
import { endpoints } from "../../../services/api"

import { postData } from "../apiHandler"
import { useMutation } from "@tanstack/react-query"

const {
  REGISTER_API_WORKER,
  REGISTER_API_USER,
} = endpoints
function RegisterForm() {
  const navigate = useNavigate()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.USER)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneno: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }


  const handleOnSubmit = (e) => {
    e.preventDefault()

    const signupData = {
      ...formData,
      accountType,
    }

    if (ACCOUNT_TYPE.USER) {
      const AddDeatils = useMutation({
        mutationKey: ["addDeatils"],
        mutationfn: async (formData) => {
          return await postData(REGISTER_API_USER, signupData);
        },
        onSuccess: (formData) => {
          console.log(formData.data);
          navigate("/")
        },
        onError: (formData) => {
          console.log(formData);
        }
      })
    } else {
      const AddDeatils = useMutation({
        mutationKey: ["addDeatils"],
        mutationfn: async (formData) => {
          return await postData(REGISTER_API_WORKER, signupData);
        },
        onSuccess: (formData) => {
          console.log(formData.data);
          navigate("/")
        },
        onError: (formData) => {
          console.log(formData);
        }
      })
    }

    setFormData({
      fullName: "",
      email: "",
      password: "",
      phoneno: "",
    })
    setAccountType(ACCOUNT_TYPE.WORKER)
  }
  const tabData = [
    {
      id: 1,
      tabName: "User",
      type: ACCOUNT_TYPE.USER,
    },
    {
      id: 2,
      tabName: "Worker",
      type: ACCOUNT_TYPE.WORKER,
    },
  ]

  const { fullName, email, password, phoneno } = formData;
  return (
    <div className="shadow-2xl p-8 rounded-[20px] mt-5 ">

      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={handleOnSubmit} className="flex w-[300px] flex-col gap-y-4 ">

        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem]  text-black">
            Full Name <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleOnChange}
            placeholder="Enter name"
            className="form-style w-full h-[40px]"
          />
        </label>

        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="form-style w-full h-[40px]"
          />
        </label>

        <label className="relative">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
            Create Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            className="form-style w-full h-[40px] !pr-10"
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
        </label>
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneno" className="lable-style">
            Phone Number<sup className="text-pink-200">*</sup>
          </label>

          <div className="flex gap-5">
            <div className="flex w-[81px] flex-col gap-2">
              <select
                required
                type="text"
                name="phonecode"
                id="phonecode"
                placeholder="Enter countrycode"
                className="form-style h-[40px]"
                {...register("countrycode", { required: true })}
              >
                {CountryCode.map((ele, i) => {
                  return (
                    <option key={i} value={ele.code}>
                      {ele.code} -{ele.country}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
              <input
                required
                type="number"
                name="phoneno"
                id="phoneno"
                placeholder="12345 67890"
                className="form-style h-[40px]"
                {...register("phoneno", {
                  required: {
                    value: true,
                    message: "Please enter your Phone Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Phone Number" },
                  minLength: { value: 10, message: "Invalid Phone Number" },
                })}
              />
            </div>
          </div>
          {errors.phoneno && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.phoneno.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-[#00aaee] py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>



    </div>
  )
}

export default RegisterForm

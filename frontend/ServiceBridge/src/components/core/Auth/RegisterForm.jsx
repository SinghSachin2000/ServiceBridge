import { Select, SelectItem, Input, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Tab from "../../common/Tab";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import CountryCode from "../../../data/countrycode.json";
import { endpoints } from "../../../services/api";
import { postData } from "../apiHandler";
import { useMutation } from "@tanstack/react-query";

const { REGISTER_API_WORKER, REGISTER_API_USER } = endpoints;

function RegisterForm() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.USER);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneno: {
      countryCode: "",
      number: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const { fullName, email, password, phoneno } = formData;

  const handleOnChange = (e, type) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const workerRegister = useMutation({
    mutationKey: ["addDetailsWorker"],
    mutationFn: async (data) => {
      return await postData(REGISTER_API_WORKER, data);
    },
    onSuccess: (data) => {
      console.log(data.data);
      navigate("/");
    },
    onError: (error) => {
      console.error("Worker registration error:", error);
    },
  });

  const userRegister = useMutation({
    mutationKey: ["addDetailsUser"],
    mutationFn: async (data) => {
      return await postData(REGISTER_API_USER, data);
    },
    onSuccess: (data) => {
      console.log(data.data);
      navigate("/");
    },
    onError: (error) => {
      console.error("User registration error:", error);
    },
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!fullName || !email || !password || !phoneno.countryCode || !phoneno.number) {
      console.error("Validation error: All fields must be filled.");
      return;
    }

    const signupData = {
      name: fullName,
      email,
      password,
      phoneno: {
        countryCode: phoneno.countryCode,
        number: phoneno.number,
      },
    };

    console.log("Signup data:", signupData);

    if (accountType === ACCOUNT_TYPE.USER) {
      userRegister.mutate(signupData);
    } else {
      workerRegister.mutate(signupData);
    }

    setFormData({
      fullName: "",
      email: "",
      password: "",
      phoneno: {
        countryCode: "",
        number: "",
      },
    });
    setAccountType(ACCOUNT_TYPE.USER);
  };

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
  ];

  return (
    <div className="shadow-2xl p-8 rounded-[20px] mt-5 relative">
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={handleOnSubmit} className="flex w-[300px] flex-col gap-y-4">
        <Input
          required
          type="text"
          label="Full Name"
          name="fullName"
          value={fullName}
          onChange={(e) => handleOnChange(e, "fullName")}
          className="form-style w-full h-[40px]"
        />

        <Input
          required
          label="Email Address"
          type="text"
          name="email"
          value={email}
          onChange={(e) => handleOnChange(e, "email")}
          className="form-style w-full"
        />

        <Input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
          value={password}
          onChange={(e) => handleOnChange(e, "password")}
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

        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-row gap-5">
            <Select
              required
              label="Country Code"
              value={formData.phoneno.countryCode}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  phoneno: {
                    ...prevData.phoneno,
                    countryCode: e,
                  },
                }))
              }
            >
              {CountryCode.map((ele) => (
                <SelectItem
                  key={ele.country}
                  value={ele.code}
                  textValue={`${ele.code}, ${ele.country}`}
                >
                  {ele.code}, {ele.country}
                </SelectItem>
              ))}
            </Select>

            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
              <Input
                required
                type="text"
                name="number"
                id="phoneno"
                placeholder="12345 67890"
                value={formData.phoneno.number}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    phoneno: {
                      ...prevData.phoneno,
                      number: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
        </div>

        <Button
          radius="lg"
          type="submit"
          isLoading={userRegister.isLoading || workerRegister.isLoading}
          className="rounded-[8px] bg-[#00aaee] py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;

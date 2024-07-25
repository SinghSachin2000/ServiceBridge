import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { useSelector } from "react-redux"


function Template({title,image,formType}){
    const { loading } = useSelector((state) => state.auth)

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
              <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                  {title}
                </h1>
                {formType === "register" ? <RegisterForm/> : <LoginForm/>}
              </div>
              <div className=" mx-auto w-11/12 max-w-[450px] md:mx-0">
                <img
                  src={image}
                  alt="image"
                  width={558}
                  height={504}
                />
              </div>
            </div>
          )}
        </div>
      ) 
}

export default Template
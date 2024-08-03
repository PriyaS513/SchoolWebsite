import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../Components/Student.css';
import Lottie from "lottie-react";
import text from "../assets/login.json";
import img from "../Images/carousel3.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Student = () => {
  const [action,setAction] = useState("Teacher");
  const [formData, setFormData] = useState({
    
    email: '',
    password: '',
    
  })

  const [errors, setErrors] = useState({})
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData, [name] : value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = {}
    if(!formData.email.trim()) {
      validationErrors.email = "email is required"
  } else if(!/\S+@\S+\.\S+/.test(formData.email)){
      validationErrors.email = "email is not valid"
  }

  if(!formData.password.trim()) {
      validationErrors.password = "password is required"
  } else if(formData.password.length < 8){
      validationErrors.password = "password should be at least 8 char"
  }

    setErrors(validationErrors);

    // Check if there are no validation errors
    if (Object.keys(validationErrors).length === 0) {
      // Navigate to the appropriate page based on the user role
      toast.success('Logged In Successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (action === "Teacher") {
        setTimeout(() => {navigate("/Teacherprofile"); },2000);
      } else if (action === "Principal") {
        setTimeout(() => {navigate("/Principalprofile"); },2000);
      }
    }
    else {
      toast.error('Invalid username or password!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleForgotPassword = () => {
    navigate("/Forgot");
  };
  return (
    <form onSubmit={handleSubmit} id="teacher">
        <div className="login-page">
      <div className="box container">
      <div className="login-left">
      <img src={img} className="background-image" />
        <div className="stud">Teachers Login</div>
        <div className="text stud-1">{action}</div>
        <div className="underline"></div>
    
      <div className="submit-container">
        <div className="hover-effect">
          <div className={action==="Principal"?"submit gray":"submit"} onClick={()=>{setAction("Teacher")}}>Teacher's Login</div>
        </div>
        <div className="hover-effect">
          <div className={action==="Teacher"?"submit gray":"submit"} onClick={()=>{setAction("Principal")}}>Principal's Login</div>
        </div>
      </div>

      {/* <div className="inputs"> */}
        <div className="input_box">
          <img  alt="" />
          <input type="email" name="email" placeholder="example@gmail.com" autoComplete='off' onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>} 
        </div>

        <div className="input_box">
          <img  alt="" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          {errors.password && <span>{errors.password}</span>}
        </div>
      
      {action === "Teacher" ? (
          <div className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password?<span>Click Here</span>
          </div>
        ) : (
          <div></div>
        )}
      {action === "Principal" ? (
          <div className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password?<span>Click Here</span>
          </div>
        ) : (
          <div></div>
        )}
      <div className="submit-container hover-effect">
      <button className={action==="Principal's Login Teacher's Login"?"submit gray":"submit1"} type="submit">Submit</button>
      </div>
      </div>
      <div className="login-right">
      <Lottie animationData={text} />
      </div>
      </div>
    </div>
    <ToastContainer />
    </form>
  );
};

export default Student;
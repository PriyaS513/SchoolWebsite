import React, { useState, useRef } from "react";
import "./Form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import img from "../Images/student1.jpeg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStudent() {

  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const handlePhotoClick = () => setShowDropdown(!showDropdown);
  const handleLogout = () => {
    toast.success('Logout Successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => navigate('/'), 2000);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.student-photo-container')) setShowDropdown(false);
  };

  const [inputValue, setInputValue] = useState({
    mobile: "",
    studentId: "",
  });

  const download = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${inputValue}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const [StudformData, setStudFormData] = useState({
    name: "",
    sclass: "",
    regid: "",
    rollNo: "",
    add: "",
    father: "",
    mother: "",
    mobno: "",
    passw: "",
    confirmPass: "",
    adhar:"",
    image: null,
    qrcode: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChangePhoto = (event) => {
    const file = event.target.files[0];
    const fileType = file.type;
    const fileSize = file.size;

    if (!["image/jpeg", "image/gif", "image/png"].includes(fileType)) {
      alert("Only JPG, GIF and PNG files are allowed");
      return;
    }

    if (fileSize > 819200) {
      alert("File size exceeds 800KB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      setStudFormData({
        ...StudformData,
        image: event.target.files[0],
      });
    } else {
      setStudFormData({
        ...StudformData,
        [event.target.name]: event.target.value,
      });
    }
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const errors = validateForm(StudformData);
      if (Object.keys(errors).length === 0) {
        const formDataToSend = new FormData();
        Object.keys(StudformData).forEach((key) => {
          formDataToSend.append(key, StudformData[key]);
        });
        await axios.post(
          "http://localhost:8000/teacher/add_student/",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        resetForm();
        toast.success('Student saved successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setErrors(errors);
      }
    } catch (error) {
      console.error("Error adding student data:", error);
    }
  };

  const validateForm = (StudformData) => {
    const errors = {};
    if (!StudformData.name) errors.name = "Name is required";
    if (!StudformData.sclass) {
      errors.sclass = "Class is required";
    } else if (!/^[1-9]$|^10$/.test(StudformData.sclass)) {
      errors.sclass = "Class should be a number between 1 to 10";
    }
    if (!StudformData.regid) errors.regid = "ID is required";
    if (!StudformData.mobno) {
      errors.mobno = "Mobile number is required";
    } else if (!/^\d{10}$/.test(StudformData.mobno)) {
      errors.mobno = "Mobile number is invalid";
    }
    if (!StudformData.rollNo) {
      errors.rollNo = "Roll number is required";
    } else if (!/^\d+$/.test(StudformData.rollNo)) {
      errors.rollNo = "Roll number should have numbers only";
    }
    if (!StudformData.add) errors.add = "Address is required";
    if (!StudformData.father) errors.father = "Father Name is required";
    if (!StudformData.mother) errors.mother = "Mother Name is required";
    if (!StudformData.adhar) {
      errors.adhar = "Adhar No is required";
    } else if (StudformData.adhar.length !== 12){
      errors.adhar = "Adhar No must be 12 digit";
    }
    if (!StudformData.passw.trim()) {
      errors.passw = "Password is required";
    } else if (StudformData.passw.length < 8) {
      errors.passw = "Password should be at least 8 characters";
    }
    if (!StudformData.confirmPass.trim()) {
      errors.confirmPass = "Confirm Password is required";
    } else if (StudformData.confirmPass !== StudformData.passw) {
      errors.confirmPass = "Password and Confirm Password should be the same";
    }
    return errors;
  };

  const fileInputRef = useRef(null);
  const boxSize = 80;

  const resetForm = () => {
    setImage(null);
    setStudFormData({
      name: "",
      sclass: "",
      regid: "",
      rollNo: "",
      add: "",
      father: "",
      mother: "",
      mobno: "",
      passw: "",
      confirmPass: "",
      image: null,
      qrcode: "",
      adhar: "",
    });
    setErrors({});
    fileInputRef.current.value = "";
  };

  const resetFormPhoto = () => {
    setImage(null);
    fileInputRef.current.value = null;
  };


  return (
    <div id="Addstud" onClick={handleOutsideClick}>

      <div className="student-info-container">
        <div className="student-navbar">
          <div className="student-details">
            <h2 className="student-name">John Doe</h2>
            <p className="student-reg-no">Reg No: 123456789</p>
            <p className="student-reg-no">Teacher</p>
          </div>
          <div className="student-photo-container">
        <img
              src={img}
              alt="Student"
              className="student-photo"
              onClick={handlePhotoClick}
            />
            {showDropdown && (
              <div
                className="dropdown-menu">
                <ul>
                  <li>
                    <a >John Doe</a>
                  </li>
                  <li>
                    <a >Reg No: 123456789</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* < div className="format"> */}
      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate("/Teacherprofile/Studentpage")}>
        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
      </div>

      <h2 className="heading">Add Student details</h2>
      <form
        onSubmit={handleSubmit}
        action="student"
        method="post"
        id="student-form"
      >
        <div className="card-body media align-items-center">
          <img
            src={image || "https://bootdey.com/img/Content/avatar/avatar1.png"}
            alt="student"
            className="d-block ui-w-80"
            style={{
              width: `${boxSize}px`,
              height: `${boxSize}px`,
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <div className="media-body ml-4">
            <label htmlFor="file-input" className="btn btn-outline-primary">
              Upload new photo
              <input
                type="file"
                className="account-settings-fileinput"
                id="file-input"
                name="image"
                onChange={handleInputChangePhoto}
                ref={fileInputRef}
                accept="image/*"
                aria-label="Upload new photo"
                required
              />
            </label>{" "}
            <button
              type="button"
              className="btn btn-default md-btn-flat"
              onClick={resetFormPhoto}
            >
              Reset
            </button>
            <div className="text-light small mt-1">
              Allowed JPG, GIF or PNG. Max size of 800K
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              {/* <label htmlFor="name-input" className="form-label">Name</label> */}
              <input
                type="text"
                className="form-control mb-1"
                id="name-input"
                name="name"
                required
                value={StudformData.name}
                onChange={handleInputChange}
                placeholder="Enter Name"
              />
              {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              {/* <label htmlFor='class-input' className="form-label">Class</label> */}
              <input
                type="text"
                className="form-control"
                id="class-input"
                name="sclass"
                required
                value={StudformData.sclass}
                onChange={handleInputChange}
                placeholder="Enter Class"
              />
              {errors.sclass && (
                <div style={{ color: "red" }}>{errors.sclass}</div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              {/* <label htmlFor='id-input' className="form-label">Registration ID</label> */}
              <input
                type="text"
                className="form-control mb-1"
                id="id-input"
                name="regid"
                required
                value={StudformData.regid}
                onChange={handleInputChange}
                placeholder="Enter Registration ID"
              />
              {errors.regid && (
                <div style={{ color: "red" }}>{errors.regid}</div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              {/* <label htmlFor='roll-input' className="form-label">Roll No</label> */}
              <input
                type="text"
                className="form-control mb-1"
                id="roll-input"
                name="rollNo"
                required
                value={StudformData.rollNo}
                onChange={handleInputChange}
                placeholder="Enter Roll No"
              />
              {errors.rollNo && (
                <div style={{ color: "red" }}>{errors.rollNo}</div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              {/* <label htmlFor='add-input' className="form-label">Address</label> */}
              <input
                type="text"
                className="form-control"
                id="add-input"
                name="add"
                required
                value={StudformData.add}
                onChange={handleInputChange}
                placeholder="Enter Address"
              />
              {errors.add && <div style={{ color: "red" }}>{errors.add}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              {/* <label htmlFor='father-input' className="form-label">Father's Name</label> */}
              <input
                type="text"
                className="form-control mb-1"
                id="father-input"
                name="father"
                required
                value={StudformData.father}
                onChange={handleInputChange}
                placeholder="Enter Father's Name"
              />
              {errors.father && (
                <div style={{ color: "red" }}>{errors.father}</div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              {/* <label htmlFor='mother-input' className="form-label">Mother's Name</label> */}
              <input
                type="text"
                className="form-control mb-1"
                id="mother-input"
                name="mother"
                required
                value={StudformData.mother}
                onChange={handleInputChange}
                placeholder="Enter Mother's Name"
              />
              {errors.mother && (
                <div style={{ color: "red" }}>{errors.mother}</div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              {/* <label htmlFor='mobile-input' className="form-label">Mobile No</label> */}
              <input
                type="tel"
                className="form-control mb-1"
                id="mobile-input"
                name="mobno"
                required
                value={StudformData.mobno}
                onChange={handleInputChange}
                placeholder="Enter Mobile No"
              />
              {errors.mobno && (
                <div style={{ color: "red" }}>{errors.mobno}</div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              {/* <label htmlFor="pass-input" className="form-label">Enter Password</label> */}
              <input
                type="password"
                className="form-control mb-1"
                id="pass-input"
                name="passw"
                required
                value={StudformData.passw}
                onChange={handleInputChange}
                placeholder="Enter Password"
              />
              {errors.passw && (
                <div style={{ color: "red" }}>{errors.passw}</div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              {/* <label htmlFor="confirm-input" className="form-label">Confirm Password</label> */}
              <input
                type="password"
                className="form-control mb-1"
                id="confirm-input"
                name="confirmPass"
                required
                value={StudformData.confirmPass}
                onChange={handleInputChange}
                placeholder="Confirm Password"
              />
              {errors.confirmPass && (
                <div style={{ color: "red" }}>{errors.confirmPass}</div>
              )}
            </div>
            <input
              type="text"
              placeholder="Enter Mobile Number-Student ID"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <input type="button" onClick={download} value="Download"></input>
          </div>
        </div>
        <div className="row">
        <div className="col-md-6">
            <div className="form-group">
              {/* <label htmlFor='mobile-input' className="form-label">Mobile No</label> */}
              <input
                type="text"
                className="form-control mb-1"
                id="adhar-input"
                name="adhar"
                required
                value={StudformData.adhar}
                onChange={handleInputChange}
                placeholder="Enter Adhar No"
              />
              {errors.adhar && (
                <div style={{ color: "red" }}>{errors.adhar}</div>
              )}
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="form-group">
              <div className="gen">
                <label>Generate QR Code</label>
                <div
                  style={{
                    height: "auto",
                    margin: "0 auto",
                    maxWidth: 64,
                    width: "100%",
                  }}
                >
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxwidth: "100%", width: "100%" }}
                    value={inputValue}
                    viewBox={`0 0 256 256`}
                    id="QRCode"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="save">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddStudent;

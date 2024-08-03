import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Chart as defaults } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Circle } from "rc-progress";
import CountUp from "react-countup";
import "./Attendance.css";
import img from '../Images/student1.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Chart.register(BarElement, CategoryScale, LinearScale);
defaults.maintainAspectRatio = false;
defaults.responsive = true;

const StudentProfile = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handlePhotoClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Add logout logic here
    toast.success('Logout Successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.student-photo-container')) {
      setShowDropdown(false);
    }
  };

  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    axios
      .get("/api/attendance/")
      .then((response) => {
        setAttendanceData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, selectedMonth, 1);
  const endDate = new Date(currentYear, selectedMonth + 1, 0);
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
  const presentDays = attendanceData.filter(
    (attendance) =>
      new Date(attendance.date).getMonth() === selectedMonth &&
      attendance.attendance === "Present"
  ).length;
  const percentage = (presentDays / totalDays) * 100;

  return (
    <div id="attendance" onClick={handleOutsideClick}>
      
      <div className="student-navbar">
        <div className="student-details">
          <h2 className="student-name">John Doe</h2>
          <p className="student-reg-no">Reg No: 123456789</p>
          <p className="student-reg-no">Seventh</p>
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
                    <a >Seventh</a>
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

      < div className="format">
      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate('/Studentprofile')}>
        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
      </div>

     
      <div className="selectMenu">
        <h2>
          Attendance for{" "}
          {new Date(currentYear, selectedMonth)
            .toLocaleString("default", { month: "long", year: "numeric" })
            .replace(/\b0+/g, "")}
        </h2>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {Array.from({ length: 11 }, (_, index) => {
            const month = index + 5; // June (5) to April (10)
            const year = currentYear + (index > 10 ? 1 : 0); // 2024 for June to December, 2025 for January to April
            return (
              <option key={index} value={month}>
                {new Date(year, month, 1)
                  .toLocaleString("default", { month: "long", year: "numeric" })
                  .replace(/\b0+/g, "")}
              </option>
            );
          })}
        </select>
      </div>
      <div className="container-attendance">
        <div className="information">
          <h3>
            Total Days: <CountUp start={0} end={totalDays} delay={3} />
            <div className="roundProgress">
              <Circle
                percent={100}
                strokeWidth={10}
                trailWidth={8}
                strokeColor="blue"
                trailColor="#b3a4f3"
              />
              <span className="circle-text">{totalDays} Days</span>
            </div>
          </h3>
        </div>
        <div className="information">
          <h3>
            Present Days: <CountUp start={0} end={presentDays} delay={3} />
            <div className="roundProgress">
              <Circle
                percent={(presentDays / totalDays) * 100}
                strokeWidth={10}
                trailWidth={8}
                strokeColor="blue"
                trailColor="#b3a4f3"
              />
              <span className="circle-text">{presentDays} Days</span>
            </div>
          </h3>
        </div>
        <div className="information">
          <h3>
            Percentage:{" "}
            <CountUp start={0} end={percentage.toFixed(2)} delay={3} />
            <div className="roundProgress">
              <Circle
                percent={percentage.toFixed(2)}
                strokeWidth={10}
                trailWidth={8}
                strokeColor="blue"
                trailColor="#b3a4f3"
              />
              <span className="circle-text">{percentage.toFixed(2)}%</span>
            </div>
          </h3>
        </div>
      </div>
      <div className="App1">
        <div className="dataCard revenueCard">
          <div className="cardHeader">
            <div className="barGraph">
              <Bar
                data={{
                  labels: [
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                    "January",
                    "February",
                    "March",
                    "April",
                  ],
                  datasets: [
                    {
                      label: "Attendance",
                      data: [23, 31, 30, 23, 23, 23, 23, 23, 23, 23, 23],
                      backgroundColor: [
                        "rgba(43, 63, 229, 0.8)",
                        "rgba(250, 192, 19, 0.8)",
                        "rgba(253, 135, 135, 0.8)",
                      ],
                      borderRadius: 5,
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      type: "category",
                    },
                    y: {
                      type: "linear",
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentProfile;

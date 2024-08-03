import React, { useEffect, useState } from "react";
import "./Achivements.css";
import axios from "axios";
import img from "../Images/a2.avif";
import img1 from "../Images/background1.jpg";
import img2 from "../Images/v2.avif";
import img3 from "../Images/about.jpg";
import Carousel from "react-multi-carousel";
const Achivement = () => {
  const [Achivements, setAchivements] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/teacher/getAchivement/")
      .then((response) => {
        setAchivements(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // const  card1Style1 = {
  //   position: "relative",
  //   // backgroundColor: "#fff",
  //   borderRadius: "8px",
  //   padding: "0px",
  //   margin: "20px",
  //   // border: "2px solid #007bff", // Add border here
  //   // borderBottomColor: "2px solid #ffff", // Add border here
  //   // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
  //   transition: "transform 0.3s ease, box-shadow 0.3s ease",
  // };

  // const  card1Style1 = {
  //   position: "relative",
  //   padding: "0px",
  //   margin: "20px",
  //   transition: "transform 0.3s ease, box-shadow 0.3s ease",
  //   display: "grid",
  //   placeItems: "center",
  //   width: "80vw",
  //   maxWidth: "21.875rem",
  //   height: "28.125rem",
  //   overflow: "hidden",
  //   borderRadius: "0.625rem",
  //   boxShadow: "0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25)",
  // };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1, // Display one item at a time on mobile devices
    },
  };

  return (
    <div className="containerAchivement" id="achivement-section">
      <div className="row">
        <div className="page-content container note-has-grid" id="notice">
          <h1 className="Heading text-center hover-effect">Achivement</h1>
        </div>
      </div>

      {/* Achievement  card1s */}
      <div className="tab-content bg-transparent">
        <div className="row note-has-grid note-full-container">
          <Carousel responsive={responsive}>
            <div className="card1-container">
              <article className=" card1">
                <img
                  className="card1__background  card1-img-top"
                  src={img}
                  alt="achivement of Cartagena's cathedral at the background and some colonial style houses"
                />
                <div className="card1__content flow">
                  <div className="card1__content--container flow">
                    <h2 className="card1__title">Winner of a National Science Fair</h2>
                    <p className="card1__description">
                    Vinit designed and presented an innovative project on renewable energy solutions, which won first place at the National 
                    Science Fair. His project was praised for its practical application and creativity, earning him recognition from various 
                    scientific communities
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <div className="card1-container">
              <article className=" card1">
                <img
                  className="card1__background  card1-img-top"
                  src={img1}
                  alt="achivement of Cartagena's cathedral at the background and some colonial style houses"
                />
                <div className="card1__content flow">
                  <div className="card1__content--container flow">
                    <h2 className="card1__title">Captain of the School Basketball Team</h2>
                    <p className="card1__description">
                    Vinita led his school basketball team to victory in the state championships as the team captain. His leadership, 
                    teamwork, and dedication not only helped the team win the title but also earned him the Most Valuable Player (MVP) 
                    award for his outstanding performance throughout the tournament.

                    </p>
                  </div>
                </div>
              </article>
            </div>
            <div className="card1-container">
              <article className=" card1">
                <img
                  className="card1__background  card1-img-top"
                  src={img2}
                  alt="achivement of Cartagena's cathedral at the background and some colonial style houses"
                />
                <div className="card1__content flow">
                  <div className="card1__content--container flow">
                    <h2 className="card1__title">Sanjit's 1st Rank in 8th Class</h2>
                    <p className="card1__description">
                    Sanjit achieved first place in his 8th-grade class, demonstrating exceptional academic excellence. His dedication to his 
                    studies and consistent hard work set him apart from his peers. This remarkable accomplishment reflects his commitment to 
                    learning and his outstanding intellectual capabilities.
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <div className="card1-container">
              <article className=" card1">
                <img
                  className="card1__background  card1-img-top"
                  src={img3}
                  alt="achivement of Cartagena's cathedral at the background and some colonial style houses"
                />
                <div className="card1__content flow">
                  <div className="card1__content--container flow">
                    <h2 className="card1__title">Student of the Month Award</h2>
                    <p className="card1__description">
                      In recognition of outstanding academic excellence and
                      exemplary behavior, [Student's Name] has been honored with
                      the prestigious "Student of the Month" award. This
                      achievement highlights their dedication to learning,
                      consistent hard work, and positive contributions to the
                      school community. [Student's Name] serves as an inspiring
                      role model for their peers, demonstrating the values of
                      perseverance, responsibility, and kindness.
                    </p>
                  </div>
                </div>
              </article>
            </div>

            {/*           <div className="single-note-item all-category">
              <div className=" card11 board hover-effect" style={ card1Style1}>
                 
                <img src={img} className=" card1-img-top" alt="Notice" />
                 <h5
                  className="note-title text-truncate w-75 mb-0"
                  data-noteheading="Example Notice Title"
                >
                  Example Notice{" "}
                  <i className="point fa fa-circle ml-1 font-10"></i>
                </h5>

                <div className="note-content">
                  <p
                    className="note-inner-content text-muted"
                    data-notecontent="This is an example notice content."
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illum voluptatem corrupti quaerat modi ad mollitia facere,
                    officia amet nihil provident dolorem voluptatum temporibus
                    architecto perspiciatis, aut sunt nostrum earum laudantium.
                  </p>
                </div> 
              </div>
            </div>
*/}
            {Achivements.map((achivements) => (
              <div
                key={achivements.achivementsId}
                className="col-lg-4 col-md-6"
              >
                <div className=" card1 achievement hover-effect">
                  <img
                    src={achivements.achivementsImage}
                    className=" card1-img-top"
                    alt="Achievement"
                  />
                  <div className=" card1-body">
                    <h5 className=" card1-title">
                      {achivements.achivementsTitle}
                    </h5>
                    <p className=" card1-text">
                      {achivements.achivementsContent}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Achivement;


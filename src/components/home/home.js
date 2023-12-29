import Header from "../header/header";
import "./home.css";
import HomeCard from "../widgets/homeCard";
import online1 from "../../assets/svgs/employeeOnline1.png";
import online2 from "../../assets/svgs/employeeOnline2.png";
import HomeBg from "./homeBg";
import Footer from "../footer/footer";
import { Box, Button, Grid, Typography } from "@mui/material";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import StarRateIcon from "@mui/icons-material/StarRate";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import HomeTest from "./homeTest";
import { useEffect, useState } from "react";
import RdButton from "../widgets/rdButton";
import {
  buttonColorYellow,
  buttonColorYellowHover,
} from "../../utilities/themes";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);
  const [showCard, setShowCard] = useState(false);

  //   const handleButtonHover = (buttonType) => {
  //     if (buttonType === "assessment") {
  //       setIsButtonHovered("assessment");
  //     } else if (buttonType === "mockTest") {
  //       setIsButtonHovered("mockTest");
  //     }
  //   };

  //   const handleButtonHoverOut = () => {
  //     setIsButtonHovered(null);
  //   };
  const handleButtonHover = (buttonType) => {
    setHoveredButton(buttonType);
    setShowCard(true);
  };

  const handleButtonHoverOut = () => {
    setHoveredButton(null);
    setShowCard(false);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const defaultTop = "0px";
  const adjustedTop = windowWidth >= 1441 ? "-200px" : defaultTop;

  const cardStyle = {
    position: "absolute",
    left: "400px",
    transform: "translateX(-50%)",
    zIndex: 9999,
    top: "-180px",
  };
  const cards = [
    {
      img: online1,
      title: "Assessment",
      content:
        "Get started with creating assessments for your target students and give your students access to complete report and analysis of their performance.",
    },
    {
      img: online2,
      title: "Mock Test",
      content:
        "Start with a mock test curated specially for you to test yourself right away on various topics that are based on latest exam patterns. Give yourself a chance.",
    },
  ];
  //   const onSelect = (title) => {
  //     if (title === "Assessment") {
  //       document.location.href = "/welcome";
  //     } else {
  //       document.location.href = "/mock-test";
  //     }
  //   };
  return (
    <div>
      {/* <HomeBg /> */}
      <div className="home_container">
        <Header />
        <div className="home-content-bg-c">
          <div className="home_content">
            <div className="home_text">
              <p className="home_title1">
                Your ​comprehensive solution for accurate and consistent
                evaluations
              </p>
              <Box
                sx={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: { xs: "1.35rem", sm: "2.2rem" },
                  marginTop: "48px",
                }}
              >
                MORE THAN 1200 TRAINERS AND TEACHERS
              </Box>
            </div>
            <div
              style={{
                textAlign: "center",
                // fontWeight: 600,
                marginTop: "24px",
                marginBottom: "20px",
                maxWidth: "660px",
                marginLeft: "auto",
                marginRight: "auto",
                letterSpacing: "1px",
              }}
            >
              We understand the importance of creating assessments and
              evaluations that are accurate, consistent, and easy to administer.
              That's why we've developed a comprehensive solution to make
              assessments simple for educators, administrators,trainers, and
              students alike.
            </div>
            <Box
              sx={{
                textAlign: "center",
                pt: 2,
                position: "relative",
              }}
            >
              <Button
                variant="conatined"
                sx={{
                  backgroundColor: "#eebe2e",
                  color: "#000000",
                  p: 1.3,
                  px: 4,
                  borderRadius: 10,
                  mr: 3.5,
                  letterSpacing: 1,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#eebe2e",
                    color: "#337bc3",
                  },
                }}
                // onMouseEnter={() => handleButtonHover("assessment")}
                // onMouseLeave={handleButtonHoverOut}
                onClick={() => navigate("/login")}
              >
                Create Assessments
              </Button>
              <Button style={{paddingLeft:'45px',paddingRight:'45px'}}
                variant="conatined"
                sx={{
                  backgroundColor: "#eebe2e",
                  color: "#000000",
                  p: 1.3,
                  px: 4,
                  borderRadius: 10,
                  mr: 3.5,
                  letterSpacing: 1,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#eebe2e",
                    color: "#337bc3",
                  },
                  mt: { xs: 2, sm: 0 },
                }}
                // onMouseEnter={() => handleButtonHover("mockTest")}
                // onMouseLeave={handleButtonHoverOut}
                onClick={() => navigate("/mock-test")}
              >
                Start Mock Test
              </Button>

              {/* card */}
              {showCard && hoveredButton === "assessment" && (
                <Box sx={{ ...cardStyle }}>
                  <div className="home_card d-flex">
                    <div>
                      <img
                        style={{ width: "100%" }}
                        src={cards[0].img}
                        alt=""
                      />
                    </div>
                    <div style={{ paddingLeft: "10px" }}>
                      <p
                        style={{
                          color: "#6f51ff",
                          fontSize: 17,
                          fontWeight: "bold",
                        }}
                      >
                        {cards[0].title}
                      </p>
                      <p style={{ fontSize: 15, color: "#888" }}>
                        {cards[0].content}
                      </p>
                    </div>
                  </div>
                </Box>
              )}
              {showCard && hoveredButton === "mockTest" && (
                <Box sx={{ ...cardStyle }}>
                  <div className="home_card d-flex">
                    <div>
                      <img
                        style={{ width: "100%" }}
                        src={cards[1].img}
                        alt=""
                      />
                    </div>
                    <div style={{ paddingLeft: "10px" }}>
                      <p
                        style={{
                          color: "#6f51ff",
                          fontSize: 17,
                          fontWeight: "bold",
                        }}
                      >
                        {cards[1].title}
                      </p>
                      <p style={{ fontSize: 15, color: "#888" }}>
                        {cards[1].content}
                      </p>
                    </div>
                  </div>
                </Box>
              )}
            </Box>

            {/* <div className="home_card_c">
              {cards.map((card) => (
                // Render the card content conditionally based on the hovered card
                <HomeCard
                  key={card.title}
                  onSelect={onSelect}
                  img={card.img}
                  title={card.title}
                  content={card.content}
                  hovered={hoveredCard === card.title}
                />
              ))}
            </div> */}
          </div>
        </div>

        {/* <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <div style={{margin: '20px'}}>
                        <img style={{height: '350px', float: 'right'}}  src='https://uetracksg.com/pcm//images/pexels-photo-1106468.jpeg' alt='Image'/>
                    </div>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                  <div style={{margin: '20px', fontFamily: "'DM Sans', sans-serif"}}>
                  <h2>Making assessment process​ simple</h2>
                    <p style={{fontSize: '18px', lineHeight: '2em'}}>
Using tykhere, educators and trainers can create custom assessments that are tailored to their specific needs and preferences. Our intuitive interface makes ​creating and editing questions and conducting assessments easy.</p>

<p style={{fontSize: '18px', lineHeight: '2em'}}>In addition to creating assessments, tykhere ​easily evaluates student performance and generates reports. Users can easily score assessments and track student progress, identifying areas for improvement and tailoring instruction accordingly. Our reporting features allow users to generate detailed reports that provide valuable insights into student performance and progress.
                    </p>
                  </div>
                </div>
            </div>

            <div style={{display: 'table', margin: 'auto'}}>
                <div style={{width: '240px', margin: '16px 4px', display: 'inline-block'}}>
                    <AccessTimeFilledIcon sx={{fontSize: '32px', color: '#f1c50e'}}/>
                    <h4 style={{fontWeight: '800', marginTop: '12px'}}>Simple</h4>
                    <p style={{marginTop: '12px'}}>
                    Simple user-friendly design helps the trainer to create assessments  within minutes.
                    </p>
                </div>
                <div style={{width: '240px', margin: '16px 36px', display: 'inline-block'}}>
                    <StarRateIcon sx={{fontSize: '32px', color: '#f1c50e'}}/>
                    <h4 style={{fontWeight: '800', marginTop: '12px'}}>Accurate</h4>
                    <p style={{ marginTop: '12px'}}>
                    After the assessment, easy to produce multiple accurate results and analyze the short falls.
                    </p>
                </div>
                <div style={{width: '240px', margin: '16px 4px', display: 'inline-block'}}>
                    <WaterfallChartIcon sx={{fontSize: '32px', color: '#f1c50e'}}/>
                    <h4 style={{fontWeight: '800',  marginTop: '12px'}}>Consistent</h4>
                    <p style={{ marginTop: '12px'}}>
                    Consistent and faster performance. Evaluation will be at your fingertips.
                    </p>
                </div>
            </div> */}
        {/* <iframe src="https://apis.tykhere.com/home2.html" title="External Page"  style={{ width: '100%', height: '100vh' }}/> */}
        <HomeTest />
        <Footer />
      </div>
    </div>
  );
};
export default Home;

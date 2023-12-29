import { Box, Grid, Button, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function Carousel() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {isSmallScreen ? (
        <Box p={"100px 40px"} textAlign={"center"} sx={{ height: "100vh" }}>
          <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box>
                    <img
                      width={"100%"}
                      height={"350px"}
                      src="/assets/images/pexels-photo-555790.jpg"
                      alt="..."
                    />
                  </Box>

                  <Box mt={3}>
                    <h3 style={{ fontWeight: "bold" }}>
                      John Jackson, developer
                    </h3>
                  </Box>
                  <Box mt={2}>
                    <p style={{ color: "#212529", lineHeight: 1.6 }}>
                      There are two types of people who will tell you that you
                      cannot make a difference in this world: those who are
                      afraid to try and those who are afraid you will succeed.
                    </p>
                  </Box>
                  {/* <Box mt={4}>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: "lowercase",
                        backgroundColor: "#f1c50e ",
                        borderRadius: "0",
                        "&:hover": {
                          backgroundColor: "#f1c50e ",
                        },
                        p: "10px 30px",
                        color: "#000000",
                      }}
                    >
                      read more
                    </Button>
                  </Box> */}
                </Box>
              </div>
              <div className="carousel-item" data-bs-interval="1000">
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box>
                    <img
                      // width={"100%"}
                      // height={"350px"}
                      style={{
                        width: "100%",
                        height: "350px",
                        objectFit: "cover",
                      }}
                      src="/assets/images/pexels-photo-1462630.jpg"
                      alt="..."
                    />
                  </Box>

                  <Box mt={3}>
                    <h3 style={{ fontWeight: "bold" }}>
                      Linda Larson, designer
                    </h3>
                  </Box>
                  <Box mt={2}>
                    <p style={{ color: "#212529", lineHeight: 1.6 }}>
                      There are two types of people who will tell you that you
                      cannot make a difference in this world: those who are
                      afraid to try and those who are afraid you will succeed.
                    </p>
                  </Box>
                  {/* <Box mt={4}>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: "lowercase",
                        backgroundColor: "#f1c50e ",
                        borderRadius: "0",
                        "&:hover": {
                          backgroundColor: "#f1c50e ",
                        },
                        p: "10px 30px",
                        color: "#000000",
                      }}
                    >
                      read more
                    </Button>
                  </Box> */}
                </Box>
              </div>
            </div>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="prev"
              >
                <Box
                  sx={{
                    background: "#f1c50e",
                    p: 1,
                    mr: 6,
                    borderRadius: "50%",
                  }}
                >
                  <ArrowBackIosNewIcon sx={{ color: "#FFFFFF" }} />
                </Box>
                <span className="visually-hidden">Previous</span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="next"
              >
                <Box
                  sx={{
                    background: "#f1c50e",
                    p: 1,
                    ml: 6,
                    borderRadius: "50%",
                  }}
                >
                  <ArrowForwardIosIcon sx={{ color: "#FFFFFF" }} />
                </Box>
                <span className="visually-hidden">Next</span>
              </button>
            </div> */}
          </div>
        </Box>
      ) : (
        <Box
          sx={{
            px: { xs: 0, sm: 0, lg: 10, xl: 30 },
            p: { xs: 0, sm: 0, lg: 6 },
          }}
        >
          <div
            id="carouselExampleDark"
            class="carousel carousel-dark slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
            </div>
            <div class="carousel-inner">
              <Box sx={{ p: "0px 0px 0px 200px" }}>
                <div class="carousel-item active" data-bs-interval="1000">
                  <Grid container>
                    <Grid item sm={3}>
                      <div className="carousel_img">
                        <img
                          width={"100%"}
                          src="/assets/images/pexels-photo-555790.jpg"
                        />
                      </div>
                    </Grid>
                    <Grid item sm={9}>
                      <Box
                        sx={{
                          position: "absolute",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                        }}
                        ml={6}
                      >
                        <Box>
                          <h4 style={{ fontWeight: "bold" }}>
                            Aarav Sharma, Trainer
                          </h4>
                        </Box>
                        <Box mt={2}>
                          <div
                            style={{
                              color: "#212529",
                              lineHeight: 1.6,
                              fontWeight: "300 !important",
                            }}
                          >
                            I've been in the training industry for over a
                            decade, and I've never come across a quiz maker and
                            assessment management tool as powerful and
                            user-friendly as TykHere. It has completely
                            transformed the way I create and deliver assessments
                            to my trainees. The variety of question types,
                            customizable templates, and seamless integration
                            options make it a game-changer. My trainees are more
                            engaged, and I can easily track their progress and
                            identify areas that need more focus. This quiz maker
                            has truly elevated the effectiveness of my training
                            programs.
                          </div>
                        </Box>
                        {/* <Box mt={4}>
                          <Button
                            variant="contained"
                            sx={{
                              textTransform: "lowercase",
                              backgroundColor: "#f1c50e ",
                              borderRadius: "0",
                              "&:hover": {
                                backgroundColor: "#f1c50e ",
                              },
                              p: "10px 30px",
                              color: "#000000",
                            }}
                          >
                            read more
                          </Button>
                        </Box> */}
                      </Box>
                    </Grid>
                  </Grid>
                </div>
                <div class="carousel-item" data-bs-interval="2000">
                  <Grid container>
                    <Grid item sm={3}>
                      <div className="carousel_img">
                        <img width={"100%"} src="/assets/images/priya.jpg" />
                      </div>
                    </Grid>
                    <Grid item sm={9}>
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                        }}
                        ml={6}
                      >
                        <Box>
                          <h4 style={{ fontWeight: "bold" }}>
                            Priya Patel, Trainer
                          </h4>
                        </Box>
                        <Box mt={2}>
                          <div
                            style={{
                              color: "#212529",
                              lineHeight: 1.6,
                              fontWeight: "300 !important",
                            }}
                          >
                            "As a corporate trainer, my priority is to ensure
                            that the learning experience is top-notch and
                            impactful. TykHere, the quiz maker and assessment
                            management platform, has been a godsend. The ease of
                            use, coupled with its advanced features, has allowed
                            me to create dynamic quizzes that challenge and
                            educate my participants. The real-time feedback and
                            instant results have led to more interactive
                            post-assessment discussions. I can confidently say
                            that TykHere has increased the overall retention and
                            application of the training material. Highly
                            recommended!"
                          </div>
                        </Box>
                        <Box mt={4}>
                          {/* <Button
                            variant="contained"
                            sx={{
                              textTransform: "lowercase",
                              backgroundColor: "#f1c50e ",
                              borderRadius: "0",
                              "&:hover": {
                                backgroundColor: "#f1c50e ",
                              },
                              p: "10px 30px",
                              color: "#000000",
                            }}
                          >
                            read more
                          </Button> */}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </div>

            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              {/* <span class="carousel-control-prev-icon" aria-hidden="true"></span> */}
              <Box sx={{ background: "#f1c50e", p: 3, borderRadius: "50%" }}>
                <ArrowBackIosNewIcon sx={{ color: "#FFFFFF" }} />
              </Box>
              <span class="visually-hidden">Previous</span>
            </button>

            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              {/* <span class="carousel-control-next-icon" aria-hidden="true"></span>
               */}
              <Box sx={{ background: "#f1c50e", p: 3, borderRadius: "50%" }}>
                <ArrowForwardIosIcon sx={{ color: "#FFFFFF" }} />
              </Box>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </Box>
      )}
    </>
  );
}

export default Carousel;

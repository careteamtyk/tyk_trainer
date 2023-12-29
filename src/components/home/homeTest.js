import React from "react";
import "./hometest.css";
import { Box, Button, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Carousel from "./carousel";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function HomeTest() {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      {/* section-1 */}
      <section className="py-5 a-card-action section1_home" id="carousel_1b0c">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 text-center">
              <img
                className="img-mob"
                width="100%"
                height="100%"
                src="/assets/images/Pic-2.jpg"
                alt=""
              />
            </div>
            <div className="col-lg-6">
              <div className="">
                <h2 className="mb-4 fw-bold head-mob">
                  Making assessment process​ simple
                </h2>
                <p className="text_home">
                  Using tykhere, educators and trainers can create custom
                  assessments that are tailored to their specific needs and
                  preferences. Our intuitive interface makes ​creating and
                  editing questions and conducting assessments easy.
                  <br />
                  <br />
                  In addition to creating assessments, tykhere ​easily evaluates
                  student performance and generates reports. Users can easily
                  score assessments and track student progress, identifying
                  areas for improvement and tailoring instruction accordingly.
                  Our reporting features allow users to generate detailed
                  reports that provide valuable insights into student
                  performance and progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section-2 */}
      <section className=" py-5">
        <Grid
          container
          spacing={10}
          px={{ xs: 0, sm: 30, xl: 45 }}
          p={{ xs: 2 }}
        >
          <Grid item sm={4}>
            <Box className="card_home" sx={{ height: "300px" }}>
              <div>
                <svg
                  className="bi me-3 text-primary"
                  width="40"
                  height="40"
                  fill="#ffc107"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="M193.29 395.63c-42.64 0-77.33-34.69-77.33-77.33v-25.59c-62.506-3.875-116.177 46.692-115.959 109.34 0 60.4 49.14 109.53 109.53 109.53 62.65.217 113.214-53.436 109.34-115.95z"></path>
                    <path d="M262.94 146.56h-69.65c-26.1 0-47.33 21.24-47.33 47.33-.042 16.556.03 110.208 0 124.41 0 26.09 21.23 47.33 47.33 47.33 14.916-.029 107.366.021 124.4 0 26.1 0 47.33-21.24 47.33-47.33v-68.81h-102.08z"></path>
                    <path d="M292.94.42v219.07h219.06v-219.07z"></path>
                  </g>
                </svg>
              </div>
              <h4 className="py-3 fw-bold">Simple</h4>
              <p>
                Simple user-friendly design helps the trainer to create
                assessments within minutes.
              </p>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box className="card_home" sx={{ height: "300px" }}>
              <div>
                <svg
                  className="bi me-3 text-primary"
                  width="40"
                  height="40"
                  fill="#ffc107"
                  viewBox="0 0 512.001 512.001"
                >
                  <g>
                    <g>
                      <path d="M502.979 317.996L230.502 199.598c26.679-30.977 43.37-68.952 48.104-109.598h16.395c8.284 0 15-6.716 15-15V15c0-8.284-6.716-15-15-15h-60c-8.284 0-15 6.716-15 15v60c0 8.284 6.716 15 15 15h13.362c-5.335 38.976-23.597 74.898-52.382 102.447-29.08 27.831-66.261 44.536-105.98 47.907v-9.265c0-8.284-6.716-15-15-15h-60c-8.284 0-15 6.716-15 15v60c0 8.284 6.716 15 15 15h50c8.284 0 15-6.716 15-15v-20.631c39.772-2.876 77.462-17.167 109.042-41.233l118.953 273.754c2.391 5.5 7.81 9.022 13.753 9.022 0.283 0 0.567-0.008 0.853-0.024c6.272-0.355 11.659-4.582 13.496-10.589l27.229-89.03c5.725-18.716 20.315-33.307 39.03-39.031l89.03-27.229c6.008-1.837 10.234-7.224 10.589-13.497C512.332 326.329 508.741 320.5 502.979 317.996z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <h4 className="py-3 fw-bold">Accurate</h4>
              <p>
                After the assessment, easy to produce multiple accurate results
                and analyze the shortfalls.
              </p>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box className="card_home" sx={{ height: "300px" }}>
              <div>
                <img
                  src="/assets/images/3037106-01583a55.png"
                  alt=""
                  className="me-3"
                  width="40"
                  height="40"
                />
              </div>
              <h4 className="py-3 fw-bold">Consistent</h4>
              <p>
                Consistent and faster performance. Evaluation will be at your
                fingertips.
              </p>
            </Box>
          </Grid>
        </Grid>
      </section>

      {/* section-3 */}
      <section className="bg-light py-5">
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 3,
              p: { xs: 1, sm: 0 },
              fontSize: { xs: "1.875rem" },
            }}
          >
            Start your journey with us today!
          </Typography>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, sm: 2, xl: 0 }}
          px={{ xs: 2, sm: 30, xl: 45 }}
        >
          <Grid item sm={4}>
            {" "}
            <Paper
              elevation={4}
              sx={{
                maxWidth: 370,
                height: { xs: "100%", sm: 540, xl: 480 },
                p: { xs: 2, sm: 3 },

                // boxShadow: "5px 5px #f2f4f7",
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image="/assets/images/Pic-3.jpg"
                alt="Paella dish"
              />
              <Typography
                variant="h5"
                fontWeight={"bold"}
                sx={{ py: 2, mb: -1 }}
              >
                Question Bank
              </Typography>
              <Box>
                <Typography variant="body1" color="text.secondary">
                  The question bank feature allows you easy and fast assessment
                  creation and AI logic to make sure there are only relevant
                  questions appear for the assessment.
                </Typography>
              </Box>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                  <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep
                    skillet over medium-high heat. Add chicken, shrimp and
                    chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate
                    and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and
                    fragrant, about 10 minutes. Add saffron broth and remaining
                    4 1/2 cups chicken broth; bring to a boil.
                  </Typography>
                  <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with
                    artichokes and peppers, and cook without stirring, until
                    most of the liquid is absorbed, 15 to 18 minutes. Reduce
                    heat to medium-low, add reserved shrimp and mussels, tucking
                    them down into the rice, and cook again without stirring,
                    until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don&apos;t open.)
                  </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and
                    then serve.
                  </Typography>
                </CardContent>
              </Collapse>
            </Paper>
          </Grid>
          <Grid item sm={4}>
            {" "}
            <Paper
              elevation={4}
              sx={{
                maxWidth: 370,
                height: { xs: "100%", sm: 540, xl: 480 },
                p: { xs: 2, sm: 3 },
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image="/assets/images/Pic-4.jpg"
                alt="Paella dish"
              />
              <Typography
                variant="h5"
                fontWeight={"bold"}
                sx={{ py: 2, mb: -1 }}
              >
                Live dashboard
              </Typography>
              <Box>
                <Typography variant="body1" color="text.secondary">
                  The live dashboard available in the system enables multiple
                  insights about the candidates and gives you a top view of the
                  progress.
                </Typography>
              </Box>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                  <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep
                    skillet over medium-high heat. Add chicken, shrimp and
                    chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate
                    and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and
                    fragrant, about 10 minutes. Add saffron broth and remaining
                    4 1/2 cups chicken broth; bring to a boil.
                  </Typography>
                  <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with
                    artichokes and peppers, and cook without stirring, until
                    most of the liquid is absorbed, 15 to 18 minutes. Reduce
                    heat to medium-low, add reserved shrimp and mussels, tucking
                    them down into the rice, and cook again without stirring,
                    until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don&apos;t open.)
                  </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and
                    then serve.
                  </Typography>
                </CardContent>
              </Collapse>
            </Paper>
          </Grid>
          <Grid item sm={4}>
            {" "}
            <Paper
              elevation={4}
              sx={{
                maxWidth: 370,
                height: { xs: "100%", sm: 540, xl: 480 },
                p: { xs: 2, sm: 3 },
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image="/assets/images/Pic-5.jpg"
                alt="Paella dish"
              />
              <Typography
                variant="h5"
                fontWeight={"bold"}
                sx={{ py: 2, mb: -1 }}
              >
                Recreate options
              </Typography>
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Exhausted with the same assessment creation for multiple
                  teams? Here we come with a solution to your problem. You can
                  repeat the assessment with different questions with a few
                  clicks.
                </Typography>
              </Box>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                  <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep
                    skillet over medium-high heat. Add chicken, shrimp and
                    chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate
                    and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and
                    fragrant, about 10 minutes. Add saffron broth and remaining
                    4 1/2 cups chicken broth; bring to a boil.
                  </Typography>
                  <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with
                    artichokes and peppers, and cook without stirring, until
                    most of the liquid is absorbed, 15 to 18 minutes. Reduce
                    heat to medium-low, add reserved shrimp and mussels, tucking
                    them down into the rice, and cook again without stirring,
                    until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don&apos;t open.)
                  </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and
                    then serve.
                  </Typography>
                </CardContent>
              </Collapse>
            </Paper>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{ pt: 2 }}
          spacing={{ xs: 2, sm: 2, xl: 0 }}
          px={{ xs: 2, sm: 30, xl: 45 }}
        >
          <Grid item sm={4}>
            {" "}
            <Paper
              elevation={4}
              sx={{
                maxWidth: 370,
                height: { xs: "100%", sm: 540, xl: 480 },
                p: { xs: 2, sm: 3 },
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image="/assets/images/pic-6.jpg"
                alt="Paella dish"
              />
              <Typography
                variant="h5"
                fontWeight={"bold"}
                sx={{ py: 2, mb: -1 }}
              >
                Mock tests
              </Typography>
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Have you ever attempted any competitive exams before? Do you
                  want to try it with us for fun? Our self-evaluation mock test
                  module provides you with an opportunity to test your knowledge
                  and skills with sample competitive, general, and fun mock
                  tests.
                </Typography>
              </Box>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                  <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep
                    skillet over medium-high heat. Add chicken, shrimp and
                    chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate
                    and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and
                    fragrant, about 10 minutes. Add saffron broth and remaining
                    4 1/2 cups chicken broth; bring to a boil.
                  </Typography>
                  <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with
                    artichokes and peppers, and cook without stirring, until
                    most of the liquid is absorbed, 15 to 18 minutes. Reduce
                    heat to medium-low, add reserved shrimp and mussels, tucking
                    them down into the rice, and cook again without stirring,
                    until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don&apos;t open.)
                  </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and
                    then serve.
                  </Typography>
                </CardContent>
              </Collapse>
            </Paper>
          </Grid>
          <Grid item sm={4}>
            {" "}
            <Paper
              elevation={4}
              sx={{
                maxWidth: 370,
                height: { xs: "100%", sm: 540, xl: 480 },
                p: { xs: 2, sm: 3 },
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image="/assets/images/Pic-7.jpg"
                alt="Paella dish"
              />
              <Typography
                variant="h5"
                fontWeight={"bold"}
                sx={{ py: 2, mb: -1 }}
              >
                Best team
              </Typography>
              <Box>
                <Typography variant="body1" color="text.secondary">
                  At tykhere, we are proud to have a dedicated and talented team
                  that is passionate about delivering exceptional results. Our
                  team members bring a diverse range of skills, expertise, and
                  experience to ensure that we meet and exceed our partner's
                  expectations.
                </Typography>
              </Box>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                  <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep
                    skillet over medium-high heat. Add chicken, shrimp and
                    chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate
                    and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and
                    fragrant, about 10 minutes. Add saffron broth and remaining
                    4 1/2 cups chicken broth; bring to a boil.
                  </Typography>
                  <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with
                    artichokes and peppers, and cook without stirring, until
                    most of the liquid is absorbed, 15 to 18 minutes. Reduce
                    heat to medium-low, add reserved shrimp and mussels, tucking
                    them down into the rice, and cook again without stirring,
                    until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don&apos;t open.)
                  </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and
                    then serve.
                  </Typography>
                </CardContent>
              </Collapse>
            </Paper>
          </Grid>
          <Grid item sm={4}>
            {" "}
            <Paper
              elevation={4}
              sx={{
                maxWidth: 370,
                height: { xs: "100%", sm: 540, xl: 480 },
                p: { xs: 2, sm: 3 },
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image="/assets/images/Pic-8.jpg"
                alt="Paella dish"
              />
              <Typography
                variant="h5"
                fontWeight={"bold"}
                sx={{ py: 2, mb: -1 }}
              >
                24/7 Support
              </Typography>
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Whether you encounter a technical issue, need help
                  troubleshooting, or have questions about our
                  products/services, our knowledgeable support team is here to
                  assist you promptly and effectively.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </section>

      {/* section-4 */}
      <sction className="py-5">
        <Grid
          container
          spacing={{ xs: 0, sm: 6, xl: 0 }}
          p={{ xs: 3, sm: 7 }}
          px={{ xs: 0, sm: 10, xl: 45 }}
        >
          <Grid item sm={5} xl={6}>
            <Box
              sx={{
                background: "#f1c50e",
                position: "relative",
                flex: 1,
                maxWidth: "100%",
                padding: "40px 40px 25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box>
                  <img
                    width={"100%"}
                    src="/assets/images/Pic-9.jpg"
                    alt=""
                  />
                </Box>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "bold",
                      color: "#FFFFFF",
                      mt: 2,
                      fontSize: { xs: "1.875rem" },
                    }}
                  >
                    A few words about
                  </Typography>
                </Box>
                <Box mb={{ xs: 0, sm: 12 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#FFFFFF",
                      mt: 4,
                      fontFamily: `"DM Sans", sans-serif !important`,
                    }}
                  >
                    Every member of team believes strongly in the empowering
                    power of knowledge. And we aim to share our knowledge with
                    everyone willing to learn.
                  </Typography>
                </Box>
                {/* <Box
                  sx={{
                    objectFit: "contain",
                    width: "80px",
                    height: "100px",
                    mt: 3,
                  }}
                >
                  <img
                    width={"100%"}
                    src="/assets/images/545682-43841e64.png"
                    alt=""
                  />
                </Box> */}
              </Box>
            </Box>
          </Grid>
          <Grid item sm={7} xl={6} sx={{ padding: 2 }}>
            <Grid
              container
              spacing={{ xs: 1, sm: 6, lg: 2, xl: 6 }}
              textAlign={"center"}
            >
              <Grid item sm={6}>
                <Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "#f1c50e",
                        fontSize: { xs: "2rem", lg: "2rem", xl: "3rem" },
                      }}
                    >
                      500K
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="text-heading">
                      SATISFIED STUDENTS
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="sub-text">
                      Our success is a direct result of the trust and support of
                      our satisfied students. Each and every one of our users
                      has contributed to our growth and evolution.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={6}>
                <Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "#f1c50e",
                        fontSize: { xs: "2rem", lg: "2rem", xl: "3rem" },
                      }}
                    >
                      800+
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="text-heading">
                      TRAINERS/TEACHERS
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="sub-text">
                      As we move forward, our commitment to our users remains
                      unwavering. We are dedicated to providing exceptional
                      experiences, unmatched support, and continuous innovation.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={{ xs: 1, sm: 6 }}
              textAlign={"center"}
              pt={{ xs: 1, sm: 1, lg: 2, xl: 3 }}
            >
              <Grid item sm={6}>
                <Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "#f1c50e",
                        fontSize: { xs: "2rem", lg: "2rem", xl: "3rem" },
                      }}
                    >
                      10K
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="text-heading">MOCK TESTS</Typography>
                  </Box>
                  <Box>
                    <Typography className="sub-text">
                      we believe in empowering individuals to achieve their
                      goals and excel in competitive exams. That's why we are
                      thrilled to offer a unique feature that allows users to
                      access a wide range of mock competitive tests completely
                      free of cost.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item sm={6}>
                <Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "#f1c50e",
                        fontSize: { xs: "2rem", lg: "2rem", xl: "3rem" },
                      }}
                    >
                      80K
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="text-heading">
                      ASSESSMENTS
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="sub-text">
                      Monitor your progress over time and witness your growth by
                      attending new training and assessments. Our platform keeps
                      a record of your previous attempts, allowing you to track
                      improvements and identify areas where you've excelled.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* who we are  */}
        <Grid
          container
          spacing={{ xs: 0, sm: 4 }}
          px={{ xs: 0, sm: 30, xl: 45 }}
        >
          <Grid item sm={6}>
            <Box p={{ xs: 3, sm: 0 }}>
              <Box>
                <h4 className="who_text">Who We Are</h4>
              </Box>
              <Box>
                <h6 className="learn_text">
                  tykhere is a part of Rembros Pvt Ltd. An organization created
                  by an eclectic and passionate group of people to build greater
                  futures through innovation and collective knowledge which
                  contributes a greater push to the save earth initiative.
                </h6>
              </Box>
              {/* <Box mt={4}>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "0",
                    backgroundColor: "rgb(155, 116, 234)",
                    padding: "15px 40px",
                    "&:hover": {
                      backgroundColor: "rgb(155, 116, 234)",
                    },
                    letterSpacing: "1px",
                    fontWeight: 400,
                  }}
                >
                  Learn More
                </Button>
              </Box> */}
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box
              sx={{
                borderRadius: 10,
                width: { xs: "100%", sm: "95%" },
                height: { xs: "100%", sm: "95%" },
                overflow: "hidden",
                p: { xs: 3, sm: 0 },
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                src="/assets/images/Pic-10.jpg"
                alt=""
              />
            </Box>
          </Grid>
        </Grid>

        {/* what we do */}
        <Grid
          container
          spacing={{ xs: 0, sm: 4 }}
          px={{ xs: 0, sm: 30, xl: 45 }}
          py={4}
        >
          <Grid item sm={6}>
            <Box
              sx={{
                borderRadius: 10,
                width: { xs: "100%", sm: "95%" },
                height: { xs: "100%", sm: "95%" },
                overflow: "hidden",
                p: { xs: 3, sm: 0 },
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                src="/assets/images/pic-11.jpg"
                alt=""
              />
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box p={{ xs: 3, sm: 0 }}>
              <Box>
                <h4 className="who_text">What We Do</h4>
              </Box>
              <Box>
                <h6 className="learn_text">
                  To change from the conventional way of giving assessments to
                  an easy, digital, user-friendly, and affordable way to create
                  assessments. Evaluate your students from anywhere-anytime
                  using tykhere making assessment creation simple and easy. Now
                  with tykhere, evaluating your students in a short time is
                  simple and easy.
                </h6>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </sction>

      {/* card */}
      <section className="bg-light py-5">
        <Box p={{ xs: 0, sm: 0 }} px={{ xs: 5, sm: 0, lg: 10, xl: 40 }}>
          <Grid container spacing={10}>
            <Grid item sm={3}>
              {" "}
              {/* basic */}
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                  p: 2,
                  height: 400,
                  width: 300,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Grid container>
                    <Grid item sm={9}>
                      <Box>
                        <h5 style={{ fontWeight: "bold" }}>Basic</h5>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pt: 1,
                          }}
                          className="subscribe-card-text"
                        >
                          <Box>
                            <h6 className="p-style">Reg Price</h6>
                            <h6 className="p-style">You save</h6>
                          </Box>
                          <Box ml={2}>
                            <del className="price-style">1499/</del>
                            <span className="price-style">year</span>
                            <h6 className="price-style">600/year</h6>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item sm={3}>
                      <Box
                        sx={{
                          width: { xs: "50px", sm: "100%" },
                          ml: { xs: 6, sm: 0 },
                        }}
                      >
                        <img
                          width={"100%"}
                          src="/assets/images/subscription.svg"
                          alt="no image"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box mt={2}>
                  <h6 style={{ color: "#FF0000" }}>Limited Time Offer</h6>
                </Box>
                <Box mt={1}>
                  <h4>
                    Total : <b style={{ fontSize: "30px" }}>899</b>/year{" "}
                  </h4>
                </Box>
                <Box mt={2} sx={{ color: "#b3b3b3" }}>
                  <span>30 Assessments per month </span> <br />
                  <span>200 headcounts per assessment</span>
                </Box>
                <Box mt={4} mb={3} sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 10,
                      p: "15px 30px",
                      backgroundColor: "#db545a",
                      "&:hover": {
                        backgroundColor: "#db545a",
                      },
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Subscribe Now
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={3}>
              {" "}
              {/* standard */}
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                  p: 2,
                  height: 400,
                  width: 300,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Grid container>
                    <Grid item sm={9}>
                      <Box>
                        <h5 style={{ fontWeight: "bold" }}>Standard</h5>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pt: 1,
                          }}
                          className="subscribe-card-text"
                        >
                          <Box>
                            <h6 className="p-style">Reg Price</h6>
                            <h6 className="p-style">You save</h6>
                          </Box>
                          <Box ml={2}>
                            <del className="price-style">2199/</del>
                            <span className="price-style">year</span>
                            <h6 className="price-style">800/year</h6>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item sm={3}>
                      <Box
                        sx={{
                          width: { xs: "50px", sm: "100%" },
                          ml: { xs: 6, sm: 0 },
                        }}
                      >
                        <img
                          width={"100%"}
                          src="/assets/images/subscription.svg"
                          alt="no image"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box mt={2}>
                  <h6 style={{ color: "#FF0000" }}>Limited Time Offer</h6>
                </Box>
                <Box mt={1}>
                  <h4>
                    Total : <b style={{ fontSize: "30px" }}>1399</b>/year{" "}
                  </h4>
                </Box>
                <Box mt={2} sx={{ color: "#b3b3b3" }}>
                  <span>60 Assessments per month </span> <br />
                  <span>200 headcounts per assessment</span>
                </Box>
                <Box mt={4} mb={3} sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 10,
                      p: "15px 30px",
                      backgroundColor: "#db545a",
                      "&:hover": {
                        backgroundColor: "#db545a",
                      },
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Subscribe Now
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item sm={3}>
              {" "}
              {/* premimum */}
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                  p: 2,
                  height: 400,
                  width: 300,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Grid container>
                    <Grid item sm={9}>
                      <Box>
                        <h5 style={{ fontWeight: "bold" }}>Premium</h5>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pt: 1,
                          }}
                          className="subscribe-card-text"
                        >
                          <Box>
                            <h6 className="p-style">Reg Price</h6>
                            <h6 className="p-style">You save</h6>
                          </Box>
                          <Box ml={2}>
                            <del className="price-style">3299/</del>
                            <span className="price-style">year</span>
                            <h6 className="price-style">1100/year</h6>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item sm={3}>
                      <Box
                        sx={{
                          width: { xs: "50px", sm: "100%" },
                          ml: { xs: 6, sm: 0 },
                        }}
                      >
                        <img
                          width={"100%"}
                          src="/assets/images/subscription.svg"
                          alt="no image"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box mt={2}>
                  <h6 style={{ color: "#FF0000" }}>Limited Time Offer</h6>
                </Box>
                <Box mt={1}>
                  <h4>
                    Total : <b style={{ fontSize: "30px" }}>2199</b>/year{" "}
                  </h4>
                </Box>
                <Box mt={2} sx={{ color: "#b3b3b3" }}>
                  <span>20 Assessments per month </span> <br />
                  <span>200 headcounts per assessment</span>
                </Box>
                <Box mt={4} mb={3} sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 10,
                      p: "15px 30px",
                      backgroundColor: "#db545a",
                      "&:hover": {
                        backgroundColor: "#db545a",
                      },
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Subscribe Now
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item sm={3}>
              {/* enterprise */}
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                  height: 400,
                  width: 300,
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box>
                  <h5 style={{ fontWeight: "bold" }}>Enterprise Platform</h5>
                  <h6 style={{ paddingTop: 10 }}>
                    Contact us for the specifics
                  </h6>
                </Box>

                <Box mt={4} mb={3} sx={{ textAlign: "center" }}>
                  <Button
                    onClick={() => navigate("/contact-us")}
                    variant="outlined"
                    sx={{
                      borderRadius: 10,
                      p: "15px 30px",
                      color: "rgb(155, 116, 234)",
                      padding: "15px 40px",
                      borderColor: "rgb(155, 116, 234)",
                    }}
                  >
                    Contact us
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gridGap: "20px",
              p: { xs: 5, sm: 0 },
            }}
          ></Box> */}
        </Box>
      </section>

      {/* carousel */}
      <Carousel />
    </>
  );
}

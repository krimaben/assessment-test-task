import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ASSESSMENTS } from "../gql/queries";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import FormComponent from "./FormComponent";
import { Assessment } from "../types";
import {
  Button,
  Typography,
  Box,
  MobileStepper,
  Container,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface AssessmentData {
  assessmentCollection: {
    items: Assessment[];
  };
}

const truncateContent = (html: string, limit: number) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  tempDiv.querySelectorAll("p").forEach((p) => {
    const textContent = p.textContent || "";
    if (textContent.length > limit) {
      p.textContent = `${textContent.substring(0, limit)}...`;
    }
  });

  return tempDiv.innerHTML;
};

const AssessmentList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { loading, error, data } = useQuery<AssessmentData>(GET_ASSESSMENTS);

  // if (loading)
  //   return (
  //     <Box sx={{ height: "100%", width: "100%" }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // if (error)
  //   return <Typography color="error">Error: {error.message}</Typography>;

  const [expanded, setExpanded] = useState<string | null>(null);

  const handleToggle = (slug: string) => {
    setExpanded(expanded === slug ? null : slug);
  };

  return (
    <Box>
      {data?.assessmentCollection?.items?.map((assessment) => {
        const introHtml = documentToHtmlString(
          assessment.questions.pages.length === currentPage
            ? assessment.resultsIntro.json
            : assessment.intro.json
        );
        const isExpanded = expanded === assessment.slug;
        const contentToRender = isExpanded
          ? introHtml
          : truncateContent(introHtml, 100);

        return (
          <Box key={assessment.slug} sx={{ mb: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              padding="8px 16px"
              boxShadow="0 0 7px rgba(0,0,0,.1)!important"
              borderBottom="1px solid #E3E3E3"
              position="sticky"
              top="0"
              zIndex="9"
              sx={{
                background: "#fff",
              }}
            >
              <Typography variant="h4" sx={{ color: "rgb(1, 97, 155)" }}>
                <strong>{assessment.name}</strong>
              </Typography>
              <Typography
                variant="subtitle2"
                display="flex"
                alignItems="center"
                gap="10px"
                sx={{ color: "rgb(1, 97, 155)", fontWeight: "600" }}
              >
                <AccessTimeIcon
                  style={{
                    fontSize: "18px",
                    color: "rgb(1, 97, 155)",
                  }}
                />{" "}
                Takes only{" "}
                {assessment.questions.pages.reduce(
                  (acc, curr) => (acc += curr.elements.length),
                  0
                ) * 0.5}{" "}
                minutes
              </Typography>
            </Box>
            <Container>
              <Box sx={{}}>
                <Box
                  sx={{
                    mt: 2,
                    "& h1": {
                      color: "#4B4B4B",
                    },
                    "& p": {
                      margin: "8px 0 0",
                      color: "#4B4B4B",
                      fontSize: "16px",
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: contentToRender,
                  }}
                />
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => handleToggle(assessment.slug)}
                  sx={{
                    padding: 0,
                    textDecoration: "underline",
                    marginTop: "-18px",
                  }}
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </Button>
              </Box>

              {currentPage !== assessment.questions.pages.length && (
                <MobileStepper
                  variant="progress"
                  steps={assessment.questions.pages.length}
                  position="static"
                  activeStep={currentPage}
                  sx={{
                    width: "100%",
                    "& .MuiLinearProgress-root": {
                      width: "100%",
                    },
                  }}
                  nextButton
                  backButton
                />
              )}
              <FormComponent
                pages={assessment.questions.pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Container>
          </Box>
        );
      })}
    </Box>
  );
};

export default AssessmentList;

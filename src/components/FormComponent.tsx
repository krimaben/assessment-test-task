import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import { Page } from "../types";
import { searchResources, UserAnswers } from "../services/AlgoliaClient";

import FormRenderer from "./FormRenderer";

interface FormComponentProps {
  pages: Page[];
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const FormComponent: React.FC<FormComponentProps> = ({
  pages,
  currentPage,
  setCurrentPage,
}) => {
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [formTouched, setFormTouched] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleChange = (name: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNextPage = async () => {
    setFormTouched(true);
    const currentElements = pages[currentPage].elements;
    const isValid = currentElements.every((element) => {
      const { name, type } = element;
      return type === "boolean"
        ? true
        : formValues[name] !== undefined && formValues[name] !== "";
    });

    if (isValid) {
      setFormTouched(false);
      if (currentPage === pages.length - 1) {
        const results = await searchResources(formValues as UserAnswers);
        setSearchResults(results);
      }
      setCurrentPage(Math.min(currentPage + 1, pages.length));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  return (
    <Card variant="outlined" style={{ marginBottom: "2em" }}>
      <CardContent>
        {searchResults.length > 0 && currentPage === pages.length ? (
          <Grid container spacing={2} style={{ marginTop: "2em" }}>
            {searchResults.map((result) => (
              <Grid item xs={12} sm={6} md={4} key={result.objectID}>
                <Card sx={{ height: 400, border: "1px solid #E3E3E3" }}>
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "#333", marginBottom: "10px" }}
                    >
                      <strong>{result.title}</strong>
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "#4B4B4B" }}>
                      {result.author}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, flexGrow: 1 }}>
                      {result.type}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, flexGrow: 1 }}>
                      {result.description}
                    </Typography>
                    {result.imageUrl && (
                      <Box
                        component="img"
                        src={result.imageUrl}
                        alt={result.title}
                        loading="lazy"
                        sx={{
                          mt: 2,
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <FormRenderer
              formValues={formValues}
              handleChange={handleChange}
              elements={pages[currentPage].elements}
              formTouched={formTouched}
            />
            <Box display={"flex"} justifyContent={"space-between"}>
              {currentPage !== 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ background: "rgb(1, 97, 155)" }}
                  onClick={handlePreviousPage}
                >
                  Previous
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: "auto", background: "rgb(1, 97, 155)" }}
                onClick={handleNextPage}
              >
                {currentPage < pages.length - 1 ? "Next" : "Submit"}
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FormComponent;

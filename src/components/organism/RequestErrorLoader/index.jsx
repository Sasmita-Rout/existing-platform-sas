import { useMemo } from "react";
import PropTypes from "prop-types";
import { isObject, isEmpty } from "lodash";
import ErrorIcon from "@mui/icons-material/Error";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { alpha, useTheme } from "@mui/material/styles";
import { Box, Typography, CircularProgress, Grid2 } from "@mui/material";
import NoDataIcon from "./NoDataIcon";

const RequestErrorLoader = ({
  children,
  fullWidth,
  body = {},
  minHeight,
  hideEmpty,
  fullScreen,
  hideEmptyIcon,
  hideBackground,
  overridedLoader,
  title = "Loading...",
  overrideNoDataContainer,
  emptyMsg = "No Results Found",
  errorMsg = "Something went wrong.",
  fitToParent,
}) => {
  const theme = useTheme();
  const { request, data, error } = body || {};
  let fullScreenStyles = {};
  if (fullScreen && request) {
    fullScreenStyles = {
      top: 0,
      left: 0,
      zIndex: 999,
      width: fitToParent ? "100%" : "100vw",
      height: fitToParent ? "100%" : "100vh",
      display: "flex",
      position: fitToParent ? "absolute" : "fixed",
      alignItems: "center",
      backgroundColor: alpha(theme.palette.background.paper, 0.9),
    };
  }

  const LoadingScreen = () =>
    overridedLoader ? (
      overridedLoader
    ) : (
      <Grid2
        xs
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: "5",
        }}
      >
        <CircularProgress size={30} />
        <Typography variant="h6" ml={2} color="text.primary">
          {title}
        </Typography>
      </Grid2>
    );

  const EmptyScreen = () =>
    overrideNoDataContainer ? (
      overrideNoDataContainer
    ) : (
      <Grid2
        xs
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        sx={{ position: "relative", width: "100%", my: 2 }}
      >
        {!hideEmptyIcon && <NoDataIcon sx={{ fontSize: 64 }} />}
        <Typography>{emptyMsg}</Typography>
      </Grid2>
    );

  const ErrorScreen = () => (
    <Grid2
      xs
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      sx={{ position: "relative", width: "100%" }}
    >
      {!hideEmptyIcon && <ErrorIcon sx={{ color: "error.main", mb: 1 }} />}
      <Typography>{errorMsg}</Typography>
    </Grid2>
  );

  const ChildrenScreen = () => (
    <Box
      sx={{
        transition: "2s all",
        width: fullWidth ? "100%" : "auto",
        opacity: request ? (!hideBackground ? 0.25 : 0) : 1,
      }}
    >
      {children}
    </Box>
  );

  const isDataEmpty = useMemo(() => {
    if (!data) {
      return true;
    } else {
      return data &&
        ((isObject(data) && isEmpty(data)) ||
          (Array.isArray(data) && data.length === 0))
        ? true
        : false;
    }
  }, [data]);

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      display={isDataEmpty ? "flex" : "block"}
      sx={{
        position: "relative",
        minHeight: minHeight || "auto",
        ...fullScreenStyles,
      }}
    >
      {error ? (
        <ErrorScreen />
      ) : !hideBackground ? (
        <>
          {request && <LoadingScreen />}
          {!request && isDataEmpty && !hideEmpty && <EmptyScreen />}
          <ChildrenScreen />
        </>
      ) : (
        <>
          {request && <LoadingScreen />}
          {!request && isDataEmpty && !hideEmpty ? (
            <EmptyScreen />
          ) : (
            <ChildrenScreen />
          )}
        </>
      )}
    </Box>
  );
};

RequestErrorLoader.propTypes = {
  body: PropTypes.object,
  title: PropTypes.string,
  hideEmpty: PropTypes.bool,
  fullWidth: PropTypes.bool,
  fullScreen: PropTypes.bool, // To make the loader as full screen
  emptyMsg: PropTypes.string,
  errorMsg: PropTypes.string,
  minHeight: PropTypes.number,
  children: PropTypes.element,
  hideEmptyIcon: PropTypes.bool,
  hideBackground: PropTypes.bool,
  overridedLoader: PropTypes.element,
  overrideNoDataContainer: PropTypes.element,
};

export default RequestErrorLoader;

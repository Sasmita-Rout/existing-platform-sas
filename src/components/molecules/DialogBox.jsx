import React from "react";
import {
  Fade,
  Slide,
  Stack,
  Dialog,
  Divider,
  IconButton,
  DialogTitle,
  useMediaQuery,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { styled, useTheme } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialogContainer = styled(Dialog)(
  ({ dialogPadding, contentPadding, theme }) => ({
    "& .MuiDialog-paper": {
      padding: dialogPadding,
    },
    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    "& .MuiDialogContent-root": {
      padding: contentPadding || theme.spacing(3),
    },
    "& .MuiDialogActions-root": {
      paddingBottom: theme.spacing(2),
    },
  })
);

const DialogBox = ({
  actions,
  children,
  title = "",
  openDialog,
  closeDialog,
  contentPadding,
  closeIcon = true,
  fullScreen = false,
  showDivider = false,
  dialogPadding = "0px",
  closeIconColor = "black",
  titleAlignment = "left", // 'left' | 'center' | 'right'
  buttonAlignment = "center", // 'start' | 'center' | 'end'
  showTransition = true, // This add's transition to the dialogBox
  size = "sm", // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false | string
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderCloseIcon = () => (
    <IconButton
      aria-label="close"
      onClick={closeDialog}
      id="dialog_close_button"
      sx={{
        top: 12,
        right: 12,
        zIndex: "9",
        position: "absolute",
        color: closeIconColor,
      }}
    >
      <CloseIcon />
    </IconButton>
  );

  return (
    <>
      <StyledDialogContainer
        fullWidth
        maxWidth={size}
        open={openDialog}
        onClose={closeDialog}
        dialogPadding={dialogPadding}
        contentPadding={contentPadding}
        aria-labelledby="mui-core-dialog-box"
        fullScreen={isMobile && fullScreen ? fullScreen : false}
        TransitionComponent={showTransition ? Transition : Fade}
      >
        {title && (
          <DialogTitle
            variant="h3"
            color="text.primary"
            textAlign={titleAlignment}
            id="mui-core-dialog-box-title"
          >
            {title}
          </DialogTitle>
        )}
        {closeDialog && closeIcon && renderCloseIcon()}
        {showDivider && <Divider />}
        <DialogContent>{children}</DialogContent>
        {actions && (
          <Stack alignItems={buttonAlignment}>
            <DialogActions>{actions}</DialogActions>
          </Stack>
        )}
      </StyledDialogContainer>
    </>
  );
};

DialogBox.propTypes = {
  ...Dialog.propTypes,
  size: PropTypes.string,
  title: PropTypes.string,
  closeIcon: PropTypes.bool,
  openDialog: PropTypes.bool,
  actions: PropTypes.element,
  fullScreen: PropTypes.bool,
  closeDialog: PropTypes.func,
  children: PropTypes.element,
  showDivider: PropTypes.bool,
  showTransition: PropTypes.bool,
  dialogPadding: PropTypes.string,
  titleAlignment: PropTypes.string,
  buttonAlignment: PropTypes.string,
};

export default DialogBox;

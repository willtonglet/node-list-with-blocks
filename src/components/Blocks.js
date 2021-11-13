import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Box,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import colors from "../constants/colors";

function Blocks({ blocks }) {
  const classes = useStyles();

  const renderBlocks = blocks.list.map((block) => (
    <Box className={classes.accordionContentBox}>
      <Typography className={classes.accordionContentID}>
        {("000" + block.attributes.index).substr(-3)}
      </Typography>
      <Typography className={classes.accordionContentTitle}>
        {block.attributes.data}
      </Typography>
    </Box>
  ));

  if (!blocks.loading && !blocks.list && blocks.list.length === 0)
    return (
      <Box className={classes.accordionContentEmpty}>
        <Typography className={classes.accordionContentTitle}>
          There was a problem with the server
        </Typography>
      </Box>
    );

  if (blocks.loading)
    return (
      <Box className={classes.accordionContentEmpty}>
        <CircularProgress size={18} />
        <Typography className={classes.accordionContentTitle}>
          Loading blocks...
        </Typography>
      </Box>
    );

  return renderBlocks;
}

const useStyles = makeStyles((theme) => ({
  accordionContentEmpty: {
    flex: 1,
    padding: "3rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  accordionContentBox: {
    padding: "0.5rem",
    backgroundColor: colors.box,
    borderRadius: 2,
    margin: "2px 0",
  },
  accordionContentID: {
    fontSize: theme.typography.pxToRem(11),
    letterSpacing: 2,
    fontWeight: 600,
    color: colors.blue,
  },
  accordionContentTitle: {
    fontSize: theme.typography.pxToRem(14),
  },
}));

Node.propTypes = {
  blocks: PropTypes.shape({
    loading: PropTypes.bool,
    list: PropTypes.array,
  }),
};

export default Blocks;

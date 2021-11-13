import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node,
  };
};

const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res,
  };
};

const checkNodeStatusFailure = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);

      if (res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
        return;
      }

      const json = await res.json();

      dispatch(checkNodeStatusSuccess(node, json));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach((node) => {
      dispatch(checkNodeStatus(node));
    });
  };
}

const blockLoadingStatus = (node) => {
  return {
    type: types.BLOCK_STATUS_LOADING,
    node,
  };
};

const blockSuccessStatus = (node, res) => {
  return {
    type: types.BLOCK_STATUS_SUCCESS,
    node,
    res,
  };
};

const blockErrorStatus = (node) => {
  return {
    type: types.BLOCK_STATUS_ERROR,
    node,
  };
};

export function listNodeBlocks(node) {
  return async (dispatch) => {
    try {
      dispatch(blockLoadingStatus(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if (res.status >= 400) {
        dispatch(blockErrorStatus(node));
        return;
      }

      const json = await res.json();

      dispatch(blockSuccessStatus(node, json));
    } catch (err) {
      dispatch(blockErrorStatus(node));
    }
  };
}

import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  DELETE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM
} from "./types";
import streams from "../apis/streams";
import history from "../history";
// A common pattern that I have seen is to use a try / catch block in each action creator and then dispatch an error action, with the message as a payload or even some generic custom message

//create asyncronous action creator.
export const createStream = formValues => async (dispatch, getState) => {
  // create History object on a separate file instead of "BrowserRouter's one"
  // so we can access to the
  // to acheive, make another router instead of BrowserRouter.
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });
  dispatch({
    type: CREATE_STREAM,
    payload: response.data
  });
  history.push("/"); // this makes user redirect to '/' after action is called.
};
export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");
  dispatch({
    type: FETCH_STREAMS,
    payload: response.data
  });
};
export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({
    type: FETCH_STREAM,
    payload: response.data
  });
};
export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({
    type: EDIT_STREAM,
    payload: response.data
  });
  history.push("/");
};
export const deleteStream = (id, formValues) => async dispatch => {
  // const response = await streams.delete(`/streams/${id}`, formValues);
  await streams.delete(`/streams/${id}`, formValues);
  dispatch({
    type: DELETE_STREAM,
    payload: id
  });
  history.push("/");
};

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

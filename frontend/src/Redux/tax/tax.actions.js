import {
  GET_INPUT_SUCCESS,
  GET_RESULT_ERROR,
  GET_RESULT_LOADING,
  GET_RESULT_SUCCESS,
} from "./tax.types";

export const getInput = (csv) => async (dispatch) => {
  dispatch({ type: GET_RESULT_LOADING });
  try {
    let formData = new FormData();
    console.log(csv);
    formData.append("invoices", csv);
    console.log(formData);
    await fetch("https://tax-calc.onrender.com/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: GET_INPUT_SUCCESS, payload: data.input });
      });
  } catch (e) {
    dispatch({ type: GET_RESULT_ERROR });
  }
};
export const getResult = (csv) => async (dispatch) => {
  dispatch({ type: GET_RESULT_LOADING });
  try {
    let formData = new FormData();
    console.log(csv);
    formData.append("invoices", csv);
    console.log(formData);
    fetch("https://tax-calc.onrender.com/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: GET_RESULT_SUCCESS, payload: data.result });
      });
  } catch (e) {
    dispatch({ type: GET_RESULT_ERROR });
  }
};

// export const getAllEvents =
//   (token, gameType = "") =>
//   async (dispatch) => {
//     dispatch({ type: GET_EVENTS_LOADING });
//     try {
//       let response = await axios.get("https://truesports.onrender.com/event/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // let events = response.data.filter((event) => event.userId !== user._id);
//       if (!gameType) {
//         dispatch({ type: GET_EVENTS_SUCCESS, payload: response.data });
//         return response.data;
//       } else {
//         let events = response.data.filter(
//           (event) => event.gameType === gameType
//         );
//         dispatch({ type: GET_EVENTS_SUCCESS, payload: events });
//         return response.data;
//       }
//     } catch (e) {
//       dispatch({ type: GET_EVENTS_ERROR });
//     }
//   };

// export const getMyEvents = (token, user) => async (dispatch) => {
//   dispatch({ type: GET_EVENTS_LOADING });
//   try {
//     let response = await axios.get("https://truesports.onrender.com/event/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     let events = response.data.filter((event) => event.userId === user._id);
//     dispatch({ type: GET_EVENTS_SUCCESS, payload: events });
//     console.log(response);
//     return response.data;
//   } catch (e) {
//     dispatch({ type: GET_EVENTS_ERROR });
//   }
// };

// export const postEvents = (token, event) => async (dispatch) => {
//   dispatch({ type: POST_EVENTS_LOADING });
//   try {
//     await axios.post("https://truesports.onrender.com/event/create", event, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     dispatch({ type: POST_EVENTS_SUCCESS });
//   } catch (e) {
//     dispatch({ type: POST_EVENTS_ERROR });
//   }
// };

// export const bookEvents = (eventId, event) => async (dispatch) => {
//   dispatch({ type: PATCH_EVENTS_LOADING });
//   try {
//     await axios.patch(
//       `https://truesports.onrender.com/event/edit/${eventId}`,
//       event,
//       {
//         // headers: {
//         //   Authorization: `Bearer ${token}`,
//         // },
//       }
//     );
//     dispatch({ type: PATCH_EVENTS_SUCCESS });
//   } catch (e) {
//     dispatch({ type: PATCH_EVENTS_ERROR });
//   }
// };

// export const searchEvents = (r) => async (dispatch) => {
//   dispatch({ type: GET_EVENTS_LOADING });
//   try {
//     let response = await axios.get(
//       `https://truesports.onrender.com/event/search?q=${r}`
//     );
//     dispatch({ type: GET_EVENTS_SUCCESS, payload: response.data });
//     console.log(response);
//     return response.data;
//   } catch (e) {
//     dispatch({ type: GET_EVENTS_ERROR });
//   }
// };

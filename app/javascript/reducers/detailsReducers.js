import * as actionTypes from '../actions/actionTypes'

function fetchDetails(
  state = {
    details: null,
    fetching: false,
    displayAlert: false,
    disableActionBtn: false,
    resendEmailUserId: [],
    resendEmailStatus: null,
    initialDetails: null,
    saveSuccessAlert: null,
  },
  action
) {
  switch (action.type) {
    case actionTypes.FETCH_DETAILS_API_CALL_REQUEST:
      return {
        ...state,
        fetching: true,
        fetchDetailsError: null,
        saveDetailsError: null,
      }

    case actionTypes.FETCH_DETAILS_API_CALL_SUCCESS:
      const userRecords = {
        XHRStatus: 'ready',
        records: { ...action.details },
      }
      return {
        ...state,
        fetching: false,
        details: userRecords,
        disableActionBtn: true,
        fetchDetailsError: null,
        resendEmailUserId: state.resendEmailUserId,
        initialDetails: userRecords.records,
      }

    case actionTypes.FETCH_DETAILS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        details: null,
        fetchDetailsError: action.error,
        displayAlert: false,
        initialDetails: null,
      }

    case actionTypes.CLEAR_USER_DETAILS:
      return {
        details: null,
        fetching: false,
        displayAlert: false,
        resendEmailUserId: state.resendEmailUserId,
        initialDetails: null,
        saveSuccessAlert: null,
      }

    case actionTypes.SAVE_USER_DETAILS_API_CALL_REQUEST:
      return { ...state, fetching: true, saveDetailsError: null }

    case actionTypes.SAVE_USER_DETAILS_API_CALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        saveDetailsError: null,
        displayAlert: true,
        initialDetails: state.details.records,
        saveSuccessAlert: action.successAlert,
      }

    case actionTypes.SAVE_USER_DETAILS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        saveDetailsError: action.error,
        displayAlert: true,
      }

    case actionTypes.CLEAR_SAVE_ALERT:
      return {
        ...state,
        fetching: false,
        displayAlert: false,
      }

    case actionTypes.HANDLE_DROPDOWN_CHANGE:
      return {
        ...state,
        displayAlert: false,
        disableActionBtn: false,
        details: {
          ...state.details,
          records: {
            ...state.details.records,
            user: {
              ...state.details.records.user,
              [action.payload.name]: action.payload.value,
            },
          },
        },
      }

    case actionTypes.HANDLE_USER_INPUT_CHANGE:
      return {
        ...state,
        displayAlert: false,
        disableActionBtn: false,
        details: {
          ...state.details,
          records: {
            ...state.details.records,
            user: {
              ...state.details.records.user,
              [action.payload.name]: action.payload.value,
            },
          },
        },
      }

    case actionTypes.USER_STATUS_CHANGE_REQUEST:
      return { ...state, fetching: true, fetchDetailsError: null }

    case actionTypes.USER_STATUS_CHANGE_SUCCESS:
      return {
        ...state,
        fetching: false,
        displayAlert: true,
        saveSuccessAlert: action.successAlert,
        disableActionBtn: false,
        details: state.details
          ? {
              ...state.details,
              records: {
                ...state.details.records,
                user: {
                  ...state.details.records.user,
                  locked: false,
                },
              },
            }
          : null,
        saveDetailsError: null,
      }

    case actionTypes.USER_STATUS_CHANGE_FAILURE:
      return {
        ...state,
        fetching: false,
        saveDetailsError: action.error,
        displayAlert: true,
        saveSuccessAlert: null,
      }

    default:
      return state
  }
}

export default fetchDetails

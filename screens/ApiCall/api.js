import { API_URL, getRequest } from "./apiParam";
import { setFlightDetails } from "../reduxToolkit/flightDetailsSlice";

export const FlightDetailsApi = (setLoading) => {
  let url = API_URL;

  return (dispatch) => {
    getRequest(url)
      .then((res) => {
        if (res.data?.data?.result) {
          dispatch(setFlightDetails(res.data?.data?.result));
        } else {
          console.log('Data is not available or request failed');
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
};
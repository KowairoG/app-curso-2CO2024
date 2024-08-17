import axios from "./axios";
export const getVerificationLogs = (startDate, endDate) => {
    return axios.get('/verification-logs', {
      params: { startDate, endDate },
    });
  };
  
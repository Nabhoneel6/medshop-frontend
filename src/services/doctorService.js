import api from "./api";

export const getDoctors = async () => {
  const { data } = await api.get("/doctors");
  return data.doctors;
};

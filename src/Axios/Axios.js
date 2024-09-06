import axios from 'axios';

const BASE_URL_FOR_SCAN = "http://192.168.1.103:5000";
const BASE_URL_FOR_MYSQL ="http://192.168.1.103:5001";


export const convertImage = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL_FOR_SCAN}/convert_photo`,data)
    return response;
  } catch (error) {
    console.error("An error occurred while converting the image:", error.message);
  }
}

export const add_To_Database = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL_FOR_MYSQL}/add_data`,data)
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("An error occurred while add the image:", error.message);
  }
}

export const fetch_To_Database = async () => {
  try {
    const response = await axios.get(`${BASE_URL_FOR_MYSQL}/fetch_data`);
    return response.data;
    
  } catch (error) {
    console.error("An error occurred while fetching data from the database:", error.message);
  }
};

export const remove_From_Database = async(data) => {
  try {
    const response = await axios.delete(`${BASE_URL_FOR_MYSQL}/delete_data`,{
      data:data
    })
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("An error occurred while removing from the database:", error.message);
  }
}

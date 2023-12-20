import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data to AsyncStorage
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Delete data from AsyncStorage
export const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data deleted successfully');
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

// Get data from AsyncStorage
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Data retrieved successfully:', JSON.parse(value));
      return JSON.parse(value);
    } else {
      console.log('No data found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};



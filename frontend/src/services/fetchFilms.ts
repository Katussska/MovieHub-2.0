export const fetchFilms = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    console.log('Response text:', text); // Log the response text
    let films;
    try {
      films = JSON.parse(text);
    } catch {
      console.error('Received data is not in JSON format');
      return;
    }
    console.log('Data from fetch:', films); // výpis dat
    return films;
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
  }
};

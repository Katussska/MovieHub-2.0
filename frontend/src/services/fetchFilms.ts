export const fetchFilms = async (url: string) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
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

    console.log('Data from fetch:', films);
    return films;
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
  }
};

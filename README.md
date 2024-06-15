## Usage


1. Clone or download the repository to your local machine.


2. Install the required packages.
    ```sh
    npm install
    ```

3. Start the development server.
    ```sh
    npm start
    ```
4. Open the project in your browser at [`http://localhost:3000`](http://localhost:3000) to view your project.


## Approach

1. builds structure of first screen view
2. make an api call using fetch.
3. Maintaining a state using useState hook which can change dynamically.
4. Implements a loader for Processing while api calling.
4. Checking conditions for errors and success.
5. builds success screen and error screen.
6. renders data according to data fetched and handles no city found case. 
7. Implements a dark mode functionality.
8. I have not made any component as their is only one page and no such big reusable code.


## Technology used
HTML, CSS, Javascript, React Js


## Library Used
react-icons(library for icons)

## Limitations

1. As I have used api - "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric".
2. It can fetch only current weather info. THus i have not include Data and time Parameter as they are not useful.
3. response also doesn't give parameter like date and time.
4. For some cities data is not fetched by the api and it is showing "No data found".

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please feel free to open an issue or a pull request.
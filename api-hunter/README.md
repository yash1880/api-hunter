# API Hunter

API Hunter is a React + Redux application for testing GET and POST requests using both `fetch()` and `axios`.
It also connects to a JSON Server mock backend and displays API endpoint details, method, status, and response data in the browser.

## Features

- React form input for API endpoint, HTTP method, POST body, and request library
- Redux Toolkit store for global API state
- Async thunk actions for `fetch()` and `axios`
- JSON Server mock backend on `http://localhost:5000`
- Response output with endpoint, method, status, HTTP code, and formatted JSON data

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the JSON Server backend:

```bash
npm run server
```

3. Start the React app:

```bash
npm run dev
```

4. Open the browser at the URL shown by Vite.

## JSON Server Endpoints

- `GET http://localhost:5000/users`
- `GET http://localhost:5000/posts`
- `POST http://localhost:5000/users`

The mock backend data is stored in `server/db.json`.

## Usage

1. Enter an API endpoint URL in the form.
2. Choose `GET` or `POST`.
3. Choose `fetch()` or `axios`.
4. For POST, enter JSON data or leave empty for default sample data.
5. Click the request button to send the API call.

## Project Structure

- `src/App.jsx` — main application layout
- `src/components/ApiForm.jsx` — request form UI
- `src/components/ResponseDisplay.jsx` — response summary display
- `src/store/apiSlice.js` — API thunk actions and reducers
- `src/store/index.js` — Redux store configuration
- `server/db.json` — mock JSON Server dataset

## Response Output

The app displays:

- API endpoint used
- HTTP method selected
- Request library used
- Current status (`loading`, `error`, or `success`)
- HTTP response code
- Response JSON formatted in a readable block

## Notes

Try sample endpoints:

- `https://jsonplaceholder.typicode.com/users`
- `https://jsonplaceholder.typicode.com/posts`
- `http://localhost:5000/users`
- `http://localhost:5000/posts`


# Currency Converter App

A modern and minimalistic currency converter app built with React and Vite, utilizing a free currency exchange rates API.

## Features

- Convert from one currency to another with live exchange rates.
- Display list of currencies available for conversion.
- display the last 5 transactions with timestamps.

## Technologies Used

- React
- Vite (Next Generation Frontend Tooling)
- Axios (HTTP client for making API requests)
- @fawazahmed0/currency-api (Free currency exchange rates API)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/visorry/currency-converter.git
   cd currency-converter
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the app.

### How to Use

- Select the currency you want to convert from and to using the dropdown selectors.
- Enter the amount you wish to convert.
- Click the "Convert" button to see the converted amount.
- The last 5 transactions are displayed below the converter with timestamps.

### API Usage

- The app uses the [@fawazahmed0/currency-api](https://github.com/fawazahmed0/exchange-api) for fetching currency exchange rates.

### Folder Structure

```
currency-converter/
├── public/                 # Static assets
├── src/                    # Source files
│   ├── components/         # React components
│   ├── App.jsx             # Main application component
│   ├── index.css           # Global styles
│   ├── main.jsx            # Entry point
├── README.md               # Project README
├── package.json            # Dependencies and scripts
└── ...
```


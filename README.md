# binanace_data_visualization
The Binance Data Visualization project is a web application that utilizes the Binance API to visualize real-time cryptocurrency data and provide a user-friendly trading environment. <br>
The project was built on React and Next.js, and real-time data updates were implemented using React Query and WebSocket.

<br>

## ⚙️ Tech Stack
Frontend Framework: React, Next.js <br>
Styling: Tailwind CSS <br>
State Management: React Query, WebSocket, Context API <br>
Data Fetching: Binance API (REST & WebSocket) <br>
Charting Library: ApexCharts <br>
Others: Recoil (for partial state management), ESLint, Prettier <br>

<br>

## 🌟 Key Features

#### Real-Time Order Book
- Visualizes real-time buy/sell order data using **WebSocket** and **React Query**.
- Provides sorted and summarized data to help users easily understand market conditions.

#### Real-Time Trading Chart (Candlestick Chart)
- Implements real-time candlestick charts using **ApexCharts**.
- Utilizes Binance API's `klines` data to support various time intervals (1m, 1h, 1d, etc.).

#### Trading Volume Analysis
- Visualizes buy/sell volume ratio as **bar graphs** for a quick overview of market buy/sell balance.

#### Trading Form (Order Input)
- Allows users to input custom price and quantity for buy/sell orders with an intuitive UI.
- Dynamically updates the form with **real-time data integration**.

#### Coin List and Real-Time Price Changes (Top Movers)
- Displays a **real-time updated cryptocurrency list** and **24-hour price change percentages**.

#### Dark Mode Support
- Automatically adapts to the user's environment with **light and dark mode support**.


<br>

## Version
|    **Version**  |  **Description**   |
|:---------------:|:------------------:|
| 0.1.0 | first Application. |

<br>

## Dependencies
|    **Package**  | **Version** | **Description** |
|:---------------:|:-----------:|:---------------:|
| apexcharts | ^4.0.0 | Chart library for data visualization. |
| tailwindcss | ^3.3.3 | Library for applying class style. | 
| @tanstack/react-query | ^5.61.0 | Server Data Health Management Library. | 
| @tanstack/react-table | ^8.20.5 | Table Component Library. | 
| fortawesome | ^0.2.2 | svg icon library. | 


<br>

## Features
|   **Feature**   |                **Description**                |
|:---------------:|:---------------------------------------------:|
| marketTrade |        Recent Market Trading Features         |
| orderbook |              orderbook Features               |
| symbolPrice |           Price for selected symbol           |
| ticker | 24-hour price change statistics data Features |
| trading |   Candlestick data or K-Line data Features    |

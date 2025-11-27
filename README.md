# sysinfo2

A simple full stack application that displays information about a user's computer system.

## Description

sysinfo2 is a web-based application that retrieves and displays real-time system information from your computer. It provides an easy-to-use interface to view hardware and software details about your system.

## Features

- Display CPU information (model, cores, speed)
- Show memory usage (total, used, available)
- View disk storage details
- Display operating system information
- Real-time system monitoring
<!-- - Show network interface details -->

## Tech Stack

### Frontend
- HTML/CSS/JavaScript
- Responsive design for various screen sizes

### Backend
- Node.js server
- System information APIs

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Izuchii/sysinfo2.git
   cd sysinfo2
   ```

<!--
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```
-->
<!-- 4. Open your browser and navigate to `http://localhost:3010` -->
2. Start the application:
   ```bash
   node server
   ```

## Usage

Once the application is running, open your web browser and navigate to the local server URL. The dashboard will display various system information categories including:

- **System**: Operating system type, platform, architecture
- **CPU**: Processor model, number of cores, clock speed
- **Memory**: Total RAM, used memory, free memory
- **Disk**: Storage capacity, used space, available space
<!-- - **Network**: Network interfaces and IP addresses -->

## Project Structure

```
sysinfo2/
├── README.md          # Project documentation
├── server.js          # Backend server main entry code
└── public/            # Frontend static files
    ├── index.html     # Main HTML page
    ├── styles.css     # Stylesheet
    └── script.js      # Frontend JavaScript
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

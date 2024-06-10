
# NTP - Sheet Music Translator

Welcome to NTP, an application designed to help users who do not know how to read sheet music. This tool allows you to upload an XML file of sheet music and translates it into easily readable instructions.

## Features

- **XML Upload**: Upload your sheet music in XML format.
- **Translation**: The app translates the uploaded sheet music into human-readable instructions.
- **Ease of Use**: No prior knowledge of sheet music required.

## Status

This project is currently in **beta** status. We are actively working on improving the functionality and fixing any bugs. Your feedback is valuable to us.

## Getting Started

These instructions will guide you through setting up and using the NTP application on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/en/download/) (v14.x or later)
- [npm](https://www.npmjs.com/get-npm) (v6.x or later)
- [PostgreSQL](https://www.postgresql.org/download/) for the database

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/Raff29/NTP.git
   cd NTP
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up the database:
   - Create a PostgreSQL database.
   - Update the database configuration in \`config.js\` or your environment variables.

4. Start the application:
   \`\`\`bash
   npm start
   \`\`\`

The application should now be running on \`http://localhost:3000\`.

### Using Docker Compose

Alternatively, you can use Docker Compose to set up and run the application. Ensure you have [Docker](https://www.docker.com/products/docker-desktop) installed on your machine.

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/Raff29/NTP.git
   cd NTP
   \`\`\`

2. Start the services:
   \`\`\`bash
   docker-compose up
   \`\`\`

Docker Compose will set up the application along with a PostgreSQL database. The application should now be running on \`http://localhost:3000\`.

## Usage

1. **Register**: Create an account or log in if you already have one.
2. **Upload**: Navigate to the upload section and select your XML file of the sheet music.
3. **Translate**: The application will process the file and provide readable instructions.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (\`git checkout -b feature-branch\`).
3. Make your changes.
4. Commit your changes (\`git commit -m 'Add some feature'\`).
5. Push to the branch (\`git push origin feature-branch\`).
6. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please open an issue or reach out to the repository owner.

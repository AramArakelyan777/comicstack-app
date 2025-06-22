# ComicStack

HOW IT WORKS: https://www.youtube.com/watch?v=37Bf35VhExs
**ComicStack** is a web application for comic and manga enthusiasts to read, rate, and discuss their favorite titles in one place. It supports both English and Armenian languages, allowing users to browse content and interact with the community in their preferred language. Users can create an account to manage their profile and preferences. The platform emphasizes community engagement: readers can participate in discussion forums about comics and even take interactive comic quizzes, in addition to maintaining custom reading lists and rating each comic they read.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Structure](#structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Features
- **User Authentication & Profile Management**: Users can sign up, log in, and manage their profile information (such as display name and avatar). Authentication ensures that each user has a secure account.
- **Comic Reading Interface**: Browse and read comics/manga through an intuitive viewer. The interface allows page-by-page navigation and supports a variety of comic formats.
- **Comic Rating System**: After reading a comic or manga, users can rate it (for example, with stars or scores). These ratings help other users discover popular titles.
- **Custom Readlists**: Users can create and manage personal readlists or collections of comics (e.g. “Favorites” or “To Read”), helping them track their reading progress and save interesting titles.
- **Forum for Discussion**: A built-in forum lets users start and participate in discussions about comics, share recommendations, and engage with the community. Each comic can have its own discussion thread.
- **Bilingual Interface (English/Armenian)**: The entire UI, including comic content and navigation, is available in both English and Armenian. Users can switch languages to read comics and interface text in either language.

## Tech Stack
The codebase is primarily JavaScript (≈90%) with some CSS (≈9%) , reflecting a modern web stack. Key technologies include:
- **Frontend**: React (for the UI), styled with CSS and Chakra UI components for a responsive design, and MobX for client-side state management.
- **Backend**: Node.js with the Express framework to build a RESTful API that serves comic content, user data, and handles authentication.
- **Database**: PostgreSQL hosted on Google Cloud Platform (e.g. Google Cloud SQL) to store user profiles, comic metadata, ratings, comments, etc.
- **File Storage**: Amazon Web Services (AWS) S3 is used for storing comic image files and any other static assets. Uploaded images and comic pages are saved in an S3 bucket for scalable storage and delivery.

## Structure
- **Root**: Contains the main project folders and config files (such as this README.md).
- **client/**: Contains the React frontend application. Inside client , you’ll find package.json , a public/ folder (for static assets like index.html ), and a src/ directory with React components, pages, MobX stores, and CSS.
- **server/**: Contains the Node.js/Express backend. Inside server , you’ll find package.json, and source folders such as routes/, controllers/ , models/ , and configuration files. The Express entry point (e.g. app.js or index.js ) sets up API endpoints, connects to PostgreSQL, and configures AWS S3 for file storage.

## Environment Variables
Configure the following environment variables for development and production:
```bash
# Frontend
REACT_APP_SERVER_URL= The server url

# Backend
PORT= The port on which the Express server runs
DB_HOST= Hostname for PostgreSQL
DB_PORT= Port number (default is 5432)
DB_NAME= Your Postgres DB name
DB_USER= Database username
DB_PASSWORD= Database password
JWT_SECRET= Secret key used to sign JSON Web Tokens for user authentication
AWS_ACCESS_KEY_ID= Your AWS IAM access key ID
AWS_SECRET_ACCESS_KEY= Your AWS IAM secret access key
AWS_S3_BUCKET_NAME= The name of the S3 bucket
AWS_REGION= The AWS region where the S3 bucket is hosted (e.g. us-west).
```
All sensitive values (such as passwords and keys) should be kept in a local .env file (not committed to version control) or configured in the deployment environment.

## Getting Started
Follow these steps to set up the development environment:
### Prerequisites
1. Install Node.js (version 14.x or later recommended)
2. Install PostgreSQL and create a database for the app
3. Install Yarn if you prefer it over npm
4. Obtain AWS credentials with permissions for S3 (for development/testing, you can create an S3 bucket and an IAM user)
5. Ensure your Google Cloud SQL instance is set up
6. Clone the repository
    ```bash
    git clone https://github.com/AramArakelyan777/comicstack-app.git

    cd comicstack-app
    ```
7. Install dependencies
    ```bash
    # Frontend
    cd client
    yarn

    # Backend
    cd ../server
    yarn
    ```
8. Configure .env variables in each directory
9. Run the server and frontend dev server

The React app will typically run on http://localhost:3000 and will proxy API requests to the Express server (e.g. http://localhost:5000/api).

## Contributing
Contributions to ComicStack are welcome! To contribute:
- Fork the repository on GitHub.
- Clone your fork locally and create a feature branch ( git checkout -b my-feature ).
- Make your changes (follow existing code style and structure).
- Add tests or update documentation if needed.
- Commit your changes and push the branch to your fork.
- Open a Pull Request against the original main branch.

## Acknowledgements
- Davit Tadevosyan - Co-developer and collaborator on the ComicStack project (https://github.com/DavitT017).
- Thanks to the maintainers of React, Express, PostgreSQL, AWS SDKs, and other open-source libraries used in this project.

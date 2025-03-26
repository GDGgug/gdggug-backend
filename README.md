# GDG Gug Backend API

This is the backend API for the GDG Gug website. It provides endpoints for managing events, news, and team members.

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3001
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```
   Replace the MongoDB URI with your actual connection string.

## Development

To start the development server:

```
npm run dev
```

This will start the server with hot-reloading enabled.

## Building for Production

To build the project for production:

```
npm run build
```

This will compile the TypeScript code to JavaScript in the `dist` directory.

## Running in Production

To run the server in production mode:

```
npm start
```

## API Endpoints

### Events

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get a single event by ID
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event

### News

- `GET /api/news` - Get all news items
- `GET /api/news/:id` - Get a single news item by ID
- `POST /api/news` - Create a new news item
- `PUT /api/news/:id` - Update a news item
- `DELETE /api/news/:id` - Delete a news item

### Team

- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get a single team member by ID
- `POST /api/team` - Create a new team member
- `PUT /api/team/:id` - Update a team member
- `DELETE /api/team/:id` - Delete a team member

## Deployment

This backend is designed to be deployed to Render or Vercel. Follow these steps:

### Deploying to Render

1. Create a new Web Service in Render
2. Connect your repository
3. Set the build command to `npm install && npm run build`
4. Set the start command to `npm start`
5. Add your environment variables in the Render dashboard

### Deploying to Vercel

1. Create a new project in Vercel
2. Connect your repository
3. Set the build command to `npm run build`
4. Set the output directory to `dist`
5. Add your environment variables in the Vercel dashboard
# gdggug-backend

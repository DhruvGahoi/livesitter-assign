# 🚀 Running project on Your Local Machine
Follow these steps to get this running on your local machine:

Clone the repository:
`git clone https://github.com/DhruvGahoi/livesitter-assign`

Navigate to the project directory:
`cd livesitter-assign`

Install dependencies for both backend and frontend:

Install backend dependencies:
`cd server`
`pip install flask flask-pymongo pymongo dnspython flask-cors`

Install frontend dependencies:
`cd ../client`
`npm install`

Set up environment variables: Create .env files in server directory with the necessary value.
Here's a sample configuration:

Backend .env:

# Server Environment Variables
`MONGODB_URI=mongodb://localhost:27017/your-database-name`

Run the backend server:
`cd server`
`python app.py`

Run the frontend:
`cd ../client`
`npm run dev`
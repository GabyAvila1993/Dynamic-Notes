#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if backend folder exists
if [ ! -d "$SCRIPT_DIR/backend" ]; then
    echo -e "${RED}Error: backend folder not found at $SCRIPT_DIR/backend${NC}"
    exit 1
fi

# Check if frontend folder exists
if [ ! -d "$SCRIPT_DIR/frontend" ]; then
    echo -e "${RED}Error: frontend folder not found at $SCRIPT_DIR/frontend${NC}"
    exit 1
fi

# Function to cleanup on exit
cleanup() {
    echo -e "${YELLOW}Stopping services...${NC}"
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    exit 0
}

# Trap SIGINT and SIGTERM
trap cleanup SIGINT SIGTERM

# ===== BACKEND SETUP =====
echo -e "${YELLOW}Setting up backend...${NC}"

cd "$SCRIPT_DIR/backend"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install backend dependencies${NC}"
        exit 1
    fi
    echo -e "${GREEN}Backend dependencies installed${NC}"
else
    echo -e "${GREEN}Backend node_modules already exists${NC}"
fi

# Create .env from .env.example if it doesn't exist
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo -e "${YELLOW}Creating .env from .env.example...${NC}"
        cp .env.example .env
        echo -e "${GREEN}.env created${NC}"
    else
        echo -e "${YELLOW}Warning: .env.example not found. Continuing without .env${NC}"
    fi
else
    echo -e "${GREEN}.env already exists${NC}"
fi

# Start backend
echo -e "${YELLOW}Starting backend...${NC}"
npm run start:dev &
BACKEND_PID=$!
echo -e "${GREEN}Backend started with PID $BACKEND_PID${NC}"

# Give backend time to start
sleep 3

# ===== FRONTEND SETUP =====
echo -e "${YELLOW}Setting up frontend...${NC}"

cd "$SCRIPT_DIR/frontend"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install frontend dependencies${NC}"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
    echo -e "${GREEN}Frontend dependencies installed${NC}"
else
    echo -e "${GREEN}Frontend node_modules already exists${NC}"
fi

# Start frontend
echo -e "${YELLOW}Starting frontend...${NC}"
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend started with PID $FRONTEND_PID${NC}"

# Give frontend time to start
sleep 2

# ===== DISPLAY URLS =====
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Services started successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${YELLOW}Frontend: ${NC}http://localhost:5173"
echo -e "${YELLOW}Backend:  ${NC}http://localhost:3000"
echo -e "${GREEN}========================================${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop services${NC}"

# Wait for both processes
wait

#!/usr/bin/env bash
cd server
kill -9 $(lsof -t -i:3267)
yarn dev --fix
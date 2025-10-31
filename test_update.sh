#!/bin/bash

# Test script to verify backend handles empty arrays
# Replace with your actual project ID

PROJECT_ID=325
API_URL="https://intranet.accionlabs.com/pmoreporting/update_project/${PROJECT_ID}"

echo "Testing backend update with empty environment array..."
echo ""

curl "${API_URL}" \
  -X 'PUT' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "submitter_email_id":"babu.raj@accionlabs.com",
    "submitting_time":"2025-10-31T13:32:21",
    "account_name":"American Water / Oncourse Home Solutions",
    "project_name":"some new project",
    "buh_name":"Anand Raja",
    "dd_name":"Anand Shah",
    "domains":"E-Commerce",
    "application_class":"Feature Enhancements",
    "environment":[],
    "cloud_technologies":["Azure"],
    "status":"Inactive"
  }' \
  -w "\n\nHTTP Status: %{http_code}\n"

echo ""
echo "Now fetch the project to see if environment was cleared:"
echo ""

# Fetch the project back
curl "https://intranet.accionlabs.com/pmoreporting/platform_data/projects/${PROJECT_ID}" \
  -H 'Content-Type: application/json' | jq '.environment'

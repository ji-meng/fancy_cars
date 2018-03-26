#!/bin/bash

TEST_RESULT=$(./node_modules/.bin/jest $@ 2>&1)

echo ---
echo $TEST_RESULT
echo ---

TESTS_RAN=$(echo "$TEST_RESULT" | grep PASS)
FAILED=$(echo "$TEST_RESULT" | grep failed)

echo "$FAILED"

if [[ "$FAILED" != "" || "$TESTS_RAN" == "" ]]; then
    exit 1
fi

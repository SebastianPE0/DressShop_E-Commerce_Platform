#!/bin/bash
set -e

mongo <<EOF
use ecommerce
db.products.insertMany($(cat /docker-entrypoint-initdb.d/products.json))
EOF

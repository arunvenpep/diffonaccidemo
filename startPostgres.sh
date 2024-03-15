SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"


# Username, password, database name
# Either load from file $(pwd)/.pg-env
# or default to n8, n8, test
ENV_FILE="$SCRIPT_DIR/.pg-env"
if [ -e "$ENV_FILE" ]; then
  . "$ENV_FILE"
fi

docker run \
  --rm \
  --net=bridge \
  -p 5432:5432 \
  -e POSTGRES_USER="${POSTGRES_USER:-n8}" \
  -e POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-n8}" \
  -e POSTGRES_DB="${POSTGRES_DB:-test}" \
  postgres:15.4-alpine

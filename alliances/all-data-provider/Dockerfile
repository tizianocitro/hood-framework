FROM golang:1.18-alpine AS build
WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .
RUN go build -o /all-server

FROM golang:1.16-alpine AS run
WORKDIR /app

COPY --from=build /all-server /all-server
COPY .env .env

EXPOSE 3000

CMD [ "/all-server" ]
# The Hue Review

This is the complete example of **The Hue Review**. It contains 3 services and a gateway.

## Installation Instructions

Run `npm install` in the root to install the dependencies for all of the services.

## Managing the cluster

Use the following commands to manage the pm2 cluster

| command           | action                                       |
| ----------------- | -------------------------------------------- |
| `npm start`       | starts all of the services                   |
| `npm stop`        | stops all of the services                    |
| `npm run restart` | restarts all of the services                 |
| `npm run remove`  | removes all of the services                  |
| `npm run list`    | shows the list of services with their ids    |
| `npm run logs`    | shows the logs files for all of the services |

## Services

| service            | url                                            | description                                 |
| ------------------ | ---------------------------------------------- | ------------------------------------------- |
| Account Service    | [http://localhost:4000](http://localhost:4000) | all user accounts for entire organization   |
| Review Service     | [http://localhost:4001](http://localhost:4001) | handles all reviews for entire organization |
| Color Service      | [http://localhost:4002](http://localhost:4002) | handles all colors for the hue review       |
| Hue Review Gateway | [http://localhost:4003](http://localhost:4003) | The main gateway API for the Hue Review     |

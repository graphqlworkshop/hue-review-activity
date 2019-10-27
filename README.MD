# Apollo Federation Exercise

In this exercise we will build federated services and link them behind a gateway.

## Services

| service            | url                                            | description                                 |
| ------------------ | ---------------------------------------------- | ------------------------------------------- |
| Account Service    | [http://localhost:4000](http://localhost:4000) | all user accounts for entire organization   |
| Review Service     | [http://localhost:4001](http://localhost:4001) | handles all reviews for entire organization |
| Color Service      | [http://localhost:4002](http://localhost:4002) | handles all colors for the hue review       |
| Hue Review Gateway | [http://localhost:4003](http://localhost:4003) | The main gateway API for the Hue Review     |

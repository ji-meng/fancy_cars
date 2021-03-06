# fancy_cars

FancyCars.ca has asked you to build their HomePage. On their HomePage they want to:

1.	Show 10 cars and for each car they want to show picture, name, make, model and availability of the car.
2.	Sort by both name and availability of the car
3.	Show buy button but it only shows up if Availability is “In Dealership”
4.	Make homepage mobile optimized and responsive

For this exercise, please use React/Redux to build HomePage for FancyCars.ca. For BE build BFF (BE for FE) which can call AvailabilityService and CarsService to get that API response (you can stub the API response from those services but make sure to stub the API response as far back as possible in the stack so they can easily be replaced with real calls). API spec is as follows:

GET /availability?id=123
RESPONSE: {available: “In Dealership”}  // all  options are [ “Out of Stock”, “Unavailable”]

GET /cars
RESPONSE:  [ {id: 1, img: http://myfancycar/image, name: “My Fancy Car”, make: “MyMake”, model: “MyModel”, year: 2018} ….]


## Make Tasks
#### Useful Commands for Development

- `make help` - show this help message
- `make install` - install dependencies
- `make start` - builds and runs the project, autoreloading on file changes
- `make start-tunnel` - runs the project and provides a globally accessible proxy url for testing on other devices
- `make lint` - runs eslint and stylelint
- `make lint-fix` - attempts to autofix linting errors
- `make test` - runs the full test suite with jest
- `make test-watch` - re-runs tests on file changes - VERY useful
- `make test-snapshots` - updates the jest snapshots
- `make test-coverage` - creates a coverage report and opens it in your browser
- `make analyze` - analyzes your webpack bundling

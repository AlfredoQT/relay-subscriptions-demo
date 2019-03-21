# Inventory

An inventory for keeping track of orders made by students at Tec de Monterrey CCM.

## Changelog

This is a little changelog to show the development of the project.

### Before March 20th, 2019

A React web application that uses Relay Modern to communicate with a GraphQL API to save inventory items and lets items be requested by applicants.

##### Drawbacks

* The learning curve with Relay Modern was very step
* The GraphQL server did not meet the specifications of Relay Modern
* It was pretty hard to do little features like autocomplete using Relay Modern
* A significant amount of work was due the next day!

### After March 20th, 2019

Still a React web application, because I do not really know any other framework for making web applications on the front-end side other than making it with Vanilla JS. It connects to a much easier to implement REST API.

My decision was based on this.

* Making a GraphQL Relay Modern compliant API was tricky for uses like pagination which I wanted to try out, but were unnecessary.
* It was due the next day, so I had to really speed things up.

I will probably switch back to the GraphQL API in a future version, but most likely will do it for another project.

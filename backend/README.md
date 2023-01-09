# simpleAPI

A leightweight & simple NodeJS/Express/TypeORM API System.

## About

The goal behind simpleAPI is, to create a simple and fast way to deploy an Server-Side Backend with JSON Requests & Responses.

## Installation

### Configuration with an .env-File
With an .env-File, you can Configure all needed Core-Settings wich are needed by the application to launch and work. Look into the .env.sample File for an explanation about the configuration parameters and copy the file, rename the copy to .env and replace the default settings to match your needs.

### src/data-source.ts File
Inside this file, you need to specify all Entities wich need to be loaded for your Application.
Look inside this file for a documentation about the configurable parameters.

## Building & Running

### Building
To build, you need to run the following command inside the root directory of your own simpleAPI:
```npm run build```
This Command builds all the files inside the /src directory inside a newly generated /bin directory.

### Running
To build and run the application, you need to run the following command inside the root directory of your own simpleAPI (keep in mind that you need to Configure your settings in an .env-File):
```npm run start```
If you wish to start without building, you need to run the following command (keep in mind, that you must have a builded version of the simpleAPI inside your /bin-Directory to run):
```npm run startonly```
## Core APIs
Some APIs are already delivered inside the Core System.
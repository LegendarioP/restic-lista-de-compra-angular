# ShopList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6.

## Installng dependencies

Rum `npm install` to install all dependencies from the project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running database

Run `npm run db` for a localdatabase with json-server. If you check data, Naviigate to `http://localhost:3000/`.

## Updating enviroment variables

To run environment variables for the google oauth, is necessary to make key and client id from the google. Because, if i will be upload a security data,i will be receive some alerts from security on e-mail from google console. 

## How to Create an API Key and Client ID in Google Cloud Console

### 1. Access the Google Cloud Console

Go to Google Cloud Console.

Sign in with your Google account if you aren’t already logged in.

### 2. Create a New Project or Select an Existing Project

In the top-left corner, click on the Project Selection menu and select New Project.

Give your project a name and click Create.

Wait a few seconds for the project to be created, then select it from the project list.

### 3. Enable the Necessary APIs
In your project dashboard, go to APIs & Services > Library.

In the API Library, search for the API you want to use (e.g., YouTube Data API, Google Maps API, etc.).

Click on the API and then click Enable.

Repeat this step for each API you need.

### 4. Create an API Key
In your project dashboard, go to APIs & Services > Credentials.

Click Create Credentials and select API Key.

A new API Key will be generated. Save this key for use in your project.

Optional: To restrict the key, click on the created key and set the restrictions (e.g., IP restriction, HTTP referrer, etc.).

### 5. Create an OAuth Client ID

On the Credentials page, click Create Credentials and select OAuth Client ID.

If prompted, configure the OAuth Consent Screen:

Click Configure Consent Screen.

Choose the user type (Internal or External), depending on your requirements.

Fill in the basic information (App name, Support email, etc.) and click Save and Continue.

In the following steps (Scopes and Test Users), add permission scopes if needed, and finish by clicking Back to Dashboard.

Under Application Type, select the appropriate type (e.g., Web Application).

Enter the Redirect URIs if needed, then click Create.

After creating the OAuth Client ID, your Client ID and Client Secret will be displayed. Save these values for use in your project.

### 6. Update variables from oauth

Open `app/auth.service.ts`, and update **clientId** and **ApiKey** and replace for the google variables

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Project Report

[Final Project Report .pdf](https://github.com/COSC-412-group-7/travel-trove-ai/files/13676863/Final.Project.Report.pdf)

## Project PowerPoint

[final final pres.pdf](https://github.com/COSC-412-group-7/travel-trove-ai/files/13668414/final.final.pres.pdf)

## Getting Started

To install dependencies:

```bash
npm install
```

To run the development server:

```bash
npm run dev
```

To use the flight search API:

 - Create an account with [https://developers.amadeus.com](https://developers.amadeus.com)
 - Go to "My Self-Service Workspace"
 - Create a new app
 - Give it any name
 - Click Create
 - Copy and paste the API Key into your own .env file under "NEXT_PUBLIC_AMADEUS_CLIENT_ID"
 - Copy and paster the API Secret into your own .env file under "NEXT_PUBLIC_AMADEUS_CLIENT_SECRET"

To use the ChatBox:

 - Create an account with [https://platform.openai.com/](https://platform.openai.com/)
 - Go to "API keys"
 - Create a new secret key
 - Give it any name
 - Click create secret key
 - Copy and paste the new secret key into your own .env file under "OPENAI_API_KEY"

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Feature Manual

 - To search and book flights enter the required search criteria and press the search flights button
<img width="554" alt="image" src="https://github.com/COSC-412-group-7/travel-trove-ai/assets/104221232/a1d7907b-a865-4f68-aa93-167305c9bd4d">

 - The search results should pop up below the search field like this
<img width="554" alt="image" src="https://github.com/COSC-412-group-7/travel-trove-ai/assets/104221232/471d13ec-8f3f-4c9e-920d-4c6e996f543a">

 - To translate a language in the language page select your language with the drop down and type what you want translated
 - Then select the language you want to translate into and press translate text
<img width="520" alt="image" src="https://github.com/COSC-412-group-7/travel-trove-ai/assets/104221232/64c6b3e9-901c-402a-8411-b49956936a81">

 - To convert a currency enter the amount of the original currency
 - Then select the original currency from the "From" dropdown and select the currency you want to convert into from the "to" dropdown
 - Then press convert
<img width="315" alt="image" src="https://github.com/COSC-412-group-7/travel-trove-ai/assets/104221232/d2ad5a78-1a0e-4ac2-81fb-51e857f874e5">

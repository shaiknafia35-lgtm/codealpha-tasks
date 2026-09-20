# Campus Companion AI

Build a complete responsive AI-powered chatbot web application called "Student Support AI Chatbot".

Purpose:

This project is for a Cloud Computing internship task. It should demonstrate an AI-powered chatbot that provides instant responses to user queries.

Technology:

- React

- TypeScript

- Tailwind CSS

- Modern responsive UI

- AI API integration

Main features:

1. Chat interface

Create a clean chatbot interface with:

- User messages

- AI messages

- Message timestamps

- Chat input

- Send button

- Loading indicator

- Clear chat button

2. AI responses

Integrate an AI model/API so that the chatbot can generate responses to user questions.

The chatbot should act as a college student support assistant.

System behavior:

- Answer questions clearly and politely.

- Help students with general college-related questions.

- If information is unavailable, clearly say that the information is not available instead of inventing official information.

- Keep responses concise and easy to understand.

3. Predefined FAQ support

Add quick question buttons such as:

- College timings

- Library information

- Exam information

- Attendance

- Courses

- Placement support

When the user clicks one, send the question to the chatbot.

4. Chat history

Keep the conversation visible during the current session.

5. UI

Create a professional modern chatbot interface with:

- Header containing "Student Support AI"

- Chat area

- Quick question buttons

- Input box

- Send button

- Responsive mobile and desktop layout

6. Error handling

If the AI API fails:

- Show a friendly error message.

- Do not expose API keys.

- Do not crash the application.

7. Code quality

Use reusable React components and clean TypeScript code.

Important:

Use a secure environment variable for the AI API key.

Never hard-code the API key in frontend source code.

Make the chatbot actually functional rather than creating only a static UI.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/304f9601-f44f-4e43-88d8-f4b573067b98).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

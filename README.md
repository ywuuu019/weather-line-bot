# Weather Line Bot

This repository contains a Line bot that delivers weather information for specified locations. Leveraging the Central Weather Administration API(中央氣象署), it responds to user inquiries on the Line messaging platform.

## Getting Started

To deploy and utilize this Line bot, adhere to the following instructions:

### Prerequisites

1. **Line Developer Account**: Create an account on the [Line Developers Console] (https://developers.line.biz/) and establish a new Line Messaging API channel.

2. **中央氣象署 API Key**: Acquire an API key from [CWA](https://opendata.cwa.gov.tw/devManual/insrtuction) to access weather data by location.

3. **Visual Crossing API Key**: Acquire an API key from [Visual Crossing](https://www.visualcrossing.com/)) to access weather data by latitude and longitude.

4. **Node.js and npm**: Ensure that Node.js and npm are installed on your system.

### Installation

1.  Clone the repository:

    ```
    git clone https://github.com/ywuuu019/weather-line-bot.git
    ```

2.  Move into the project directory:

    ```
    cd weather-line-bot
    ```

3.  Install dependencies:

    ```
    npm install
    ```

4.  Configure environment variables:
    Create a `.env` file in the project's root directory and include the following:

    ```
    CHANNEL_ID=
    CHANNEL_SECRET=
    CHANNEL_ACCESS_TOKEN=
    VISUAL_CROSSING_API_KEY=
    CWA_API_KEY=
    ```

    Replace your respective Line channel id, Line channel secret, Line channel access token, and visualCrossing/CWA api key

### Usage

1. Launch the application:

   ```
   npm start
   ```

2. Expose a local port using [ngrok](https://ngrok.com/). This command will create a secure tunnel to your local server and provide you with a public URL.

    ```
    ngrok http http://localhost:3000
    ```

3. Configure webhook on Line Developers Console.
   - Log in to the [Line Developers Console](https://developeres.line.biz/).
   - Go to your Channel settings and navigate to the `Messaging API` section.
   - Under the `Webhook URL` section, enter the ngrok URL followed by the endpoint where your Line bot is listening. For example: `https://randomstring.ngrok.io/callback`

4. Verify Webhook: After configuring the webhook URL, Line will send a verification request to your server. Make sure your local server is running and accessible via ngrok. Once the verification is successful, you can start receiving events from Line on your local server.

5. Once the application is running, add the Line bot as a friend on the Line messaging platform. Commence querying weather information by sending location messages.

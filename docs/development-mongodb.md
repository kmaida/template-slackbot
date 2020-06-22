# Development: MongoDB Atlas Setup

You should already have a [MongoDB Atlas](https://mongodb.com) account, as detailed in the [Prerequisites](development.md#prerequisites).

If you don't already have an account, follow these steps after signup:

1. After signing up, choose **Shared Clusters** and click the "Create a cluster" button. (This is the free option.)
2. Choose your **Cloud Provider & Region**. Pick whatever choices you like here. Click the "Create Cluster" button.
3. Atlas will take a few minutes to provision your cluster. Standby while your cluster is created (until the process completes).
4. When the cluster has been created, click on the "CONNECT" button.
5. Under **Whitelist a connection IP address**, click the "Add a Different IP Address" button.
6. Enter IP Address: `0.0.0.0/0` and click "Add IP Address." This allows traffic from all IPs (we'll secure our connection with a username and password, which should remain confidential and never be checked into a public repository.)
7. Under **Create a MongoDB User**, enter your desired username.
8. For the password, click the "Autogenerate Secure Password" button and then copy the generated password to your clipboad (and password manager of choice). Next, click the "Create MongoDB User" button.
9. When available, click the "Choose a connection method" button to proceed to the next step.
10. Click **Connect your application**. The default driver is `Node.js`. This is what we want, so do not change anything here.
12. Under **Add your connection string into your application code**, copy the provided snippet. This is your MongoDB URI connection string.
13. Add your connection string to the `.env` file `MONGO_URI` variable. Replace `<password>` with your database user password. Replace `<dbname>` with whatever name you'd like for your Speakerbot database (e.g., `speakerbot`).
14. Save your `.env` changes.

You are now ready to use MongoDB for Speakerbot app settings! You can return to the [Development docs](development.md) or move to the next step: [Development: Slack App Setup](development-slack-app.md).
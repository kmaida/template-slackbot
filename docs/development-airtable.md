# Development: Airtable Setup

You should already have an [Airtable](https://airtable.com) account, as detailed in the [Prerequisites](development.md#prerequisites).

Now we need to set up a base and table to store some sample data.

1. [Log into Airtable](https://airtable.com/login). The dashboard defaults to the Bases view.
2. Click the `+` icon to `Add a base`.
3. In the dropdown, choose **Start from scratch**.
4. Name your base something descriptive. A base is a _collection_ of tables, and we'll use a table inside this base to store speaking events. You can also select a color and an icon for your base.
5. Once your base is set up, click on it to open it. You will see an empty table in grid view. It should look something like this:
![Airtable with blank table](airtable-table1.png)
6. Rename "Table 1" to a name of your choosing. This will be the table where the Slack bot saves and reads data. For example, I called the table `Slackbot Template`.
7. Modify/add the table fields as described below. It's very important that the fields be named and formatted _exactly_ as shown, otherwise, the app will not be able to read or save the data properly without further code edits:
  * **Name** | Single line text
  * **Email** | Single line text
  * **Image** | URL
  * **URL** | URL
  * **Bio** | Long text (no rich text formatting)
  * **Slack ID** | Single line text
8. Add your table's name to your `.env` file in the `AIRTABLE_TABLE` variable.
9. Examine the table's URL in the browser. It should look something like this: `https://airtable.com/[tblXXXxxx]/[viwXXXxxx]?blocks=...`
10. Copy the segment of the URL that begins with "tbl" to `.env` as the `AIRTABLE_TABLE_ID` variable.
11. Copy the segment of the URL that begins with "viw" to `.env` as the `AIRTABLE_VIEW_ID` variable. (It should be the "Grid view.")
12. In the upper right of your base view, you should see a link that says `HELP (?)`.
![Airtable upper right menu items](airtable-menu.png)<br>
Click on this link and in the dropdown, choose **API Documentation**. This opens the API docs for your base.
13. In the Airtable API Introduction section, find the line that says:
```
The ID of this base is appXXXXXX.
```
14. Copy the base ID and paste it into your `.env` file as the `AIRTABLE_BASE_ID` variable.
15. Now return to your base view. In the upper right corner, click on your avatar icon and choose **Account** from the dropdown.
16. You should now see your **Account overview** page. In the "API" section, there is a personal API key (displayed as dots in an input field). Click in the field to view the text contents. It should reveal a string starting with "key." Copy this API key and paste it into your `.env` file as `AIRTABLE_API_KEY`.
17. Save your `.env` changes.

You are now ready to use Airtable as your data source for events! Head back to the [Development docs](development.md) or you can move to the next step: [Development: MongoDB Setup](development-mongodb.md).
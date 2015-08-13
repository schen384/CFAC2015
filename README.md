# UPDATING EARTHWATCHEXPEDITIONS DATA:

### To add updated data to the expeditions site, please use the following instructions.

#### Verify the Spreadsheet

###### First, verify the excel spreadsheet has the correct data structures and naming conventions.
The following are valid "Region" fields:
* "Africa"
* "North America"
* "Europe"
* "Asia & Australia"
* "Central, South America & The Caribbean"

The following are valid "Research Type" fields:
* "Wildlife & Ecosystems"
* "Ocean Health"
* "Climate Change"
* "Archaeology & Culture"

Please make the sure the headers of the excel sheet are named "Region" and "Research Type" as well!

#### Convert to JSON

Select all of the data (including first row of column names!) in the excel and spreadsheet, and copy it to the clipboard (control-a followed by control-c)

Open up the following website (I used a Chrome browser to do so):
[https://shancarter.github.io/mr-data-converter/](https://shancarter.github.io/mr-data-converter/)

Verify the following settings on Mr. Data Converter are correct:
* Delimiter: Auto
* Decimal Sign: Dot
* First Row is the header: Checked
 *Transform: none
*Include white spaces in output: Checked
 *Indent with: spaces
* **Output as JSON - Properties**

Paste (control-v) into the Input CSV or tab-delimited data section of the page (top field)  
Then, select and copy the json formatted data to the clipboard.

#### Add the JSON Data to the website
######Now, open up the file data_rename.js, which is in the /js/ directory.

The first line in the file should read:

var expeditions = [...expedition data here...];

Delete the array, starting with the open bracket and ending with the closing bracket, and paste the data from Mr. Data Converter in its place.
Make sure there is a semi-colon (;) immediately following the final closing bracket.

IMPORTANT NOTE: If there are pluses (+) in the data, they must be encased in quotation marks to be escaped as strings
* Example: an expedition has a duration of 7+. This will be formatted to the digit 7 and the operator +, which is an incomplete expression in javascript!
This will break the page and cause a failure in loading the data. You can check the javascript console (located by pressing control+shift+j in chrome) to see which line(s) are causing problems. 

######If you need assistance please email jbronen [at] gmail [dot] com.
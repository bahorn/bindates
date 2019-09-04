# Bin Dates

Literally a text reminder service for when you need to put your bins out...

Implemented as a firebase function, which gets called once a day.

*currently only supports South Kesteven as that's where I live :)*

If you want to add support for your council, please send a pull request! Councils
have pretty similar sites, so you might be able to support a few with less work.

Some councils are nice and do have auto reminders, so worth checking if yours
does.

## Using

You need a Firebase account setup with billing (The Blaze plan) to deploy this
on the cloud as this accesses non-google services. Is fairly easy to run it
locally if you want to run if off a spare Raspberry Pi or something though.

You also need a twilio account to send the text messages. Shouldn't be too hard
to port to using Nexmo if you have some spare hackathon credits for them :)

Currently, it works as a HTTP method which takes POST values. You could make it
schedule with firebase if you wanted.

With that all decided, run the following with all your settings:
```
firebase functions:config:set twilio.number=<YOUR NUMBER> twilio.sid=<YOUR SID> twilio.token=<YOUR TOKEN> bins.user_agent=<HTTP USER AGENT>
firebase deploy --only http
```

Now make Zapier or whatever call it once per day!

You should now be all set up!

## License

Released under MIT.

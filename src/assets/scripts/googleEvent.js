const CLIENT_ID =
  "418264096653-dimi5s8hgo94u9v9gt5jd6so5emrjg7k.apps.googleusercontent.com";
const API_KEY = "AIzaSyAUuaYsMX4-eFp2wFQW82QyfrihqYwUPs4";
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar";
let tokenClient;
let gapiInited = false;
let gisInited = false;

function gapiLoaded() {
  console.log('gapiLoaded called');
  gapi.load("client", initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  console.log('GAPI initialized');
}

function gisLoaded() {
  console.log('gisLoaded called');
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "",
  });
  gisInited = true;
  console.log('GIS initialized');
}

function createGoogleEvent(eventDetails) {
  console.log('createGoogleEvent called with:', eventDetails);
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    await scheduleEvent(eventDetails);
  };

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    tokenClient.requestAccessToken({ prompt: "" });
  }
}

function scheduleEvent(eventDetails) {
  const event = {
    summary: "Scheduled Meeting",
    location: "Online",
    description: "This is a scheduled meeting.",
    start: {
      dateTime: eventDetails.startTime,
      timeZone: "Africa/Tunis",
    },
    end: {
      dateTime: eventDetails.endTime,
      timeZone: "Africa/Tunis",
    },
    attendees: [{ email: eventDetails.email }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  const request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });

  request.execute(function (event) {
    console.info("Event created: " + event.htmlLink);
  });
}

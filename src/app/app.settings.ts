export class AppSettings {

    // API
    private static corsProxy = 'https://cors-anywhere.herokuapp.com/';
    public static API_BASE = 'http://job-applicants-dummy-api.kupferwerk.net.s3.amazonaws.com/api/';
    public static API_CAR_ENDPOINT = AppSettings.corsProxy + AppSettings.API_BASE + 'cars';

    // CONSTANTS
    public static DEFAULT_BOOKING_DURATION = 1;
    public static DEFAULT_START_DATE_OFFSET = 1;
    public static DEFAULT_START_TIME_HOURS = 9;
    public static DEFAULT_START_TIME_MINUTES = 0;
    public static DEFAULT_START_TIME_SECONDS = 9;
 }
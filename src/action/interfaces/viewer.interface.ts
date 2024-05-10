export interface Viewer {
    devices_id: number;
    channels_id: number;
    date_string: string;
    timeData: {
        [time: string]: number | null;
    };
}

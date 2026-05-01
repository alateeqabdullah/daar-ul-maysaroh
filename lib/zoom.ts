// // src/lib/zoom.ts

// export const runtime = "nodejs";


// import axios from "axios";

// const ZOOM_API_BASE = "https://api.zoom.us/v2";

// export class ZoomService {
//   private accessToken: string;
//   private refreshToken: string;

//   constructor() {
//     this.accessToken = process.env.ZOOM_ACCESS_TOKEN || "";
//     this.refreshToken = process.env.ZOOM_REFRESH_TOKEN || "";
//   }

//   async createMeeting(meetingData: {
//     topic: string;
//     type: 1 | 2 | 3 | 8; // 1=Instant, 2=Scheduled, 3=Recurring, 8=Fixed webinar
//     start_time?: string;
//     duration?: number;
//     timezone?: string;
//     password?: string;
//     agenda?: string;
//     settings?: {
//       host_video?: boolean;
//       participant_video?: boolean;
//       join_before_host?: boolean;
//       mute_upon_entry?: boolean;
//       waiting_room?: boolean;
//       auto_recording?: "local" | "cloud" | "none";
//     };
//   }) {
//     try {
//       const response = await axios.post(
//         `${ZOOM_API_BASE}/users/me/meetings`,
//         meetingData,
//         {
//           headers: {
//             Authorization: `Bearer ${this.accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error creating Zoom meeting:", error);
//       throw error;
//     }
//   }

//   async updateMeeting(meetingId: string, updates: any) {
//     try {
//       const response = await axios.patch(
//         `${ZOOM_API_BASE}/meetings/${meetingId}`,
//         updates,
//         {
//           headers: {
//             Authorization: `Bearer ${this.accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error updating Zoom meeting:", error);
//       throw error;
//     }
//   }

//   async deleteMeeting(meetingId: string) {
//     try {
//       await axios.delete(`${ZOOM_API_BASE}/meetings/${meetingId}`, {
//         headers: {
//           Authorization: `Bearer ${this.accessToken}`,
//         },
//       });
//     } catch (error) {
//       console.error("Error deleting Zoom meeting:", error);
//       throw error;
//     }
//   }

//   async getMeeting(meetingId: string) {
//     try {
//       const response = await axios.get(
//         `${ZOOM_API_BASE}/meetings/${meetingId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${this.accessToken}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error getting Zoom meeting:", error);
//       throw error;
//     }
//   }

//   async listRecordings(
//     userId: string = "me",
//     params?: {
//       from?: string;
//       to?: string;
//       page_size?: number;
//       next_page_token?: string;
//     }
//   ) {
//     try {
//       const response = await axios.get(
//         `${ZOOM_API_BASE}/users/${userId}/recordings`,
//         {
//           headers: {
//             Authorization: `Bearer ${this.accessToken}`,
//           },
//           params,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error listing Zoom recordings:", error);
//       throw error;
//     }
//   }

//   async refreshAccessToken() {
//     try {
//       const response = await axios.post("https://zoom.us/oauth/token", null, {
//         params: {
//           grant_type: "refresh_token",
//           refresh_token: this.refreshToken,
//         },
//         headers: {
//           Authorization: `Basic ${Buffer.from(
//             `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
//           ).toString("base64")}`,
//         },
//       });

//       this.accessToken = response.data.access_token;
//       this.refreshToken = response.data.refresh_token;

//       // Store new tokens securely
//       // This should be saved to your database

//       return response.data;
//     } catch (error) {
//       console.error("Error refreshing Zoom token:", error);
//       throw error;
//     }
//   }

//   generateSignature(meetingNumber: string, role: 0 | 1) {
//     const crypto = require("crypto");
//     const timestamp = new Date().getTime() - 30000;
//     const msg = Buffer.from(
//       process.env.ZOOM_API_KEY + meetingNumber + timestamp + role
//     ).toString("base64");
//     const hash = crypto
//       .createHmac("sha256", process.env.ZOOM_API_SECRET)
//       .update(msg)
//       .digest("base64");
//     const signature = Buffer.from(
//       `${process.env.ZOOM_API_KEY}.${meetingNumber}.${timestamp}.${role}.${hash}`
//     ).toString("base64");

//     return signature;
//   }

//   getJoinUrl(meetingId: string, password?: string) {
//     return `https://zoom.us/j/${meetingId}${
//       password ? `?pwd=${password}` : ""
//     }`;
//   }

//   getEmbedUrl(meetingId: string, role: "0" | "1" = "0") {
//     return `https://zoom.us/wc/${meetingId}/join?prefer=0&pwd=&role=${role}`;
//   }
// }

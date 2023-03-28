export const token = "";
const API_BASE_URL = "https://api.videosdk.live/v2";
// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  console.log(roomId)
  return roomId;
};

export const validateMeeting = async ({ meetingId, token }) => {
    console.log(meetingId);
    console.log(token);
    const url = `${API_BASE_URL}/rooms/validate/${meetingId}`;
  
    const options = {
      method: "GET",
      headers: { Authorization: token },
    };
  
    const result = await fetch(url, options)
      .then((response) => response.json()) //result will have meeting id
      .catch((error) => console.error("error", error));
    console.log(result)
    return result ? result.roomId === meetingId : false;
  };

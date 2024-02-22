export const sendFile = async (
  uri: string,
  type: string,
  name: string,
  host: string,
  conversationId: string,
  instanceId: string,
  token: string
) => {
  const url = `https://${host}/rest/instances/${instanceId}/conversations/${conversationId}/files`;
  let data = new FormData();
  data.append('file', { uri, type, name });
  const response = await fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};
